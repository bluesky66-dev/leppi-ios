import React, {Component} from "react";
import {connect} from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';
import {Image, ImageBackground, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/auth/welcome";
import logoImage from '../images/monkey.png'
import welcome1 from '../images/welcome-1.png'
import welcome2 from '../images/welcome-2.png'
import welcomeButton from '../images/welcome-btn.png'
import {AppTopBack} from "../components/start";
import {listenOrientationChange as lor, removeOrientationListener as rol} from 'react-native-responsive-screen';
import Swiper from '../components/swiper';
import * as authActions from "../redux/actions/AuthActions";
import {MENU_TYPES} from "../redux/constants/menuTypes";

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step_index: 0,
        };
        this._onBackPress = this._onBackPress.bind(this);
        this._onMomentumScrollEnd = this._onMomentumScrollEnd.bind(this);
        this._onPressButton = this._onPressButton.bind(this);
    }

    async componentDidMount() {
        lor(this);
        await AsyncStorage.setItem('$leppiSkipWelcome', '1');
    }

    componentWillUnmount() {
        rol();
    }

    _onBackPress() {
        this.props.navigation.goBack();
    }

    _onMomentumScrollEnd(e, state, context) {
        //console.log('welecom state', state.index);
        this.setState({step_index: state.index});
    }

    _onPressButton() {
        const {navigate} = this.props.navigation;
        //console.log('welecom index', this.state.step_index);
        if (this.state.step_index === 1) {
            this.props.clickMenu(MENU_TYPES.HOME);
            navigate('Home');
        } else {
            this.refs.swiper.scrollBy(1);
        }
    }

    render() {
        let btnText = "Próximo";
        let welcomeImage= welcome1;
        if (this.state.step_index === 1) {
            welcomeImage= welcome2;
            btnText = "Começar";
        }
        return (
            <View style={[styles.container]}>
                <ScrollView style={styles.containerScroll}>
                    <ImageBackground source={welcomeImage} style={styles.backgroundImage}>
                        <AppTopBack onBackPress={this._onBackPress}/>
                        <View style={styles.titleWrapper}>
                            <Text style={styles.titleTxt}>Leppi</Text>
                        </View>
                        <View style={styles.howToWorkWrapper}>
                            <Text style={styles.howToWorkTxt}>How it Works.</Text>
                            <Image source={logoImage} style={styles.logoImage}/>
                        </View>
                        <Swiper ref={'swiper'}
                                scrollEnabled={true}
                                showsPagination={true}
                                dotStyle={styles.dotStyle}
                                activeDotStyle={styles.activeDotStyle}
                                onMomentumScrollEnd={this._onMomentumScrollEnd}
                                loop={false} style={styles.swiperWrapper}>
                            <View style={styles.swiperItem}>
                                <Text style={[styles.swiperItemTxt, styles.width205]}>Leppi is a social network that enables sharing, negotiation and help among neighbors</Text>
                            </View>
                            <View style={styles.swiperItem}>
                                <Text style={styles.swiperItemTxt}>With Leppi everyone helps themselves by creating a collaborative, friendly and profitable environment</Text>
                            </View>
                        </Swiper>
                        <View style={styles.btnWrapper}>
                            <TouchableOpacity onPress={()=>this._onPressButton()} style={styles.btnContainer}>
                                <ImageBackground source={welcomeButton} style={[styles.button]}>
                                    <Text style={[styles.buttonText]}>
                                        {btnText}
                                    </Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </ScrollView>
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
        clickMenu: (type) => dispatch(authActions.clickMenu(type)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
