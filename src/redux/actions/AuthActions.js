import * as TYPES from "../constants/types";
import {CLICK_MENU} from "../constants/types";
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '@react-native-firebase/app'
import Toast from 'react-native-simple-toast';
import uuid from 'uuid/v4';
import {MENU_TYPES} from "../constants/menuTypes";
import {FeedTypes} from "../constants/feedConstants";
import cloneDeep from "lodash/cloneDeep";
import NavigationService from '../../../NavigationService';

const REQUEST_URL = "http://leppi-api.cgem9zx2vz.us-east-2.elasticbeanstalk.com";
// const REQUEST_URL = "http://192.168.207.174:8000";

export const updateMenu = currentMenu => ({
    type: CLICK_MENU,
    currentMenu: currentMenu
});

export const clickMenu = currentMenu => {
    return dispatch => {
        dispatch(updateMenu(currentMenu));
    };
};

export const isLoading = (loading) => ({
    type: TYPES.IS_LOADING,
    payload: loading
});

export const setLoadingSpinner = (loading) => {
    return async dispatch => {
        dispatch(isLoading(loading));
    };
};

export const setLocation = (position) => ({
    type: TYPES.CURRENT_LOCATION,
    payload: position
});

export const setCurrentLocation = (position) => {
    return async dispatch => {
        dispatch(setLocation(position));
    };
};

export const R_logout = () => ({
    type: TYPES.LOG_OUT
});

export const fetchLogout = () => {
    return async dispatch => {
        dispatch(R_logout());
        let keys = ['$leppiUserId', '$leppiSkipWelcome'];
        try {
            await AsyncStorage.multiRemove(keys);
            // //console.log('===== R_logout');
            await firebase.auth().signOut();
        } catch (e) {
            dispatch(isLoading(false));
        }
    };
};

export const fetchingLoginRequest = () => ({type: TYPES.FETCHING_LOGIN_REQUEST});

export const fetchingLoginSuccess = json => ({
    type: TYPES.FETCHING_LOGIN_SUCCESS,
    payload: json
});

export const fetchingLoginFailure = error => ({
    type: TYPES.FETCHING_LOGIN_FAILURE,
    payload: error
});

export const fetchLogin = (data, navigate) => {
    return async dispatch => {
        dispatch(fetchingLoginRequest());
        const {email, password} = data;
        // //console.log('===== fetchLogin');
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
                .then(async (user) => {
                    await AsyncStorage.setItem('$leppiUserId', user.user.uid);
                    dispatch(fetchingLoginSuccess(user));
                    let skipWelcome = await AsyncStorage.getItem('$leppiSkipWelcome');
                    if (skipWelcome === '1') {
                        dispatch(updateMenu(MENU_TYPES.HOME));
                        navigate('Home');
                    } else {
                        navigate('Welcome');
                    }
                })
                .catch((error) => {
                    const {code, message} = error;
                    dispatch(fetchingLoginFailure(error));
                    Toast.show("Invalid email or password", Toast.SHORT);
                });
        } catch (e) {
            const {code, message} = error;
            const errorMessage = message.replace(code, '').replace('[]', '');
            dispatch(fetchingLoginFailure(errorMessage));
            Toast.show(errorMessage, Toast.SHORT);
        }
    };
};

//user register
export const fetchingSignupRequest = () => ({type: TYPES.FETCHING_SIGNUP_REQUEST});

export const fetchingSignupSuccess = uid => ({
    type: TYPES.FETCHING_SIGNUP_SUCCESS,
    payload: uid
});

export const setUserId = userId => ({
    type: TYPES.SET_USER_ID,
    payload: userId
});

export const fetchingSignupFailure = error => ({
    type: TYPES.FETCHING_SIGNUP_FAILURE,
    payload: error
});

