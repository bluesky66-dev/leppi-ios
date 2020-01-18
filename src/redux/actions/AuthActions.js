import * as TYPES from "../constants/types";
import {CLICK_MENU} from "../constants/types";
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '@react-native-firebase/app'
import Toast from 'react-native-simple-toast';
import uuid from 'uuid/v4';
import {MENU_TYPES} from "../constants/menuTypes";
import {FeedTypes} from "../constants/feedConstants";

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

export const fetchSignup = (data, userMeta, callback) => {
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
            //console.log('fetch Signup data', requestConfig.body);
            let respond = await fetch(url, requestConfig);
            let json = await respond.json();
            //console.log('====== json uid', json);
            if (json.result && json.result === 'ok') {
                await AsyncStorage.setItem('$leppiUserId', json.uid);
                await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
                dispatch(fetchingSignupSuccess(json.uid));

                let tUserMeta = Object.assign({}, userMeta);
                tUserMeta.userId = json.uid;

                console.log('userMeta ===', tUserMeta);
                dispatch(createUserMeta(tUserMeta));
            } else {
                if (json.msg && json.msg.code) {
                    Toast.show(json.msg.message, Toast.SHORT);
                } else {
                    Toast.show("The system is busy now!", Toast.SHORT);
                }
                console.log('fetchSignup error ======');
                dispatch(fetchingSignupFailure('error'));
            }
        } catch (e) {
            console.log('fetchSignup error ======', e.message);
            dispatch(isLoading(false));
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
            await await firebase.database()
                .ref('userMeta')
                .child(metaData.userId)
                .update(metaData);
            dispatch(setUserMeta(metaData));
            dispatch(isLoading(false));
        } catch (e) {
            console.log('===== createUserMeta error', e.message);
            dispatch(isLoading(false));
        }
    };
};

