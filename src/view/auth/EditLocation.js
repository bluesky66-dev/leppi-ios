import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as authActions from '../../redux/actions/AuthActions'; //Import your actions
import {LocationForm} from "../../components/forms";
import {AppTopSection, RegisterButton} from "../../components/start";
import styles from "../../styles/auth/auth";
import {ScrollView, View} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-simple-toast';
import Swiper from '../../components/swiper';
import {widthPercentage as wp} from '../../util';
import {listenOrientationChange as lor, removeOrientationListener as rol} from 'react-native-responsive-screen';
import Spinner from "react-native-loading-spinner-overlay";
import {MENU_TYPES} from "../../redux/constants/menuTypes";

class EditLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step_index: 1,
            userMeta: {},
        };
        this._onMomentumScrollEnd = this._onMomentumScrollEnd.bind(this);
        this._onNextStep = this._onNextStep.bind(this);
        this._onBackPress = this._onBackPress.bind(this);
        this._onChangeState = this._onChangeState.bind(this);
    }

    componentDidMount() {
        lor(this);
    }

    componentWillUnmount() {
        rol();
    }

    _onMomentumScrollEnd(e, state, context) {
        // //console.log('step_index === ', state.index);
        let step_index = state.index * 1 + 1;
        this.setState({step_index: step_index});
    }

    async _onNextStep() {
        const {navigate} = this.props.navigation;

        let state = this.state;
        if (!state.country || state.district.length <= 0) {
            Toast.show('Digite sua Rua', Toast.SHORT);
            return false;
        }
        let userMeta = this.props.userMeta;

        userMeta.address = state.address;
        userMeta.city = state.city;
        userMeta.street = state.street;
        userMeta.district = state.district;
        userMeta.country = state.country;
        userMeta.cca2 = state.cca2;
        userMeta.location = state.location;

        await this.props.updateLocation(userMeta);

        this.props.clickMenu(MENU_TYPES.HOME);
        navigate('Home');
    }

    _onBackPress = () => {
        this.props.navigation.goBack();
    }

    _onChangeState(state) {
        state = Object.assign({}, this.state, state);
        this.setState(state);
    }

    render() {
        let swiperStyle = {};
        swiperStyle.height = wp(404);
        let title = "Próximo";
        return (
            <KeyboardAwareScrollView style={styles.rootWrapper} behavior={'padding'}>
                <Spinner
                    visible={this.props.isLoading}
                    textContent={''}
                    textStyle={{color: '#FFF'}}
                />
                <ScrollView style={styles.rootWrapper}>
                    <AppTopSection authStep={this.state.step_index} onBackPress={this._onBackPress}/>
                    <Swiper ref={'swiper'}
                            scrollEnabled={false}
                            showsPagination={false}
                            onMomentumScrollEnd={this._onMomentumScrollEnd}
                            loop={false} style={swiperStyle}>
                        <View style={styles.swiperSlide}>
                            <LocationForm onChange={this._onChangeState}/>
                        </View>
                    </Swiper>
                    <View style={styles.registerBtnWrapper}>
                        <RegisterButton authStep={this.state.step_index} style={styles.nextStepBtn}
                                        onPress={()=>this._onNextStep()} btnText={title}/>
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>
        );
    }

}

function mapStateToProps(state, props) {
    return {
        currentLocation: state.AuthReducer.currentLocation,
        userMeta: state.AuthReducer.userMeta,
        userId: state.AuthReducer.userId,
        isLoading: Boolean(state.AuthReducer.isLoading),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateLocation: (metaData) => dispatch(authActions.updateLocation(metaData)),
        clickMenu: (type) => dispatch(authActions.clickMenu(type)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLocation);