export const fetchSignup = (data, userMeta) => {
    return async dispatch => {
        dispatch(fetchingSignupRequest());
        try {
            let requestConfig = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    whatsapp: data.whatsapp,
                    password: data.password,
                    first_name: data.first_name,
                    last_name: data.last_name,
                })
            };
            let url = REQUEST_URL + "/api/users/create";

            let respond = await fetch(url, requestConfig);
            let json = await respond.json();

            if (json.result && json.result === 'ok') {
                await AsyncStorage.setItem('$leppiUserId', json.uid);
                await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
                dispatch(fetchingSignupSuccess(json.uid));

                let tUserMeta = cloneDeep(userMeta);
                tUserMeta.userId = json.uid;

                dispatch(createUserMeta(tUserMeta));
                NavigationService.navigateAndReset('Welcome');
            } else {
                if (json.msg && json.msg.code) {
                    Toast.show(json.msg.message, Toast.SHORT);
                } else {
                    Toast.show("The system is busy now!", Toast.SHORT);
                }
                dispatch(fetchingSignupFailure('error'));
            }
        } catch (error) {

            dispatch(isLoading(false));
            const {code, message} = error;
            const errorMessage = message.replace(code, '').replace('[]', '');
            Toast.show(errorMessage, Toast.SHORT);
        }
    };
};

export const checkPhoneNumber = async (phoneNumber) => {
    try {
        let requestConfig = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                phoneNumber: phoneNumber,
            })
        };
        let url = REQUEST_URL + "/api/users/get";
        let respond = await fetch(url, requestConfig);
        let json = await respond.json();
        // //console.log('====== json result', json.result);
        // //console.log('====== json uid', json.uid);
        if (json.result && json.result === 'ok') {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
};

export const fetchingUserMetaSuccess = json => ({
    type: TYPES.FETCHING_USER_META_SUCCESS,
    payload: json
});

export const setUserMeta = metaData => {
    return async dispatch => {
        dispatch(fetchingUserMetaSuccess(metaData));
    };
};

//user profile
export const createUserMeta = metaData => {
    return async dispatch => {
        dispatch(isLoading(true));
        // //console.log('===== createUserMeta');
        try {
            await await firebase.firestore().doc('userMeta/' + metaData.userId).set(metaData, {merge: true});
            dispatch(setUserMeta(metaData));
            dispatch(isLoading(false));
        } catch (e) {
            // console.log('===== createUserMeta error', e.message);
            dispatch(isLoading(false));
        }
    };
};

export const fetchingSocialMetaData = (userId, navigate) => {
    return async dispatch => {
        try {
            dispatch(isLoading(true));
            dispatch(setUserId(userId));

            const userMetaSnapshot = await firebase.firestore().doc('userMeta/' + userId).get();
            dispatch(isLoading(false));
            if (userMetaSnapshot.exists) {
                navigate('Welcome');
            } else {
                navigate('EditProfile');
            }
        } catch (error) {
            dispatch(isLoading(false));
        }
    };
};

export const fetchingUserMeta = (navigate) => {
    return async dispatch => {
        try {
            const userId = await AsyncStorage.getItem('$leppiUserId');
            const fcmToken = await AsyncStorage.getItem('$leppiFCMToken');
            dispatch(isLoading(true));
            dispatch(setUserId(userId));

            const userMetaSnapshot = await firebase.firestore().doc('userMeta/' + userId).get();

            if (!userMetaSnapshot.exists) {
                dispatch(R_logout());
                let keys = ['$leppiUserId',  '$leppiSkipWelcome'];
                try {
                    await AsyncStorage.multiRemove(keys);
                    // //console.log('===== R_logout');
                    await firebase.auth().signOut();
                } catch (e) {
                    dispatch(isLoading(false));
                }
            } else {
                let userMeta = userMetaSnapshot.data();
                firebase.firestore().doc('userMeta/' + userId).update({fcmToken: fcmToken});
                if (typeof userMeta.avatar !== 'undefined' && userMeta.avatar) {
                    userMeta.avatarUrl = await firebase.storage().ref(userMeta.avatar).getDownloadURL();
                }
                dispatch(fetchingUserMetaSuccess(userMeta));
            }
        } catch (error) {
            console.log('ERROR ------- ', error.message);
            // //console.log(error);
            dispatch(isLoading(false));
            dispatch(R_logout());
            let keys = ['$leppiUserId', '$leppiSkipWelcome'];
            try {
                await AsyncStorage.multiRemove(keys);
                // //console.log('===== R_logout');
                await firebase.auth().signOut();
            } catch (e) {
                dispatch(isLoading(false));
            }
        }
    };
};

