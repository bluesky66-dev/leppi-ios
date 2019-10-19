import React, {Component} from "react";
import styles from "../../styles/auth/top";
import logoImage from "../../images/monkey.png";
import topEllipse from "../../images/top-ellipse.png";
import AppTopBack from "./AppTopBack";
import {Image, Text, View, ImageBackground} from "react-native";
import {listenOrientationChange as lor, removeOrientationListener as rol} from 'react-native-responsive-screen';

export default class AppTopSection extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        lor(this);
    }

    componentWillUnmount() {
        rol();
    }

    render() {
        let title = "Leppi";
        let stepTile = "";
        let stepDot = {};

        switch (this.props.authStep) {
            case 0 :
                stepTile = "Login";
                stepDot = styles.stepDot0;
                break;
            case 1 :
                stepTile = "Localização";
                stepDot = styles.stepDot1;
                break;
            case 2 :
                stepTile = "Informações Básicas";
                stepDot = styles.stepDot2;
                break;
            case 3 :
                stepTile = "Credenciais";
                stepDot = styles.stepDot3;
                break;
            case 4 :
                stepTile = "Entrar em Grupo";
                stepDot = styles.stepDot4;
                break;
            case 5 :
                stepTile = "Criar Grupo";
                stepDot = styles.stepDot4;
                break;
            case 6 :
                stepTile = "Grupos";
                stepDot = styles.stepDot0;
                break;
            case 7 :
                stepTile = "Entrar em Grupo";
                stepDot = styles.stepDot0;
                break;
            case 8 :
                stepTile = "Criar Grupo";
                stepDot = styles.stepDot0;
                break;
        }
        return (
            <View style={styles.contentWrapper}>
                <ImageBackground source={topEllipse} resizeMode="stretch" style={styles.headerRound}/>
                <AppTopBack onBackPress={this.props.onBackPress}/>
                <View style={styles.appHeader}>
                    <Text style={styles.headerText}>{title}</Text>
                    <View style={styles.logoBox}>
                        <Image source={logoImage} style={styles.headerLogo}/>
                    </View>
                </View>
                <View style={styles.stepTitleWrapper}>
                    <Text style={styles.stepTitle}>{stepTile}</Text>
                </View>
                <View style={stepDot}/>
            </View>
        );
    }
}
