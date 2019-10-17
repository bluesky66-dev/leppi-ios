import * as TYPES from "../constants/types";
import { createReducer } from 'redux-create-reducer'
import {MENU_TYPES} from "../constants/menuTypes";

const initialState = {
    authErrorMessage: null,
    errorMessage: null,
    isLoading: false,
    currentLocation: {},
    isSignuped: false,
    isJoinedGroup: false,
    userId: '',
    groupId: '',
    userMeta: {},
    downloadURL: '',
    groupSwiperLength: 0,
    joinedGroup: {},
    feedInfo: {},
    roomInfo: {},
    currentMenu: MENU_TYPES.HOME,
    link: null
};


const AuthReducer = createReducer(initialState, {

    [TYPES.LOG_OUT]: (state, action) => {
        return {
            ...state,
            authErrorMessage: null,
            errorMessage: null,
            isLoading: false,
            isSignuped: false,
            isJoinedGroup: false,
            userId: '',
            groupId: '',
            userMeta: {},
            downloadURL: '',
            groupSwiperLength: 0,
            joinedGroup: {},
            feedInfo: {},
            roomInfo: {},
            currentMenu: '',
            link: null
        }
    },
    [TYPES.CLICK_MENU]: (state, action) => {
        return {
            ...state,
            currentMenu: action.currentMenu,
        }
    },
    [TYPES.CURRENT_LOCATION]: (state, action) => {
        return {
            ...state,
            currentLocation: action.payload,
        }
    },
    [TYPES.FETCHING_LOGIN_REQUEST]: (state, action) => {
        return {
            ...state,
            isLoading: true
        }
    },
    [TYPES.FETCHING_LOGIN_FAILURE]: (state, action) => {
        return {
            ...state,
            isLoading: false,
            authErrorMessage: ''
        }
    },
    [TYPES.FETCHING_LOGIN_SUCCESS]: (state, action) => {
        return {
            ...state,
            isLoading: false,
        }
    },
    [TYPES.FETCHING_SIGNUP_REQUEST]: (state, action) => {
        return {
            ...state,
            isLoading: true,
            isSignuped: false,
        }
    },
    [TYPES.FETCHING_SIGNUP_FAILURE]: (state, action) => {
        return {
            ...state,
            isLoading: false,
            authErrorMessage: action.payload,
            isSignuped: false,
        }
    },
    [TYPES.FETCHING_SIGNUP_SUCCESS]: (state, action) => {
        return {
            ...state,
            isLoading: false,
            isSignuped: true,
            userId: action.payload,
        }
    },
    [TYPES.FETCHING_USER_META_SUCCESS]: (state, action) => {
        return {
            ...state,
            isLoading: false,
            isSignuped: true,
            userMeta: action.payload,
        }
    },
    [TYPES.SET_USER_ID]: (state, action) => {
        return {
            ...state,
            userId: action.payload,
        }
    },
    [TYPES.UPLOAD_MEDIA_SUCCESS]: (state, action) => {
        return {
            ...state,
            downloadURL: action.payload,
            isLoading: false,
        }
    },
    [TYPES.IS_LOADING]: (state, action) => {
        return {
            ...state,
            isLoading: action.payload,
        }
    },
    [TYPES.JOIN_GROUP_SUCCESS]: (state, action) => {
        return {
            ...state,
            groupId: action.payload.groupId,
            joinedGroup: action.payload,
            isJoinedGroup: true,
            isLoading: false,
        }
    },
    [TYPES.SET_FEED_INFO]: (state, action) => {
        return {
            ...state,
            feedInfo: action.payload,
            isLoading: false,
        }
    },
    [TYPES.SET_ROOM_INFO]: (state, action) => {
        return {
            ...state,
            roomInfo: action.payload,
            isLoading: false,
        }
    },
    [TYPES.LINK_IN]: (state, action) => {
        return {
            ...state,
            link: { userLinkId: action.userLinkId, linkgroupId: action.linkgroupId }
        }
    },
    [TYPES.LINK_OUT]: (state, action) => {
        return {
            ...state,
            link: null
        }
    }
});

export default AuthReducer;
