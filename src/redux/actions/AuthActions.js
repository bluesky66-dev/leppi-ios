import * as TYPES from "../constants/types";
import {CLICK_MENU} from "../constants/types";
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '@react-native-firebase/app'
import Toast from 'react-native-simple-toast';
import uuid from 'uuid/v4';
import {MENU_TYPES} from "../constants/menuTypes";

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
        let keys = ['$leppiUserId', '$leppiGroupId', '$leppiSkipWelcome', '$leppiFCMToken'];
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
            dispatch(isLoading(false));
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

export const fetchSignup = data => {
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
            } else {
                if (json.msg && json.msg.code) {
                    if (json.msg.code === 'auth/invalid-phone-number') {
                        Toast.show("Invalid phone number!", Toast.SHORT);
                    } else  if (json.msg.code === 'auth/invalid-email') {
                        Toast.show("Invalid email address!", Toast.SHORT);
                    } else if (json.msg.code === 'auth/invalid-email') {
                        Toast.show("Invalid email address!", Toast.SHORT);
                    } else {
                        Toast.show(json.msg.message, Toast.SHORT);
                    }
                } else {
                    Toast.show("The system is busy now!", Toast.SHORT);
                }
                dispatch(fetchingSignupFailure('error'));
            }
        } catch (e) {
            //console.log('fetchSignup error ======', e.message);
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
                let keys = ['$leppiUserId', '$leppiGroupId', '$leppiSkipWelcome', '$leppiFCMToken'];
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

                // //console.log('===== fetchingUserMeta result', userMeta);
                const groupId = await AsyncStorage.getItem('$leppiGroupId');

                if (typeof groupId === 'string' && groupId) {
                    const groupSnapshot = await firebase.database()
                        .ref('groups')
                        .child(groupId)
                        .once('value');
                    let groupMeta = groupSnapshot.val();
                    groupMeta.groupId = groupId;
                    dispatch(isJoinedGroup(groupMeta));
                } else {
                    navigate('JoinGroupPage');
                }
            }
        } catch (error) {
            console.log('ERROR ------- ', error.message);
            // //console.log(error);
            dispatch(isLoading(false));
            dispatch(R_logout());
            let keys = ['$leppiUserId', '$leppiGroupId', '$leppiSkipWelcome', '$leppiFCMToken'];
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

export const isJoinedGroup = group => ({
    type: TYPES.JOIN_GROUP_SUCCESS,
    payload: group
});

export const createGroup = (group, userMeta, callback = false) => {
    return async dispatch => {
        dispatch(isLoading(true));
        try {
            let newGroup = Object.assign({}, group);
            let newUserMeta = Object.assign({}, userMeta);
            const fcmToken = await AsyncStorage.getItem('$leppiFCMToken');
            // //console.log('===== createGroup1');
            newGroup.memberCount = 1;
            let groupId = await firebase.database()
                .ref('groups')
                .push(group).key;
            await AsyncStorage.setItem("$leppiGroupId", groupId);
            // //console.log('===== createGroup4');
            newGroup.groupId = groupId;
            // //console.log('===== createGroup5');
            let createTime = Math.floor(Date.now());
            let groupUser = {
                userId: group.userId,
                fcmToken: fcmToken,
                createTime: createTime,
            };
            await firebase.database()
                .ref('groupUsers')
                .child(groupId)
                .push(groupUser).key;

            let userGroup = {
                groupId: groupId,
                createTime: createTime,
            };
            await firebase.database()
                .ref('userGroups')
                .child(group.userId)
                .push(userGroup).key;
            // //console.log('group', group);
            let userPoints = newUserMeta.points ? newUserMeta.points : 0;
            userPoints += 50;
            // //console.log('===== createGroup2');
            newUserMeta.points = userPoints;
            // //console.log('===== createGroup3', newGroup);
            await firebase.database()
                .ref('userMeta')
                .child(newGroup.userId)
                .update({points: userPoints});
            dispatch(fetchingUserMetaSuccess(newUserMeta));
            dispatch(isJoinedGroup(newGroup));
            // //console.log('callback type', typeof callback);
            if (callback) {
                callback();
            }
        } catch (e) {
            // //console.log('createGroup error', e.message);
            dispatch(isLoading(false));
        }
    };
};

//REVISAR 
export const joinGroup = (group, userId) => {
    return async (dispatch, getState) => {

        dispatch(isLoading(true));
        // //console.log('===== joinGroup');

        try {
            const fcmToken = await AsyncStorage.getItem('$leppiFCMToken');
            let groupId = group.groupId;
            let createTime = Math.floor(Date.now());
            let groupUser = {
                userId: userId,
                fcmToken: fcmToken,
                createTime: createTime,
            };

            let existUser = await firebase.database()
                .ref('groupUsers')
                .child(groupId)
                .orderByChild('userId')
                .equalTo(userId)
                .once('value');
            if (!existUser.exists()) {
                if (group.memberCount) {
                    group.memberCount = group.memberCount * 1 + 1;
                } else {
                    group.memberCount = 2;
                }
                await firebase.database()
                    .ref('groups')
                    .child(group.groupId)
                    .child('memberCount')
                    .set(group.memberCount);
                await firebase.database()
                    .ref('groupUsers')
                    .child(group.groupId)
                    .push(groupUser).key;
            } else {
                let count = 0;
                existUser.forEach(item => {
                    if (count === 0) {
                        // //console.log('=========== exist user key', item.key);
                        firebase.database()
                            .ref('groupUsers')
                            .child(groupId)
                            .child(item.key)
                            .update({fcmToken: fcmToken});
                    }
                    count++;
                });
            }

            let userGroup = {
                groupId: groupId,
                createTime: createTime,
            };

            let existUGroup = await firebase.database()
                .ref('userGroups')
                .child(userId)
                .orderByChild('groupId')
                .equalTo(groupId)
                .once('value');
            if (!existUGroup.exists()) {
                await firebase.database()
                    .ref('userGroups')
                    .child(userId)
                    .push(userGroup).key;
            }
            await AsyncStorage.setItem("$leppiGroupId", groupId);
            dispatch(isJoinedGroup(group));

            //ACA DARLE PUNTAJE AL QUE INVITO SI ESTA LINKEADO

            const stateLink = getState().AuthReducer.link;

            // //console.log('LINK: ---->');
            // //console.log(stateLink);

            if (stateLink && stateLink.linkgroupId && groupId === stateLink.linkgroupId) {
                const usuarioId = stateLink.userLinkId;
                try {
                    const userMetaSnapshot = await firebase.database().ref('userMeta').child(usuarioId);

                    userMetaSnapshot.once('value', (snapshot) => {
                        const oldPoint = snapshot.val().points ? snapshot.val().points : 0;
                        userMetaSnapshot.update({points: (oldPoint + 20)});
                    });

                    dispatch({type: TYPES.LINK_OUT})

                } catch (error) {
                    // //console.log('ERROR------- >>>');
                    // //console.log(error)
                }
            } else {

            }
        } catch (e) {
            dispatch(isLoading(false));
        }
    };
};

export const fetchingGroups = async (groupId, userMeta, callback) => {
    let groupList = [];
    try {
        let requestConfig = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                groupId: groupId,
                lat: userMeta.location.lat,
                lng: userMeta.location.lng,
            })
        };

        let url = REQUEST_URL + "/api/groups/list";
        let respond = await fetch(url, requestConfig);
        let json = await respond.json();
        if (json.result && json.result === 'ok') {
            groupList = json.list;
        }
        // //console.log('====== groupList', groupList);
        callback(groupList);
    } catch (e) {
        //console.log('fetchingGroups error ======', e.message);
        callback(groupList);
    }
};

