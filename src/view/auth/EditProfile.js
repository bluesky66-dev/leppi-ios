import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as authActions from '../../redux/actions/AuthActions'; //Import your actions
import {InformationForm, LocationForm} from "../../components/forms";
import {AppTopSection, RegisterButton} from "../../components/start";
import styles from "../../styles/auth/auth";
import {ScrollView, View} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-simple-toast';
import Swiper from '../../components/swiper';
import {heightPercentage as hp} from '../../util';
import {listenOrientationChange as lor, removeOrientationListener as rol} from 'react-native-responsive-screen';
import Spinner from "react-native-loading-spinner-overlay";

class EditProfile extends Component {
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
        switch (this.state.step_index) {
            case 1:
                // if (!state.country || state.country.length <= 0) {
                //     Toast.show('Select your country', Toast.SHORT);
                //     return false;
                // }
                // if (!state.country || state.city.length <= 0) {
                //     Toast.show('Enter your city', Toast.SHORT);
                //     return false;
                // }
                // if (!state.country || state.street.length <= 0) {
                //     Toast.show('Enter your street', Toast.SHORT);
                //     return false;
                // }
                if (!state.country || state.district.length <= 0) {
                    Toast.show('Digite sua Rua', Toast.SHORT);
                    return false;
                }
                break;
            case 2:
                if (!state.avatar || !state.avatar.uri || state.avatar.uri.length <= 0) {
                    Toast.show('Select your avatar', Toast.SHORT);
                    return false;
                }
                if (!state.first_name || state.first_name.length <= 0) {
                    Toast.show('Enter your first name', Toast.SHORT);
                    return false;
                }
                if (!state.last_name || state.last_name.length <= 0) {
                    Toast.show('Enter your last name', Toast.SHORT);
                    return false;
                }
                if (!state.whatsapp || state.whatsapp.length <= 0) {
                    Toast.show('Enter your whatsapp', Toast.SHORT);
                    return false;
                }
                if (!state.birth_date || state.birth_date.length <= 0) {
                    Toast.show('Select your date of birth', Toast.SHORT);
                    return false;
                }

                state.avatar.userId = this.props.userId;
                await this.props.uploadMedia(state.avatar);

                const userMeta = {
                    userId: this.props.userId,
                    address: state.address,
                    city: state.city,
                    street: state.street,
                    district: state.district,
                    country: state.country,
                    cca2: state.cca2,
                    location: state.location,
                    first_name: state.first_name,
                    last_name: state.last_name,
                    whatsapp: state.whatsapp,
                    birth_date: state.birth_date,
                    avatar: this.props.downloadURL,
                    points: 0,
                    createTime: Math.floor(Date.now()),
                };
                this.setState({userMeta: userMeta});
                await this.props.createUserMeta(userMeta);
                break;
        }
        let step_index = this.state.step_index + 1;
        if (step_index === 3) {
            navigate('Welcome');
        } else if (step_index < 3) {
            this.refs.swiper.scrollBy(1);
        }
    }

    _onBackPress = () => {
        let step_index = this.state.step_index - 1;
        if (step_index > 0) {
            this.refs.swiper.scrollBy(-1);
        } else {
            this.props.navigation.goBack();
        }
    }

    _onChangeState(state) {
        state = Object.assign({}, this.state, state);
        this.setState(state);
    }

    render() {
        let swiperStyle = {};
        swiperStyle.height = hp(404);
        let title = "Próximo";
        switch (this.state.step_index) {
            case 1:
                swiperStyle.height = hp(404);
                break;
            case 2:
                swiperStyle.height = hp(404);
                title = "Submit";
                break;
        }
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
                        <View style={styles.swiperSlide}>
                            <InformationForm  onChange={this._onChangeState}/>
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
        userId: state.AuthReducer.userId,
        isLoading: Boolean(state.AuthReducer.isLoading),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadMedia: (media) => dispatch(authActions.uploadMedia(media)),
        createUserMeta: (metaData) => dispatch(authActions.createUserMeta(metaData)),
        setUserMeta: (metaData) => dispatch(authActions.setUserMeta(metaData)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
