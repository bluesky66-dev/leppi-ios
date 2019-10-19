import React, {Component} from "react";
import {connect} from "react-redux";
import * as authActions from "../../redux/actions/AuthActions";
import {LoginForm} from "../../components/forms";
import styles from "../../styles/auth/auth";
import Spinner from 'react-native-loading-spinner-overlay';
import facebookIcon from "../../images/facebook.png";
import googleIcon from "../../images/google.png";
import {AppTopSection} from "../../components/start";
import {Image, ScrollView, TouchableOpacity, Text, View} from "react-native";
import {listenOrientationChange as lor, removeOrientationListener as rol} from 'react-native-responsive-screen';
import {GoogleSignin} from '@react-native-community/google-signin';
import firebase from '@react-native-firebase/app'
import AsyncStorage from '@react-native-community/async-storage';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        lor(this);
    }

    componentWillUnmount() {
        rol();
    }

    async login(data) {
        const {navigate} = this.props.navigation;
        await this.props.fetchLogin(data, navigate);
    }

    googleLogin = async () => {
        const {navigate} = this.props.navigation;
        try {
            this.props.setLoadingSpinner(true);
            // add any configuration settings here:
            GoogleSignin.configure({
                webClientId: '977355674217-j5lsbd696h4su516hju8dcjpgqvt33b9.apps.googleusercontent.com',
                iosClientId: '977355674217-598urdjbhmki420j0209jg4l16bb7dp4.apps.googleusercontent.com',
            });

            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('Google sign userInfo', userInfo);
            const tokens = await GoogleSignin.getTokens();
            console.log('Google sign tokens', tokens);
            // create a new firebase credential with the token
            const credential = firebase.auth.GoogleAuthProvider.credential(tokens.idToken, tokens.accessToken);
            // login with credential

            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
            this.props.setLoadingSpinner(false);
            let userId = firebaseUserCredential.user.uid;
            // if (!userId) {
            //     return false;
            // }
            console.log('userId ====== ', userId);

            AsyncStorage.setItem('$leppiUserId', userId);
            await this.props.fetchingSocialMetaData(userId, navigate);
        } catch (error) {
            this.props.setLoadingSpinner(false);
            console.log('google sign error', error);
        }
    }

    render() {
        var title = "Leppi";
        return (
            <View style={styles.rootWrapper}>
                <Spinner
                    visible={this.props.isLoading}
                    textContent={''}
                    textStyle={{ color: '#FFF' }}
                />
                <ScrollView>
                    <AppTopSection authStep={0} onBackPress={() => { this.props.navigation.goBack() }} />
                    <LoginForm
                        login
                        navigation={this.props.navigation}
                        onPress={this.login.bind(this)} />
                    <View style={styles.thirdLoginWrapper}>
                        <View style={styles.thirdLoginContainer}>
                            <Text style={[styles.generalText]}>{"or login through"}</Text>
                        </View>
                        <View style={styles.thirdLoginContainer}>    
                            <TouchableOpacity onPress={this.googleLogin.bind(this)} style={styles.socialButton} activeOpacity={1}>
                                <Image source={googleIcon} style={styles.socialButtonIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        loggedIn: state.AuthReducer.loggedIn,
        authErrorMessage: state.AuthReducer.authErrorMessage,
        isLoading: state.AuthReducer.isLoading,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoadingSpinner: (loading) => dispatch(authActions.setLoadingSpinner(loading)),
        fetchLogin: (type, navigate) => dispatch(authActions.fetchLogin(type, navigate)),
        fetchingSocialMetaData: (userId, navigate) => dispatch(authActions.fetchingSocialMetaData(userId, navigate)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);


