import React, {Component} from 'react';
import {Alert, Image, ImageBackground, ScrollView, Share, TouchableOpacity, View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {dynamicEventLink} from '../util/dynamicLink';
import HeaderSection from '../components/HeaderSection';
import UserAvatar from "../images/user-avatar.png";
import IconIdea from "../images/idea.png";
import IconMarker from "../images/maps-and-flags.png";
import PointNormal1 from "../images/normal1.png";
import PointNormal1a from "../images/normal1a.png";
import PointNormal2 from "../images/normal2.png";
import PointNormal2a from "../images/normal2a.png";
import PointExcellent1 from "../images/excellent1.png";
import PointExcellent1a from "../images/excellent1a.png";
import PointExcellent2 from "../images/excellent2.png";
import PointExcellent2a from "../images/excellent2a.png";

import styles from '../styles/perfil';
import * as authActions from "../redux/actions/AuthActions";
import {MENU_TYPES} from "../redux/constants/menuTypes";

class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_about: '',
            userGroups: [],
        };
    }

    componentDidMount() {
        this.props.setLoadingSpinner(true);
        authActions.fetchingUserGroups(this.props.userId, this.props.userMeta, userGroups => {
            this.props.setLoadingSpinner(false);
            if (userGroups !== null) {
                this.setState({ userGroups: userGroups });
            }
        });
    }

    async _onInvite(groupId) {
        return false;
        this.props.setLoadingSpinner(true);
        let link = await dynamicEventLink(this.props.userId, groupId);
        this.props.setLoadingSpinner(false);

        try {
            this.props.setLoadingSpinner(true);
            const result = await Share.share({
                message:
                    link,
            });
            this.props.setLoadingSpinner(false);

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }

    }

    _onOtherGroup(group) {
        Alert.alert(
            'Change Group',
            'Are you sure you want to view the group!',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK',  onPress: async () => {
                        console.log('OK Pressed =========');
                        this.props.setLoadingSpinner(true);
                        await this.props.joinGroup(group, this.props.userId);
                        this.props.setLoadingSpinner(false);
                        this.props.clickMenu(MENU_TYPES.HOME);
                        Actions.main();
                    }},
            ],
            { cancelable: false }
        )
    }

    _onChangeGroup() {
        Actions.joinGroupPage();
    }

    async _onLogout() {
        await this.props.fetchLogout();
    }


    render() {

        let avatarUrl = UserAvatar;
        if (this.props.userMeta.avatarUrl) {
            avatarUrl = { uri: this.props.userMeta.avatarUrl };
        }
        let score = 0;
        if (this.props.userMeta.points) {
            score = this.props.userMeta.points;
        }

        // console.log('SCORE');
        // console.log(score)

        let joinedGroup = {};
        if (this.props.joinedGroup) {
            joinedGroup = this.props.joinedGroup;
        }
        let userGroups = this.state.userGroups.map((item, i) => {
            return (
                <TouchableOpacity key={i} style={styles.userGroupBtn} onPress={() => this._onOtherGroup(item.groupInfo)}>
                    <Text style={styles.userGroupBtnTxt}>{item.groupInfo.group_name}</Text>
                </TouchableOpacity>
            );
        });

        return (
            <View>
                <Spinner
                    visible={this.props.isLoading}
                    textContent={''}
                    textStyle={{ color: '#FFF' }}
                />
                <View style={styles.container}>
                    <HeaderSection />
                    <ScrollView style={styles.contentWrapper}>
                        <View style={styles.mainInfoWrapper}>
                            <View style={styles.avatarBox}>
                                <Image source={avatarUrl} style={styles.userAvatar} />
                            </View>
                            <View style={styles.mainInfoBox}>
                                <View style={styles.nameView}>
                                    <Text style={styles.nameTxt}>
                                        {`${this.props.userMeta.first_name ? this.props.userMeta.first_name : ''} ${this.props.userMeta.last_name ? this.props.userMeta.last_name : ''}`}
                                    </Text>
                                </View>
                                <View style={styles.otherView}>
                                    <View style={styles.otherViewBox}>
                                        <Image source={IconIdea} style={styles.iconPoint} />
                                        <Text style={styles.otherTxts}>{score} points</Text>
                                    </View>
                                    <View style={styles.otherViewBox}>
                                        <Image source={IconMarker} style={styles.iconLocation} />
                                        <Text style={styles.otherTxts}>{this.props.userMeta.district ? this.props.userMeta.district : ''}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.userMetaWrapper}>
                            <View style={styles.pointWrapper}>
                                <View style={styles.pointBox}>
                                    <Text style={[styles.pointStep, styles.marginRight8]}>0-100</Text>
                                    <ImageBackground style={styles.pointLevelBox}
                                        source={(score >= 0 && score <= 100) ? PointNormal1a : PointNormal1}>
                                        <Text style={[styles.pointLevel, styles.marginRight8]}>Normal</Text>
                                    </ImageBackground>
                                </View>
                                <View style={[styles.pointBox, styles.marginLeftM8]}>
                                    <Text style={[styles.pointStep, styles.marginLeft8]}>101-500</Text>
                                    <ImageBackground style={styles.pointLevelBox}
                                        source={(score >= 101 && score <= 500) ? PointNormal2a : PointNormal2}>
                                        {/*<Text style={[styles.pointLevel]}>Normal</Text>*/}
                                    </ImageBackground>
                                </View>
                                <View style={[styles.pointBox, styles.marginLeftM8]}>
                                    <Text style={[styles.pointStep, styles.marginLeft8]}>501-1000</Text>
                                    <ImageBackground style={styles.pointLevelBox}
                                        source={(score >= 501 && score <= 1000) ? PointExcellent1a : PointExcellent1}>
                                        {/*<Text style={[styles.pointLevel]}>Normal</Text>*/}
                                    </ImageBackground>
                                </View>
                                <View style={[styles.pointBox, styles.marginLeftM8]}>
                                    <Text style={[styles.pointStep, styles.marginLeft8]}>1001+</Text>
                                    <ImageBackground style={styles.pointLevelBox}
                                        source={(score >= 1001) ? PointExcellent2a : PointExcellent2}>
                                        <Text style={[styles.pointLevel, styles.marginLeft8]}>Excellent</Text>
                                    </ImageBackground>
                                </View>
                            </View>
                            <View style={styles.groupView}>
                                <View style={styles.groupViewRow}>
                                    <Text style={styles.groupViewLeft}>Seu Endereço: </Text>
                                    <Text style={styles.groupViewRight}>
                                        {`${this.props.userMeta.district ? this.props.userMeta.district + ', ' : ''}${this.props.userMeta.street ? this.props.userMeta.street + ', ' : ''}${this.props.userMeta.city ? this.props.userMeta.city + ', ' : ''}${this.props.userMeta.country ? this.props.userMeta.country : ''}`}
                                    </Text>
                                </View>
                                <View style={styles.groupViewRow}>
                                    <Text style={styles.groupViewLeft}>Grupos: </Text>
                                    <View style={styles.groupViewRight}>
                                        {userGroups}
                                    </View>
                                </View>
                                {/*<View style={styles.inviteWrapper}>*/}
                                {/*    <TouchableOpacity style={styles.inviteBtn} onPress={() => this._onInvite(this.props.groupId)}>*/}
                                {/*        <Text style={styles.inviteBtnTxt}>Convidar vizinho</Text>*/}
                                {/*    </TouchableOpacity>*/}
                                {/*</View>*/}
                            </View>
                            <View style={styles.btnBottomWrapper}>
                                <TouchableOpacity style={styles.btnBottom} onPress={() => this._onChangeGroup()}>
                                    <Text style={styles.btnBottomTxt}>Mudar de Grupo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.btnBottom, { marginRight: 0 }]} onPress={() => this._onLogout()}>
                                    <Text style={styles.btnBottomTxt}>Logout</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        userId: state.AuthReducer.userId,
        groupId: state.AuthReducer.groupId,
        userMeta: state.AuthReducer.userMeta,
        joinedGroup: state.AuthReducer.joinedGroup,
        isLoading: Boolean(state.AuthReducer.isLoading),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clickMenu: (type) => dispatch(authActions.clickMenu(type)),
        fetchLogout: () => dispatch(authActions.fetchLogout()),
        setLoadingSpinner: (loading) => dispatch(authActions.setLoadingSpinner(loading)),
        joinGroup: (group, userId) => dispatch(authActions.joinGroup(group, userId)),
        // udatePoints: (points) => dispatch(authActions.udatePoints(points))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);
