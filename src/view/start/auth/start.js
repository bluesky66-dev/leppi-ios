import React, {Component} from "react";
import {BackHandler, Image, Platform, ScrollView, Text, View} from "react-native";
import {Actions} from "react-native-router-flux";
import {Button} from "../../../components/start";
import styles from "../../../styles/auth/index";
import logoimage from '../../../images/monkey.png'
import {listenOrientationChange as lor, removeOrientationListener as rol} from 'react-native-responsive-screen';
import * as authActions from "../../../redux/actions/AuthActions";
import {connect} from "react-redux";

class Start extends Component {

    handleBackButton = () => {
        if (Actions.currentScene === 'start') {
            BackHandler.exitApp();
        }
    }

    componentDidMount() {
        lor(this);

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
    }

    componentWillUnmount() {
        rol();
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    _onLogin = () => {
        Actions.login();
    }

    _onRegister = () => {
        Actions.register();
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