export const fetchingGroupCreator = async (userId, callback) => {
    // //console.log('===== fetchingGroupCreator');
    let userMeta = {};
    try {
        const userMetaSnapshot = await firebase.database()
            .ref('userMeta')
            .child(userId)
            .once('value');

        if (userMetaSnapshot.exists()) {
            userMeta = userMetaSnapshot.val();
            callback(userMeta);
        } else {
            callback(userMeta);
        }
    } catch (e) {
        callback(userMeta);
    }
};

export const fetchingUserGroups = async (userId, location, callback) => {
    let userGroups = [];
    // //console.log('===== fetchingUserGroups');
    try {
        let userGroupsSnapshot = await firebase.database()
            .ref('userGroups')
            .child(userId)
            .once('value');
        if (userGroupsSnapshot.exists()) {
            userGroupsSnapshot.forEach(async item => {
                let userGroup = item.val();
                let groupSnapshot = await firebase.database()
                    .ref('groups')
                    .child(userGroup.groupId)
                    .once('value');
                if (groupSnapshot.exists()) {
                    userGroup.groupInfo = groupSnapshot.val();
                    userGroup.groupInfo.groupId = groupSnapshot.key;
                    userGroups.push(userGroup);
                    callback(userGroups);
                }
            });
        } else {
            callback(userGroups);
        }
    } catch (e) {
        callback(userGroups);
    }
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
        const userId = userMeta.userId;
        dispatch(isLoading(true));
        // //console.log('===== createFeed');
        if (! typeof feed.gallery_uris === 'undefined') delete feed.gallery_uris;
        try {
            feed.createTime = Math.floor(Date.now());
            const groupId = await AsyncStorage.getItem('$leppiGroupId');
            const feedId = await firebase.database()
                .ref('feeds')
                .child(groupId)
                .push(feed).key;
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
            let url = REQUEST_URL + "/api/push/newFeed/" + groupId;
            let respond = fetch(url, requestConfig);
            dispatch(isLoading(false));
        } catch (e) {
            dispatch(isLoading(false));
        }
    };
};

