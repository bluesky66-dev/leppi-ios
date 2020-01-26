import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as authActions from '../../redux/actions/AuthActions'; //Import your actions
import {UserOptionsForm} from "../../components/forms";
import {AppTopSection, RegisterButton} from "../../components/start";
import styles from "../../styles/auth/auth";
import {ScrollView, View} from "react-native";
import Toast from 'react-native-simple-toast';
import Swiper from '../../components/swiper';
import {widthPercentage as wp} from '../../util';
import {listenOrientationChange as lor, removeOrientationListener as rol} from 'react-native-responsive-screen';
import Spinner from "react-native-loading-spinner-overlay";

class EditOptions extends Component {
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
        if (!state.user_options || state.user_options.length < 3) {
            Toast.show('You must select at least 3 options to proceed', Toast.SHORT);
            return false;
        }
        const userMeta = {
            userId: this.props.userId,
            user_options: state.user_options,
            updateTime: Math.floor(Date.now()),
        };
        this.setState({userMeta: userMeta});
        await this.props.createUserMeta(userMeta);
        navigate('Perfil');
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
        const {userMeta} = this.props;
        let swiperStyle = {};
        swiperStyle.height = wp(404);
        let title = "Enviar";
        switch (this.state.step_index) {
            case 1:
                swiperStyle.height = wp(552);
                break;
        }
        return (
            <View style={styles.rootWrapper}>
                <Spinner
                    visible={this.props.isLoading}
                    textContent={''}
                    textStyle={{color: '#FFF'}}
                />
                <ScrollView style={styles.rootWrapper}>
                    <AppTopSection authStep={9} onBackPress={this._onBackPress}/>
                    <Swiper ref={'swiper'}
                            scrollEnabled={false}
                            showsPagination={false}
                            onMomentumScrollEnd={this._onMomentumScrollEnd}
                            loop={false} style={swiperStyle}>
                        <View style={styles.swiperSlide}>
                            <UserOptionsForm onChange={this._onChangeState} userOptions={userMeta.user_options}/>
                        </View>
                    </Swiper>
                    <View style={styles.registerBtnWrapper}>
                        <RegisterButton authStep={this.state.step_index} style={styles.nextStepBtn}
                                        onPress={()=>this._onNextStep()} btnText={title}/>
                    </View>
                </ScrollView>
            </View>
        );
    }

}

function mapStateToProps(state, props) {
    return {
        currentLocation: state.AuthReducer.currentLocation,
        userId: state.AuthReducer.userId,
        userMeta: state.AuthReducer.userMeta,
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

export default connect(mapStateToProps, mapDispatchToProps)(EditOptions);