export const fetchingSocialMetaData = (userId, navigate) => {
    return async dispatch => {
        try {
            dispatch(isLoading(true));
            dispatch(setUserId(userId));
            // //console.log('===== fetchingUserMeta');
            const userMetaSnapshot = await firebase.database()
                .ref('userMeta')
                .child(userId)
                .once('value');
            dispatch(isLoading(false));
            if (userMetaSnapshot.exists()) {
                //console.log('======= userMeta exists');
                navigate('Welcome');
            } else {
                //console.log('======= userMeta does not exists');
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
            // //console.log('===== fetchingUserMeta');
            const userMetaSnapshot = await firebase.database()
                .ref('userMeta')
                .child(userId)
                .once('value');
            console.log('userMetaSnapshot.exists == ', userMetaSnapshot.exists());
            if (!userMetaSnapshot.exists()) {
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
                let userMeta = userMetaSnapshot.val();
                firebase.database()
                    .ref('userMeta')
                    .child(userId)
                    .update({fcmToken: fcmToken});

                //console.log('userMeta.avatar', userMeta.avatar);
                userMeta.avatarUrl = await firebase.storage().ref(userMeta.avatar).getDownloadURL();
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
            await firebase.firestore()
            .collection('feeds')
            .add(feed);
            let userPoints = userMeta.points ? userMeta.points : 0;
            userPoints += 10;
            userMeta.points = userPoints;
            await firebase.database()
                .ref('userMeta')
                .child(userMeta.userId)
                .update({points: userPoints});
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
            await firebase.firestore()
            .doc('feeds/' + feedId)
            .update(feed);
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

export const fetchingFeeds = async (userMeta, page, callback) => {
    let feedList = [];
    let tempList = [];
    // //console.log('===== fetchingFeeds');
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
        if (tempList.length > 0) {
            tempList.forEach(async item => {
                let feedItem = item;
                if (feedItem.userId === userMeta.userId) {
                    feedItem.userMeta = userMeta;
                    feedList.push(feedItem);
                    callback(feedList);
                } else {
                    let userMetaSnapshot = await firebase.database()
                        .ref('userMeta')
                        .child(feedItem.userId)
                        .once('value');

                    let userMeta = userMetaSnapshot.val();
                    userMeta.avatarUrl = await firebase.storage().ref(userMeta.avatar).getDownloadURL();
                    feedItem.userMeta = userMeta;
                    feedList.push(feedItem);
                    callback(feedList);
                }
            });
        } else {
            callback(feedList);
        }
    } catch (e) {
        callback(feedList);
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

export const goToChatRoom = (roomInfo) => {
    return async dispatch => {
        // //console.log('===== goToChatRoom');
        dispatch(isLoading(true));
        try {
            roomInfo.createTime = Math.floor(Date.now());
            let existRoom = await firebase.database()
                .ref('chatRooms')
                .child(roomInfo.feedId)
                .orderByChild('buyerId')
                .equalTo(roomInfo.buyerId)
                .once('value');
            let feedInfo = {
                feedId: roomInfo.feedId,
                lastMsg: '',
                lastMsgTime: '',
            };

            let sellerFeed = '';
            let existSellerFeed = await firebase.database()
                .ref('myFeeds')
                .child(roomInfo.sellerId)
                .child(roomInfo.feedId)
                .once('value');
            if (!existSellerFeed.exists()) {
                sellerFeed = await firebase.database()
                    .ref('myFeeds')
                    .child(roomInfo.sellerId)
                    .child(roomInfo.feedId)
                    .push(feedInfo).key;
            } else {
                existSellerFeed.forEach(item => {
                    sellerFeed = item.key;
                });
            }

            let buyerFeed = '';
            let existBuyerFeed = await firebase.database()
                .ref('myFeeds')
                .child(roomInfo.buyerId)
                .child(roomInfo.feedId)
                .once('value');
            if (!existBuyerFeed.exists()) {
                buyerFeed = await firebase.database()
                    .ref('myFeeds')
                    .child(roomInfo.buyerId)
                    .child(roomInfo.feedId)
                    .push(feedInfo).key;
            } else {
                existBuyerFeed.forEach(item => {
                    buyerFeed = item.key;
                });
            }

            roomInfo.sellerFeed = sellerFeed;
            roomInfo.buyerFeed = buyerFeed;
            if (existRoom.exists()) {
                existRoom.forEach(item => {
                    let itemVal = item.val();
                    itemVal.roomId = item.key;
                    dispatch(setRoomInfo(itemVal));
                });
            } else {
                const roomId = await firebase.database()
                    .ref('chatRooms')
                    .child(roomInfo.feedId)
                    .push(roomInfo).key;
                let roomItem = Object.assign({}, roomInfo);
                roomItem.roomId = roomId;
                // console.log('roomId ==', roomItem);
                dispatch(setRoomInfo(roomItem));
            }
        } catch (e) {
            dispatch(isLoading(false));
        }
    };
};

export const sendMessage = async (userMeta, roomInfo, message) => {
    message.createTime = Math.floor(Date.now());
    // //console.log('===== sendMessage');
    const userId = userMeta.userId;

    try {
        await firebase.database()
            .ref('messages')
            .child(roomInfo.roomId)
            .push(message).key;

        let updatedUserFeedData = {};
        let feedData = {
            feedId: roomInfo.feedId,
            lastMsg: message.content,
            lastMsgTime: message.createTime,
        };

        updatedUserFeedData[`${roomInfo.buyerId}/${roomInfo.feedId}/${roomInfo.buyerFeed}`] = feedData;
        updatedUserFeedData[`${roomInfo.sellerId}/${roomInfo.feedId}/${roomInfo.sellerFeed}`] = feedData;

        await firebase.database()
            .ref('myFeeds').update(updatedUserFeedData);

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
        const receiver = roomInfo.sellerId === userId ? roomInfo.buyerId : roomInfo.sellerId;
        let url = REQUEST_URL + "/api/push/newMsg/" + receiver;
        let respond = fetch(url, requestConfig);
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

export const fetchingChatRooms = async (userData, callback) => {
    // //console.log('====== fetchingChatRooms');
    let chatRooms = [];
    try {
        let chatR = await firebase.database()
            .ref('myFeeds')
            .child(userData.userId)
            .limitToFirst(1)
            .once('value');
        if (!chatR.exists()) {
            callback(chatRooms);
        }
        firebase.database()
            .ref('myFeeds')
            .child(userData.userId)
            .on('child_added', snapshot => {
                // //console.log('====== fetchingChatRooms 2');
                let chatRoom = {};
                if (snapshot.exists()) {
                    snapshot.forEach(async item => {
                        chatRoom = item.val();
                        let feedSnapshot = await firebase.firestore()
                        .doc('feeds/' + snapshot.key).get();
                        if (feedSnapshot.exists) {
                            let feedItem = feedSnapshot.data();
                            feedItem.feedId = feedSnapshot.id;
                            if (feedItem.userId === userData.userId) {
                                feedItem.userMeta = userData;
                                chatRoom.feedInfo = feedItem;
                                chatRooms.push(chatRoom);
                                callback(chatRooms);
                            } else {
                                let userMetaSnapshot = await firebase.database()
                                    .ref('userMeta')
                                    .child(feedItem.userId)
                                    .once('value');
                                feedItem.userMeta = userMetaSnapshot.val();
                                chatRoom.feedInfo = feedItem;
                                chatRooms.push(chatRoom);
                                callback(chatRooms);
                            }
                        } else {
                            callback(chatRooms);
                        }
                    });
                } else {
                    callback(chatRooms);
                }
            });
    } catch (e) {
        callback(chatRooms);
    }

};

export const fetchingChatUsers = (roomInfo, page, callback) => {
    let chatUsers = [];
    console.log('======= fetchingChatUsers', roomInfo);
    try {
        firebase.database()
            .ref('chatRooms')
            .child(roomInfo.feedId)
            .orderByChild('sellerId')
            .equalTo(roomInfo.sellerId)
            .on('child_added', async snapshot => {
                // //console.log('===== fetchingChatUsers result');
                let chatUser = roomInfo;
                if (snapshot.exists()) {
                    chatUser = snapshot.val();
                    // //console.log('====== chatUser', chatUser);
                    let userMetaSnapshot = await firebase.database()
                        .ref('userMeta')
                        .child(chatUser.buyerId)
                        .once('value');
                    let userMeta = userMetaSnapshot.val();
                    userMeta.avatarUrl = await firebase.storage().ref(userMeta.avatar).getDownloadURL();
                    chatUser.userMeta = userMeta;
                    chatUsers.push(chatUser);
                    callback(chatUsers);
                } else {
                    callback(chatUsers);
                }
            });
    } catch (e) {
        console.log('fetchingChatUsers', e.message);
        callback(chatUsers);
    }

};

export const udatePoints = (points) => {
    return async dispatch => {
        const userId = await AsyncStorage.getItem('$leppiUserId');
        try {
            const userMetaSnapshot = await firebase.database().ref('userMeta').child(userId)

            userMetaSnapshot.once('value', (snapshot) => {
                const oldPoint = snapshot.val().points ? snapshot.val().points : 0;
                userMetaSnapshot.update({points: (oldPoint + points)})
            })

        } catch (error) {
            // //console.log('ERROR------- >>>');
            // //console.log(error)
        }
    }
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
            await firebase.database()
                .ref('userMeta')
                .child(userMeta.userId)
                .update(location);

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
}