export const fetchingFeeds = async (groupId, userData, page, callback) => {
    let feedList = [];
    // //console.log('===== fetchingFeeds');
    try {
        let snapshot = await firebase.database()
            .ref('feeds')
            .child(groupId)
            .once('value');
        if (snapshot.exists()) {
            snapshot.forEach(async item => {
                let feedItem = item.val();
                feedItem.feedId = item.key;
                if (feedItem.userId === userData.userId) {
                    feedItem.userMeta = userData;
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

export const fetchingRecentFeeds = async (groupId, callback) => {
    let feedList = [];
    // //console.log('===== fetchingRecentFeeds groupId', groupId);
    try {
        let snapshot = await firebase.database()
            .ref('feeds')
            .child(groupId)
            .orderByChild('createTime')
            .limitToLast(3)
            .once('value');
        if (snapshot.exists()) {
            snapshot.forEach(async item => {
                let feedItem = item.val();
                feedItem.feedId = item.key;
                if (feedItem.gallery && Array.isArray(feedItem.gallery) && feedItem.gallery.length > 0) {
                    feedItem.thumbnail = await firebase.storage().ref(feedItem.gallery[0]).getDownloadURL();
                }
                // //console.log('===== fetchingRecentFeeds feedItem', feedItem);
                feedList.push(feedItem);
                callback(feedList);
            });
        } else {
            callback(feedList);
        }
    } catch (e) {
        callback(feedList);
    }
};

export const filterMediaGallery = (gallery, callback) => {
    let itemList = [];
    // //console.log('===== filterMediaGallery');
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
            const groupId = await AsyncStorage.getItem('$leppiGroupId');
            let existRoom = await firebase.database()
                .ref('chatRooms')
                .child(groupId)
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
                roomInfo.roomId = await firebase.database()
                    .ref('chatRooms')
                    .child(groupId)
                    .child(roomInfo.feedId)
                    .push(roomInfo).key;
                dispatch(setRoomInfo(roomInfo));
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

export const fetchingChatRooms = async (groupId, userData, callback) => {
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
                        let feedSnapshot = await firebase.database()
                            .ref('feeds')
                            .child(groupId)
                            .child(snapshot.key)
                            .once('value');
                        if (feedSnapshot.exists()) {
                            let feedItem = feedSnapshot.val();
                            feedItem.feedId = feedSnapshot.key;
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
            .child(roomInfo.groupId)
            .child(roomInfo.feedId)
            .orderByChild('sellerId')
            .equalTo(roomInfo.sellerId)
            .on('child_added', async snapshot => {
                // //console.log('===== fetchingChatUsers result');
                let chatUser = {};
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

export const linkURL = (userLinkId, linkgroupId) => ({
    type: TYPES.LINK_IN,
    userLinkId: userLinkId,
    linkgroupId: linkgroupId
});




