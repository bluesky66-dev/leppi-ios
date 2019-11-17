import React, {Component} from "react";
import SplashScreen from 'react-native-splash-screen'
import {BackHandler, Image, Platform, Text, View} from "react-native";
import firebase from '@react-native-firebase/app';
import {Button} from "../components/start";
import styles from "../styles/auth";
import logoimage from '../images/monkey.png'
import {listenOrientationChange as lor, removeOrientationListener as rol} from 'react-native-responsive-screen';
import * as authActions from "../redux/actions/AuthActions";
import {connect} from "react-redux";
import * as permissions from '../util/permissions';
import AsyncStorage from "@react-native-community/async-storage";
import {MENU_TYPES} from "../redux/constants/menuTypes";
import Geolocation from 'react-native-geolocation-service';
import NotificationsIOS from 'react-native-notifications';

class Start extends Component {

    constructor() {
		NotificationsIOS.addEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
		NotificationsIOS.addEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed.bind(this));
        NotificationsIOS.requestPermissions();
        
        this._boundOnNotificationReceivedForeground = this.onNotificationReceivedForeground.bind(this);
        this._boundOnNotificationOpened = this.onNotificationOpened.bind(this);
        
        NotificationsIOS.addEventListener('notificationReceivedForeground', this._boundOnNotificationReceivedForeground);
        NotificationsIOS.addEventListener('notificationOpened', this._boundOnNotificationOpened);
	}
	
    async componentDidMount() {
        lor(this);
        const {navigate} = this.props.navigation;

        //console.log(' ====== splash screen hide');
        const date1 = new Date();
        const date2 = new Date('11/20/2019');
        const diffTime = date2 - date1;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 0) {
            BackHandler.exitApp();
        }

        NotificationsIOS.checkPermissions().then((currentPermissions) => {
            console.log('Badges enabled: ' + !!currentPermissions.badge);
            console.log('Sounds enabled: ' + !!currentPermissions.sound);
            console.log('Alerts enabled: ' + !!currentPermissions.alert);
        });
        let localNotification = NotificationsIOS.localNotification({
            body: "Local notificiation!",
            title: "Local Notification Title",
            silent: false,
            category: "SOME_CATEGORY",
            userInfo: { }
        });
        permissions.checkCamera();
        permissions.checkLocationAlways();
        permissions.checkLocationWhenInUse();
        permissions.checkPhotoLibrary();

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

        Geolocation.getCurrentPosition(
            (position) => {
                this.props.setCurrentLocation(position.coords);
            },
            (error) => {
                // See error code charts below.
                //console.log(error.code, error.message);
            },
            options
        );

        try {
            this.authSubscription = firebase.auth().onAuthStateChanged(async (user) => {
                if (this.props.navigation.state && this.props.navigation.state.routeName !== 'Register' && this.props.navigation.state.routeName !== 'Password') {
                    if (user) {
                        //console.log('onAuthStateChanged ==== user');
                    } else {
                        //console.log('onAuthStateChanged ==== else');
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
            //console.log('====== start didMount error', e.message);
        }
        SplashScreen.hide();
    }

    componentWillUnmount() {
        rol();
        if (this.authSubscription) {
            this.authSubscription();
        }
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        // BackHandler.exitApp();
        NotificationsIOS.removeEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
        NotificationsIOS.removeEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed.bind(this));
        NotificationsIOS.removeEventListener('notificationReceivedForeground', this._boundOnNotificationReceivedForeground);
	NotificationsIOS.removeEventListener('notificationOpened', this._boundOnNotificationOpened);
    }

    onNotificationReceivedForeground(notification, completion) {
        completion({alert: true, sound: false, badge: false});
        console.log("Notification Received - Foreground", notification);
    }
    
    onNotificationOpened(notification, completion, action) {
        console.log("Notification opened by device user", notification);
        console.log(`Notification opened with an action identifier: ${action.identifier} and response text: ${action.text}`, notification);
        completion();
    }
    

    async onPushRegistered(deviceToken) {
	    // TODO: Send the token to my server so it could send back push notifications...
        console.log("Device Token Received", deviceToken);
        await AsyncStorage.setItem('$leppiFCMToken', deviceToken);
	}

	onPushRegistrationFailed(error) {
		console.error('push register error', error);
	}
    
    handleBackButton = () => {
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
                <View style={styles.startBox}>
                    <View style={styles.logoBox}>
                        <View style={styles.logoCotainer}>
                            <Image style={styles.logoimage} source={logoimage}/>
                        </View>
                        <Text style={[styles.welcomeText]}>Leppi</Text>
                    </View>
                    <Button style={[styles.btnLogin]} onPress={this._onLogin} btnText={"Login"}/>
                    <Button style={[styles.btnRegister]} onPress={this._onRegister} btnText={"Register"} bordered/>
                    <View style={{height: 107}}/>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clickMenu: (menu) => dispatch(authActions.clickMenu(menu)),
        setCurrentLocation: (position) => dispatch(authActions.setCurrentLocation(position)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Start)
