import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CreateGroup, GroupForm, JoinGroup} from "../../components/forms";
import {AppTopSection, RegisterButton} from "../../components/start";
import styles from "../../styles/auth/auth";
import {ScrollView, View} from "react-native";
import Toast from 'react-native-simple-toast';
import Swiper from 'react-native-swiper'
import {widthPercentage as wp} from '../../util';
import {listenOrientationChange as lor, removeOrientationListener as rol} from 'react-native-responsive-screen';
import * as authActions from "../../redux/actions/AuthActions";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-community/async-storage/types";

class joinGroupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step_index: 1,
            isJoinGroup: false,
        };
        this._onMomentumScrollEnd = this._onMomentumScrollEnd.bind(this);
        this._onNextStep = this._onNextStep.bind(this);
        this._onBackPress = this._onBackPress.bind(this);
        this._toCreateGroupLink = this._toCreateGroupLink.bind(this);
        this._onChangeState = this._onChangeState.bind(this);
        this._onJoinGroup = this._onJoinGroup.bind(this);
    }

    componentDidMount() {
        lor(this);
    }

    componentWillUnmount() {
        rol();
    }

    _onMomentumScrollEnd(e, state, context) {
        // console.log('step_index === ', state.index);
        let step_index = state.index * 1 + 1;
        this.setState({step_index: step_index});
    }

    async _onNextStep() {
        let state = this.state;
        let step_index = this.state.step_index + 1;
        if (step_index < 4) {
            this.refs.swiper.scrollBy(1);
        } else if (step_index === 4) {
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
            const groupInfo = {
                userId: this.props.userId,
                group_name: state.group_name,
                group_desc: state.group_desc,
                group_code: state.group_code,
                city: this.props.userMeta.city,
                street: this.props.userMeta.street,
                district: this.props.userMeta.district,
                country: this.props.userMeta.country,
                location: this.props.userMeta.location,
                cca2: this.props.userMeta.cca2,
                createTime: Math.floor(Date.now()),
            };
            await this.props.createGroup(groupInfo, this.props.userMeta);
            if (!this.props.groupId) {
                return false;
            }
            this.props.navigation.goBack();
        }
    }

    _onBackPress = async () => {
        let step_index = this.state.step_index - 1;
        if (step_index === 2) {
            this.refs.swiper.scrollBy(-2);
        } else if (step_index > 0) {
            this.refs.swiper.scrollBy(-1);
        } else {
            let groupId = await AsyncStorage.getItem("$leppiGroupId");
            if (typeof groupId !== 'string' || !groupId) {
                Toast.show('To enjoy this service, you will need to create or join a group.', Toast.LONG);
                return false;
            }
            this.props.navigation.goBack();
        }
    }

    _toCreateGroupLink = () => {
        console.log('===== _toCreateGroupLink 2');
        this.refs.swiper.scrollBy(1);
    }

    _onToCreateGroup = () => {
        console.log('===== _toCreateGroupLink 2');
        this.refs.swiper.scrollBy(2);
    }

    _onToJoinGroup = () => {
        this.refs.swiper.scrollBy(1);
    }

    _onChangeState(state) {
        state = Object.assign({}, this.state, state);
        this.setState(state);
    }

    _onJoinGroup = () => {
        this.props.navigation.goBack();
    }

    render() {
        let swiperHeight = 404;
        let title = "Próximo";
        switch (this.state.step_index) {
            case 1:
                swiperHeight = 512;
                break;
            case 2:
                swiperHeight = 512;
                break;
            case 3:
                swiperHeight = 404;
                title = "Criar Grupo";
                break;
        }

        return (
            <View>
                <Spinner
                    visible={this.props.isLoading}
                    textContent={''}
                    textStyle={{color: '#FFF'}}
                />
                <View>
                    <ScrollView style={styles.rootWrapper}>
                        <AppTopSection authStep={5 + this.state.step_index} onBackPress={this._onBackPress}/>
                        <Swiper ref={'swiper'}
                                scrollEnabled={false}
                                showsPagination={false}
                                onMomentumScrollEnd={this._onMomentumScrollEnd}
                                loop={false} style={[styles.swiperWrapper, {height: wp(swiperHeight)}]}>
                            <View style={styles.swiperSlide}>
                                <GroupForm
                                    toCreateGroup={this._onToCreateGroup} toJoinGroup={this._onToJoinGroup}/>
                            </View>
                            <View style={styles.swiperSlide}>
                                {(this.state.step_index === 2) && <JoinGroup
                                    toCreateGroup={this._toCreateGroupLink}
                                    onJoinGroup={() => this._onJoinGroup()}
                                    userMeta={this.props.userMeta}/>}
                            </View>
                            <View style={styles.swiperSlide}>
                                <CreateGroup onChange={this._onChangeState}/>
                            </View>
                        </Swiper>
                        {
                            (this.state.step_index !== 1 && this.state.step_index !== 2) &&
                            <View style={styles.registerBtnWrapper}>
                                <RegisterButton authStep={this.state.step_index} style={styles.nextStepBtn}
                                                onPress={this._onNextStep} btnText={title}/>
                            </View>
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        userId: state.AuthReducer.userId,
        userMeta: state.AuthReducer.userMeta,
        groupId: state.AuthReducer.groupId,
        isLoading: Boolean(state.AuthReducer.isLoading),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createGroup: (gruop, userMeta) => dispatch(authActions.createGroup(gruop, userMeta)),
        setLoadingSpinner: (loading) => dispatch(authActions.setLoadingSpinner(loading)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(joinGroupPage);
