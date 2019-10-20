import React, {Component} from "react";
import {Image, Text, View} from "react-native";
import styles from "../styles/auth/splash";
import logoimage from '../images/monkey.png'
import {listenOrientationChange as lor, removeOrientationListener as rol} from 'react-native-responsive-screen';

class SplashScreen extends Component {
    componentDidMount() {
        lor(this);
    }

    componentWillUnmount() {
        rol();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.welcomeText]}>Leppi</Text>
                <Image style={styles.logoimage} source={logoimage} resizeMode="stretch"/>            
            </View>
        );
    }
}

export default SplashScreen
