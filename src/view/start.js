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

class Start extends Component {

    handleBackButton = () => {
        BackHandler.exitApp();
    }

    async componentDidMount() {
        lor(this);
        const {navigate} = this.props.navigation;

        //console.log(' ====== splash screen hide');
        const date1 = await authActions.getCurrentTime();
        const date2 = new Date('12/1/2019');
        const diffTime = date2 - date1;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 0) {
            BackHandler.exitApp();
        }

        // push.checkPermission();
        // push.notificationListener();
        // push.createChannel();
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
