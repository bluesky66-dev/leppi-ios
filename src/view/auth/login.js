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
        await this.props.fetchLogin(data);
    }

    googleLogin = async () => {
        try {
            this.props.setLoadingSpinner(true);
            // add any configuration settings here:
            await GoogleSignin.configure({
                scopes: ['https://www.googleapis.com/auth/drive.readonly'],
                webClientId: '1:977355674217:web:709cb855d1bc0112', // required
              });

            await GoogleSignin.hasPlayServices();

            await GoogleSignin.signIn();

            const tokens = await GoogleSignin.getTokens();

            // create a new firebase credential with the token
            const credential = firebase.auth.GoogleAuthProvider.credential(tokens.idToken, tokens.accessToken)
            // login with credential

            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
            this.props.setLoadingSpinner(false);
            let userId = firebaseUserCredential.user.uid;
            // if (!userId) {
            //     return false;
            // }
            console.log('userId ====== ', userId);

            AsyncStorage.setItem('$leppiUserId', userId);
            await this.props.fetchingSocialMetaData(userId);
        } catch (e) {
            this.props.setLoadingSpinner(false);
        }
    }

    render() {
        var title = "Leppi";
        return (
            <View>
                <Spinner
                    visible={this.props.isLoading}
                    textContent={''}
                    textStyle={{ color: '#FFF' }}
                />
                <ScrollView style={styles.rootWrapper}>
                    <AppTopSection authStep={0} onBackPress={() => { this.props.navigation.goBack() }} />
                    <LoginForm login onPress={this.login.bind(this)} />
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
        fetchLogin: (type) => dispatch(authActions.fetchLogin(type)),
        fetchingSocialMetaData: (userId) => dispatch(authActions.fetchingSocialMetaData(userId)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);


