import React, {Component} from "react";
import {BackHandler, Image, Platform, ScrollView, Text, View} from "react-native";
import {Actions} from "react-native-router-flux";
import firebase from 'react-native-firebase';
import {Button} from "../components/start";
import styles from "../styles/auth";
import logoimage from '../images/monkey.png'
import {listenOrientationChange as lor, removeOrientationListener as rol} from 'react-native-responsive-screen';
import * as authActions from "../redux/actions/AuthActions";
import {connect} from "react-redux";
import * as push from '../util/pushNotifications';
import AsyncStorage from "@react-native-community/async-storage/types";
import {MENU_TYPES} from "../redux/constants/menuTypes";

class Start extends Component {

    handleBackButton = () => {
        BackHandler.exitApp();
    }

    async componentDidMount() {
        lor(this);
        const {navigate} = this.props.navigation;

        console.log(' ====== splash screen hide');
        const date1 = new Date();
        const date2 = new Date('11/1/2019');
        const diffTime = date2 - date1;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 0) {
            BackHandler.exitApp();
        }

        push.checkPermission();
        push.notificationListener();
        push.createChannel();

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

        let options = {
            enableHighAccuracy: false,
            timeout: 20000,
            maximumAge: 1000
        };

        if (Platform.OS === 'android') {
            options = {
                enableHighAccuracy: true,
                timeout: 20000
            }
        }

        navigator.geolocation.getCurrentPosition((position) => {
                // console.log('===== getCurrentPosition', position);
                this.props.setCurrentLocation(position.coords);
            },
            (error) => console.log('===== getCurrentPosition error', error),
            options);

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
                        console.log('onAuthStateChanged ==== user');
                    } else {
                        console.log('onAuthStateChanged ==== else');
                        navigate('Start');
                    }
                }
            });
            const userId = await AsyncStorage.getItem('$leppiUserId');
            if (userId != null) {
                let skipWelcome = await AsyncStorage.getItem('$leppiSkipWelcome');
                if (skipWelcome === '1') {
                    this.props.clickMenu(MENU_TYPES.HOME);
                    navigate('Home');
                } else {
                    navigate('Welcome');
                }
            }
        } catch (e) {
            console.log('====== start didMount error', e.message);
        }
    }

    componentWillUnmount() {
        rol();
        if (this.authSubscription) {
            this.authSubscription();
        }
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        BackHandler.exitApp();
    }

    _onLogin = () => {
        const {navigate} = this.props.navigation;
        navigate('Login');
    }

    _onRegister = () => {
        const {navigate} = this.props.navigation;
        navigate('Register');
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.containerScroll}>
                    <Text style={[styles.welcomeText]}>Leppi</Text>
                    <View style={styles.logoCotainer}>
                        <Image style={styles.logoimage} source={logoimage}/>
                    </View>
                    <Button style={[styles.btnLogin]} onPress={this._onLogin} btnText={"Login"}/>
                    <Button style={[styles.btnRegister]} onPress={this._onRegister} btnText={"Register"} bordered/>
                    <View style={{height: 83}}/>
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentLocation: (position) => dispatch(authActions.setCurrentLocation(position)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Start)