export const isMediaUploaded = (url) => ({
    type: TYPES.UPLOAD_MEDIA_SUCCESS,
    payload: url
});
/**
 * Upload image method
 */
export const uploadMedia = media => {
    return async dispatch => {
        try {
            const filename = `${uuid()}.jpeg`; // Generate unique name
            const uploadPath = `${media.path}/${media.userId}/${filename}`;
            //console.log('===== uploadMedia', media);
            dispatch(isLoading(true));
            const ref = firebase.storage().ref(uploadPath);
            await ref.putFile(media.uri, {cacheControl: 'no-store',});
            dispatch(isMediaUploaded(uploadPath));
            dispatch(isLoading(false));
        } catch (e) {
            dispatch(isLoading(false));
        }
    };
};

export const uploadFile = async (filePath, dir) => {
    try {
        const filename = `${uuid()}.jpeg`; // Generate unique name
        const uploadPath = `${dir}/${filename}`;
        await firebase.storage().ref(uploadPath).putFile(filePath, {cacheControl: 'no-store',});
        return uploadPath;
    } catch (e) {
        console.log('upload file error', e.message);
        return false;
    }

}

export const deleteFile = async (filePath, dir) => {
    try {
        await firebase.storage().ref(filePath).delete();
        return true;
    } catch (e) {
        console.log('delete file error', e.message);
        return false;
    }
}

export const createFeed = (feed, userMeta) => {
    return async (dispatch, getState) => {
        dispatch(isLoading(true));
        // //console.log('===== createFeed');
        if (feed.feed_type === FeedTypes.sell) delete feed.mediaList;
        try {
            feed.location = userMeta.location;
            feed.createTime = Math.floor(Date.now());
            await firebase.firestore().collection('feeds').add(feed);
            dispatch(fetchingUserMetaSuccess(userMeta));

            let requestConfig = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({userId: userMeta.userId})
            };
            let url = REQUEST_URL + "/api/push/newFeed/";
            let respond = fetch(url, requestConfig);
            dispatch(isLoading(false));
        } catch (e) {
            dispatch(isLoading(false));
            // console.log('create feed error === ', e.message)
        }
    };
};


export const updateFeed = (feedId, feed) => {
    return async (dispatch, getState) => {
        console.log('feedId', feedId);
        dispatch(isLoading(true));
        try {
            await firebase.firestore().doc('feeds/' + feedId).update(feed);
            dispatch(isLoading(false));
        } catch (e) {
            dispatch(isLoading(false));
            // console.log('updateFeed === ', e.message)
        }
    };
};

export const deleteFeed = (feedId) => {
    return async (dispatch, getState) => {
        dispatch(isLoading(true));
        try {
            let requestConfig = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    feedId: feedId,
                })
            };
            let url = REQUEST_URL + "/api/feeds/delete";
            await fetch(url, requestConfig);
            dispatch(isLoading(false));
        } catch (e) {
            dispatch(isLoading(false));
        }
    };
};

export const setFeedList = (feedList) => ({
    type: TYPES.FETCHING_FEEDS_SUCCESS,
    payload: feedList
});

