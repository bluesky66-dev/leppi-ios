import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Root, View} from 'native-base';
import * as authActions from '../../../redux/actions/AuthActions'; //Import your actions
import {CreateGroup, CredentialsForm, InformationForm, JoinGroup, LocationForm} from "../../../components/forms";
import {AppTopSection, RegisterButton} from "../../../components/start";
import styles from "../../../styles/auth/auth";
import {ScrollView} from "react-native";
import Toast from 'react-native-simple-toast';
import Swiper from 'react-native-swiper'
import * as utils from '../../../util';
import {widthPercentage as wp} from '../../../util';
import {listenOrientationChange as lor, removeOrientationListener as rol} from 'react-native-responsive-screen';
import {Actions} from "react-native-router-flux";
import Spinner from "react-native-loading-spinner-overlay";
import * as EmailValidator from "email-validator";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step_index: 1,
            userMeta: {},
            callingCode: '',
            isJoinGroup: false,
        };
        this._onMomentumScrollEnd = this._onMomentumScrollEnd.bind(this);
        this._onNextStep = this._onNextStep.bind(this);
        this._onBackPress = this._onBackPress.bind(this);
        this._onToCreateGroup = this._onToCreateGroup.bind(this);
        this._onToJoinGroup = this._onToJoinGroup.bind(this);
        this._toCreateGroupLink = this._toCreateGroupLink.bind(this);
        this._onChangeState = this._onChangeState.bind(this);
    }

    componentDidMount() {
        lor(this);
    }

    componentWillUnmount() {
        rol();
    }

    register(data, errorCB) {
        this.props.fetchSignup(data);
        Actions.welcome();
    }

    _onMomentumScrollEnd(e, state, context) {
        // console.log('step_index === ', state.index);
        let step_index = state.index * 1 + 1;
        this.setState({step_index: step_index});
    }

    async _onNextStep() {
        let state = this.state;
        switch (this.state.step_index) {
            case 1:
                if (!state.country || state.country.length <= 0) {
                    Toast.show('Select your country', Toast.SHORT);
                    return false;
                }
                if (!state.country || state.city.length <= 0) {
                    Toast.show('Enter your city', Toast.SHORT);
                    return false;
                }
                if (!state.country || state.street.length <= 0) {
                    Toast.show('Enter your street', Toast.SHORT);
                    return false;
                }
                if (!state.country || state.district.length <= 0) {
                    Toast.show('Enter your district', Toast.SHORT);
                    return false;
                }
                let callingCode =  utils.getCallingCode(state.cca2);
                console.log('callingCode === ', callingCode);
                this.setState({callingCode: callingCode});

                console.log('Location ====== ', state);
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

                console.log('Information ====== ', state);
                break;
            case 3:
                if (!state.email || state.email.length <= 0) {
                    Toast.show('Enter your eamil', Toast.SHORT);
                    return false;
                }
                if (!EmailValidator.validate(state.email)) {
                    Toast.show('Invalid email address!', Toast.SHORT);
                    return false;
                }
                if (!state.password || state.password.length <= 0) {
                    Toast.show('Enter password', Toast.SHORT);
                    return false;
                }
                if (state.password.length <= 7) {
                    Toast.show('Use 8 characters or more for your password', Toast.SHORT);
                    return false;
                }
                if (!state.confirm_pass || state.confirm_pass !== state.password) {
                    Toast.show('Those passwords didn\'t match', Toast.SHORT);
                    return false;
                }
                console.log('fetchSignup start ====== ', state);
                await this.props.fetchSignup(state);
                console.log('====== fetchSignup end');
                if (!this.props.isSignuped) {
                    return false;
                }
                state.avatar.userId = this.props.userId;
                await this.props.uploadMedia(state.avatar);

                let userMeta = {
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
                    whatsapp: state.whatsapp.replace(/\D/g,''),
                    birth_date: state.birth_date,
                    avatar: this.props.downloadURL,
                    points: 0,
                    createTime: Math.floor(Date.now()),
                };
                this.setState({userMeta: userMeta});
                await this.props.createUserMeta(userMeta);
                break;
            case 4:

                break;
            case 5:
                if (!state.group_name || state.group_name.length <= 0) {
                    Toast.show('Enter group name', Toast.SHORT);
                    return false;
                }
                if (!state.group_desc || state.group_desc.length <= 0) {
                    Toast.show('Enter group description', Toast.SHORT);
                    return false;
                }
                if (!state.group_code || state.group_code.length <= 0) {
                    Toast.show('Enter access code', Toast.SHORT);
                    return false;
                }
                let groupInfo = {
                    userId: this.props.userId,
                    group_name: state.group_name,
                    group_desc: state.group_desc,
                    group_code: state.group_code,
                    city: state.city,
                    street: state.street,
                    district: state.district,
                    country: state.country,
                    cca2: state.cca2,
                    location: state.location,
                    createTime: Math.floor(Date.now()),
                };
                await this.props.createGroup(groupInfo, state);
                if (!this.props.groupId) {
                    return false;
                }
                break;
        }
        let step_index = this.state.step_index + 1;
        if (step_index === 5) {
            Actions.welcome();
        } else if (step_index < 6) {
            this.refs.swiper.scrollBy(1);
        } else if (step_index === 6) {
            Actions.welcome();
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

    _onToCreateGroup = () => {
        this.refs.swiper.scrollBy(1);
    }

    _onToJoinGroup = () => {
        this.refs.swiper.scrollBy(2);
    }

    _toCreateGroupLink = () => {
        this.refs.swiper.scrollBy(1);
    }

    _onChangeState(state) {
        state = Object.assign({}, this.state, state);
        this.setState(state);
    }

    _onJoinGroup() {
        Actions.welcome();
    }

    render() {
        let swiperHeight = 404;
        let title = "Next";
        switch (this.state.step_index) {
            case 1:
                swiperHeight = 404;
                break;
            case 2:
                swiperHeight = 404;
                break;
            case 3:
                swiperHeight = 404;
                break;
            case 4:
                swiperHeight = 512;
                break;
            case 5:
                swiperHeight = 404;
                title = "Create Group";
                break;
        }
        return (
            <Root>
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
                            loop={false} style={[styles.swiperWrapper, {height: wp(swiperHeight)}]}>
                        <View style={styles.swiperSlide}>
                            <LocationForm onChange={this._onChangeState}/>
                        </View>
                        <View style={styles.swiperSlide}>
                            <InformationForm callingCode={this.state.callingCode} onChange={this._onChangeState}/>
                        </View>
                        <View style={styles.swiperSlide}>
                            <CredentialsForm  onChange={this._onChangeState}/>
                        </View>
                        <View style={styles.swiperSlide}>
                            {(this.state.step_index === 4) && <JoinGroup toCreateGroup={this._toCreateGroupLink}
                                onJoinGroup={()=>this._onJoinGroup()} userMeta={this.state.userMeta}/>}
                        </View>
                        <View style={styles.swiperSlide}>
                            <CreateGroup onChange={this._onChangeState}/>
                        </View>
                    </Swiper>
                    {
                        (this.state.step_index !== 6 && this.state.step_index !== 4) &&
                        <View style={styles.registerBtnWrapper}>
                            <RegisterButton authStep={this.state.step_index} style={styles.nextStepBtn}
                                            onPress={()=>this._onNextStep()} btnText={title}/>
                        </View>
                    }
                </ScrollView>
            </Root>
        );
    }

}

function mapStateToProps(state, props) {
    return {
        currentLocation: state.AuthReducer.currentLocation,
        userId: state.AuthReducer.userId,
        isSignuped: state.AuthReducer.isSignuped,
        groupId: state.AuthReducer.groupId,
        isLoading: Boolean(state.AuthReducer.isLoading),
        downloadURL: state.AuthReducer.downloadURL,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSignup: (type) => dispatch(authActions.fetchSignup(type)),
        uploadMedia: (media) => dispatch(authActions.uploadMedia(media)),
        createUserMeta: (metaData) => dispatch(authActions.createUserMeta(metaData)),
        setUserMeta: (metaData) => dispatch(authActions.setUserMeta(metaData)),
        createGroup: (gruop, userMeta) => dispatch(authActions.createGroup(gruop, userMeta)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
