import React, {Component} from "react";
import {connect} from 'react-redux';
import {Image, TextInput, TouchableOpacity, View, Text, KeyboardAvoidingView} from "react-native";
import Toast from 'react-native-simple-toast';
import styles from '../styles/joinGroupModal';
import Modal from "react-native-modal";
import RecentItem from "../components/RecentItem";
import IconCloseModal from "../images/close-modal.png";
import IconBookmark from "../images/library-bookmark.png";
import MapPointPointer from "../images/map-point-pointer.png";
import * as authActions from "../redux/actions/AuthActions";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import * as LUtil from '../util';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

class JoinGroupModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            group_code: '',
            isVisible: true,
            groupCreator: {},
            recentFeeds: [],
        };
        this._onJoinGroup = this._onJoinGroup.bind(this);
    }

    componentDidMount(){
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.groupInfo !== prevProps.groupInfo) {
            this.props.setLoadingSpinner(true);
            authActions.fetchingGroupCreator(this.props.groupInfo.userId, groupCreator => {
                this.props.setLoadingSpinner(false);
                if (groupCreator !== null) {
                    this.setState({ groupCreator: groupCreator });
                }
            });
            this.props.setLoadingSpinner(true);
            authActions.fetchingRecentFeeds(this.props.groupInfo.groupId, feedList => {
                this.props.setLoadingSpinner(false);
                if (feedList !== null) {
                    this.setState({ recentFeeds: feedList });
                }
            });
        }
    }

    _onJoinGroup = async () => {
        if (!this.state.group_code || this.state.group_code.length <= 0) {
            Toast.show('Enter access code', Toast.SHORT);
            return false;
        }
        if (this.state.group_code !== this.props.groupInfo.group_code) {
            Toast.show('Invalid access code', Toast.SHORT);
            return false;
        }
        await this.props.joinGroup(this.props.groupInfo, this.props.userId);
        this.setState({isVisible: false});
        this.props.onJoinGroup();
    }

    render() {
        let groupInfo = {};
        if (this.props.groupInfo){
            groupInfo = this.props.groupInfo;
        }
        let userMeta = {};
        if (this.props.userMeta && groupInfo.userId === this.props.userId) {
            userMeta = this.props.userMeta;
        } else {
            userMeta = this.state.groupCreator;
        }

        let groupAge = '';
        let groupAgeUnit = '';
        if (groupInfo.createTime) {
            let groupAges = timeAgo.format(groupInfo.createTime, 'time').split(" ");
            groupAge = groupAges[0];
            groupAgeUnit = groupAges[1];
        }
        let groupMembers = 1;
        if (groupInfo.memberCount) {
            groupMembers = groupInfo.memberCount;
        }

        let isVisibleJoinButton = true;
        if (typeof this.props.isVisibleJoinButton !== 'undefined') {
            isVisibleJoinButton = this.props.isVisibleJoinButton;
        }
        let recentFeeds = this.state.recentFeeds.map((item, i) => {
           return (
               <RecentItem feedInfo={item} key={i}/>
           );
        });
        return (
            <Modal
                ref={'joinModal'}
                onBackdropPress={this.props.onBackdropPress}
                style={styles.container}
                isVisible={this.props.isVisible && this.state.isVisible}>
                <KeyboardAvoidingView style={styles.content} behavior={'padding'}>
                    <Image style={styles.bookMark} source={IconBookmark}/>
                    <TouchableOpacity style={styles.btnCloseModal} activeOpacity={0.8}
                                      onPress={this.props.onBackdropPress}>
                        <Image source={IconCloseModal} style={styles.iconClose}/>
                    </TouchableOpacity>
                    <View style={styles.groupNameView}>
                        <Text style={styles.groupNameTxt}>{groupInfo.group_name? groupInfo.group_name: ''}</Text>
                    </View>
                    <View style={styles.locationView}>
                        <Image source={MapPointPointer} style={styles.iconLocation}/>
                        <Text style={styles.locationTxt}>
                            {groupInfo.district ? groupInfo.district + ', ' : ''}
                            {groupInfo.street ? groupInfo.street + ', ' : ''}
                            {groupInfo.city ? groupInfo.city + ', ' : ''}
                            {groupInfo.country ? groupInfo.country : ''}
                        </Text>
                    </View>
                    <View style={styles.descView}>
                        <Text style={styles.descTxt}>
                            {groupInfo.group_desc ? groupInfo.group_desc: ''}
                        </Text>
                    </View>
                    <View style={styles.recentLabel}>
                        <Text style={styles.recentTxt}>Recently exchange items</Text>
                    </View>
                    <View style={styles.recentlyItems}>
                        {recentFeeds}
                    </View>
                    <View style={styles.groupInfo}>
                        <View style={styles.nameAndAge}>
                            <Text style={styles.nameLabel}>Creator</Text>
                            <Text style={styles.nameTxt}>
                                {userMeta.first_name ? userMeta.first_name: ''} {userMeta.last_name ? userMeta.last_name: ''}
                            </Text>
                            <Text style={styles.ageLabel}>Group age</Text>
                            <View style={styles.ageView}>
                                <Text style={styles.ageTxt}>{groupAge}</Text>
                                <Text style={styles.ageUnite}>{LUtil.capitalize(groupAgeUnit)}</Text>
                            </View>
                        </View>
                        <View style={styles.memberCountWrapper}>
                            <View style={styles.memberCount}>
                                <Text style={styles.memberCountNumber}>{groupMembers}</Text>
                                <Text style={styles.memberCountUnite}>Members</Text>
                            </View>
                        </View>
                    </View>
                    {(isVisibleJoinButton) && <View style={styles.joinBtnWrapper}>
                        <TextInput
                            onChangeText={(text) => this.setState({group_code: text})}
                            placeholder={''}
                            autoFocus={true}
                            style={styles.groupCode}
                            value={this.state.group_code}
                            secureTextEntry={false}
                            keyboardType={'numeric'}
                            autoCapitalize='none'
                        />
                        <TouchableOpacity onPress={() => this._onJoinGroup()} style={styles.btnJoinGroup}>
                            <Text style={styles.joinGroupTxt}>Entrar em Grupo</Text>
                        </TouchableOpacity>
                    </View>}
                    {(!isVisibleJoinButton)&& <View style={styles.emptyView}/>}
                </KeyboardAvoidingView>
            </Modal>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        userId: state.AuthReducer.userId,
        userMeta: state.AuthReducer.userMeta,
        isLoading: state.AuthReducer.isLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoadingSpinner: (loading) => dispatch(authActions.setLoadingSpinner(loading)),
        joinGroup: (group, userId) => dispatch(authActions.joinGroup(group, userId)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinGroupModal);