export const fetchingFeeds = (userMeta, page = 1) => {
    return async (dispatch, getState) => {
        let feedList = [];
        let tempList = [];
        dispatch(isLoading(true));
        try {
            let requestConfig = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    lat: userMeta.location.lat,
                    lng: userMeta.location.lng,
                })
            };
            let url = REQUEST_URL + "/api/feeds/list";
            let respond = await fetch(url, requestConfig);
            let json = await respond.json();
            if (json.result && json.result === 'ok') {
                tempList = json.list;
            }
            if (tempList.length > 0){
                let DataPromises = [];
                tempList.forEach(item => {
                    DataPromises.push(new Promise( async function(resolve, reject) {
                        let feedItem = item;
                        if (feedItem.userId === userMeta.userId) {
                            feedItem.userMeta = userMeta;
                            resolve(feedItem);
                        } else {
                            let userMetaSnapshot = await firebase.firestore().doc('userMeta/' + feedItem.userId).get();
                            let userMeta = userMetaSnapshot.data();
                            if (typeof userMeta.avatar !== 'undefined' && userMeta.avatar) {
                                userMeta.avatarUrl = await firebase.storage().ref(userMeta.avatar).getDownloadURL();
                            }
                            feedItem.userMeta = userMeta;
                            resolve(feedItem);
                        }
                    }));
                });
                Promise.all(DataPromises).then(response =>dispatch(setFeedList(response)))
                // feedList.push(feedItem);
            }
            dispatch(isLoading(false));
        } catch (e) {
            dispatch(setFeedList(feedList))
        }
    }
};

export const filterMediaList = (gallery, callback) => {
    let itemList = [];
    // //console.log('===== filterMediaList');
    try {
        gallery.forEach(async item => {
            let downLoadUrl = await firebase.storage().ref(item).getDownloadURL();
            itemList.push(downLoadUrl);
            callback(itemList);
        });
    } catch (e) {
        callback(itemList);
    }

};

export const setFoodInfo = json => ({
    type: TYPES.SET_FEED_INFO,
    payload: json
});

export const setChatFoodInfo = (feedInfo) => {
    return async dispatch => {
        dispatch(isLoading(true));
        dispatch(setFoodInfo(feedInfo));
    };
};

export const setRoomInfo = json => ({
    type: TYPES.SET_ROOM_INFO,
    payload: json
});

export const goToChatRoom = (userId, roomInfo) => {
    return async dispatch => {
        let roomItem = cloneDeep(roomInfo);
        dispatch(isLoading(true));
        try {
            roomInfo.createTime = Math.floor(Date.now());
            let existRoom = await firebase.firestore()
                .collection('chatRooms')
                .where('users', '==', roomInfo.users)
                .get();

            if (!existRoom.empty) {
                existRoom.forEach(item => {
                    roomItem.roomId = item.id;
                });
            } else {
                const roomId = await firebase.firestore()
                    .collection('chatRooms')
                    .add(roomInfo).id;
                roomItem.roomId = roomId;
            }
            let userMetaSnapshot = await firebase.firestore().doc('userMeta/' + userId).get();
            let userMeta = userMetaSnapshot.data();
            if (typeof userMeta.avatar !== 'undefined' && userMeta.avatar) {
                userMeta.avatarUrl = await firebase.storage().ref(userMeta.avatar).getDownloadURL();
            }
            roomItem.userMeta = userMeta;
            dispatch(setRoomInfo(roomItem));
        } catch (e) {
            console.log('goChatRoom', e.message);
            dispatch(isLoading(false));
        }
    };
};

export const sendMessage = async (userMeta, roomInfo, message) => {
    message.createTime = Math.floor(Date.now());
    // //console.log('===== sendMessage');
    const userId = userMeta.userId;

    try {
        await firebase.database().ref('messages').child(roomInfo.roomId).push(message);
        await firebase.firestore().doc('chatRooms/' + roomInfo.roomId)
            .update({
                lastMsg: message.content,
                lastMsgTime: Math.floor(Date.now()),
            });

        let requestConfig = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                senderName: userMeta.first_name + ' ' + userMeta.last_name,
            })
        };
        const receiver = roomInfo.users[0] === userId ? roomInfo.users[1] : roomInfo.users[0];
        let url = REQUEST_URL + "/api/push/newMsg/" + receiver;
        fetch(url, requestConfig)
            .then((response) => {
            })
            .catch((error) => {
            });
    } catch (e) {
    }

};

