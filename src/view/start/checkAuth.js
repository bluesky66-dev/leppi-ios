import React, {Component} from "react";
import {Actions} from "react-native-router-flux";
import {connect} from "react-redux";
import firebase from 'react-native-firebase';
import * as authActions from "../../redux/actions/AuthActions";
import AsyncStorage from "@react-native-community/async-storage";
import {MENU_TYPES} from "../../redux/constants/menuTypes";

class CheckAuth extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        try {
            firebase.links()
                .getInitialLink()
                .then((url) => {
                    if (url) {
                        // app opened from a dynamic link URL
                        const groupId = url.split('/').pop();
                        const userId = url.split('/').pop();

                        // console.log('GROUP ID ======= ', groupId);
                        // console.log('USER ID ======== ', userId);

                        this.props.authActions(userId, groupId);
                    }
                });
            this.authSubscription = firebase.auth().onAuthStateChanged(async (user) => {
                if (Actions.currentScene !== 'register' && Actions.currentScene !== 'password') {
                    if (user) {
                        console.log('Actions.start ==== user');
                    } else {
                        console.log('Actions.start ==== else');
                        Actions.start();
                    }
                }
            });
            const userId = await AsyncStorage.getItem('$leppiUserId');
            if (userId != null) {
                let skipWelcome = await AsyncStorage.getItem('$leppiSkipWelcome');
                if (skipWelcome === '1') {
                    this.props.clickMenu(MENU_TYPES.HOME);
                    Actions.main();
                } else {
                    Actions.welcome();
                }
            } else {
                Actions.start();
            }
        } catch (e) {
            Actions.start();
        }
    }

    componentWillUnmount() {
        if (this.authSubscription) {
            this.authSubscription();
        }
    }

    render() {
        return null;
    }
}

function mapStateToProps(state, props) {
    return {
        userMeta: state.AuthReducer.userMeta,
        isLoading: state.AuthReducer.isLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clickMenu: (type) => dispatch(authActions.clickMenu(type)),
        authActions: (userId, groupId) => dispatch(authActions.linkURL(userId, groupId)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckAuth);