export const onMessages = (roomId, callback) => {
    // //console.log('===== onMessages');
    let messages = [];
    try {
        firebase.database()
            .ref('messages')
            .child(roomId)
            .on('child_added', snapshot => {
                const message = {
                    msgId: snapshot.key,
                    ...snapshot.val()
                };
                //console.log('onMessages ===== ', message);
                messages.push(message);
                callback(messages);
            });
    } catch (e) {
        callback(messages);
    }
};

export const fetchingChatRooms = (userData, callback) => {
    let chatRooms = [];
    try {
        firebase.firestore()
            .collection('chatRooms')
            .where('users', 'array-contains', userData.userId)
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    callback(chatRooms);
                }
                let promiseList = [];
                querySnapshot.forEach((documentSnapshot) => {
                    let chatRoom = documentSnapshot.data();
                    let receiverId = '';
                    if (chatRoom.users[0] === userData.userId) {
                        receiverId = chatRoom.users[1];
                    } else {
                        receiverId = chatRoom.users[0];
                    }
                    promiseList.push(new Promise(async (resolve, reject) => {
                        let userMetaDoc = await firebase.firestore().doc('userMeta/' + receiverId).get();
                        let userMeta = userMetaDoc.data();
                        if (typeof userMeta.avatar !== 'undefined' && userMeta.avatar) {
                            userMeta.avatarUrl = await firebase.storage().ref(userMeta.avatar).getDownloadURL();
                        }
                        chatRoom.userMeta = userMeta;
                        resolve(chatRoom);
                    }))
                });
                Promise.all(promiseList)
                    .then(response => callback(response))
                    .catch((error) => {
                        callback(chatRooms);
                    });
            })
            .catch((error) => {
                callback(chatRooms);
            });
    } catch (e) {
        callback(chatRooms);
    }

};

export const fetchingChatUsers = (roomInfo, page, callback) => {
    let chatUsers = [];
    callback(chatUsers);
};

export const updateLocation = (userMeta) => {
    return async (dispatch, getState) => {
        dispatch(isLoading(true));

        let location = {
            address: userMeta.address,
            city: userMeta.city,
            street: userMeta.street,
            district: userMeta.district,
            country: userMeta.country,
            cca2: userMeta.cca2,
            location: userMeta.location,
        };

        try {
            await firebase.firestore().doc('userMeta/' + userMeta.userId).update(location);
            dispatch(fetchingUserMetaSuccess(userMeta));
        } catch (e) {
            dispatch(isLoading(false));
        }
    };
};

export const getCurrentTime = async () => {
    try {
        let respond = await fetch("http://worldclockapi.com/api/json/cst/now");
        let json = await respond.json();
        if (typeof json.currentDateTime !== 'undefined') {
            // console.log("current time  ================", new Date(json.currentDateTime));
            return new Date(json.currentDateTime);
        }
        return new Date();
    } catch (e) {
        console.log(e.message);
        return new Date();
    }
};

export const fetchNewUsers = async (callback) => {
    let listData = [];
    const userId = await AsyncStorage.getItem('$leppiUserId');
    try {
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        firebase.firestore().collection('userMeta').where('createTime', '>', Math.floor(yesterday)).get()
            .then((snapshot) => {
                if (snapshot.empty) {
                    callback(listData);
                }
                let promiseList = [];
                snapshot.forEach(doc => {
                    let userMeta = cloneDeep(doc.data());
                    if (userMeta.userId !== userId) {
                        promiseList.push(new Promise(async (resolve, reject) => {
                            if (typeof userMeta.avatar !== 'undefined' && userMeta.avatar) {
                                userMeta.avatarUrl = await firebase.storage().ref(userMeta.avatar).getDownloadURL();
                            }
                            resolve(userMeta);
                        }));
                    }
                });
                Promise.all(promiseList)
                    .then(response => callback(response))
                    .catch((error) => {
                        console.log('error', error.message);
                        callback(listData)
                    });
            })
            .catch((error) => {
                callback(listData);
            });
    } catch (e) {
        callback(listData);
    }
};