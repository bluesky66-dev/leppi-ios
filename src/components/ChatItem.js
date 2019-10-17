import React, {Component} from "react";
import {connect} from 'react-redux';
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from '../styles/chatItem';
import IconAvatar from "../images/avatar.png";
import IconIdea from "../images/idea.png";
import IconMarker from "../images/maps-and-flags.png";
import {FeedTypes} from '../redux/constants/feedConstants';
import * as authActions from "../redux/actions/AuthActions";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

class ChatItem extends Component {

    constructor(props) {
        super(props);
    }

    async _goToDetail() {
        const {navigate} = this.props.navigation;

        let feedInfo = {};
        if (this.props.chatRoom && this.props.chatRoom.feedInfo) {
            feedInfo = this.props.chatRoom.feedInfo;
            await this.props.setChatFoodInfo(feedInfo);
            if (feedInfo.userId === this.props.userId) {
                let roomInfo = {
                    groupId: this.props.groupId,
                    sellerId: this.props.userId,
                    feedId: feedInfo.feedId,
                };
                navigate('ChatUsers', {roomInfo: roomInfo});
            } else {
                let roomInfo = {
                    buyerId: this.props.userId,
                    sellerId: feedInfo.userId,
                    feedId: feedInfo.feedId,
                };
                await this.props.goToChatRoom(roomInfo);
                navigate('ChatRoom');
            }
        }
    }

    render() {
        let feedInfo = {};
        if (this.props.chatRoom && this.props.chatRoom.feedInfo) {
            feedInfo = this.props.chatRoom.feedInfo;
        }
        let feedBadge = styles.feedBadgeRed;
        if (feedInfo.feed_type === FeedTypes.solicitation) {
            feedBadge = styles.feedBadgeBlue;
        }
        let username = '';
        if (feedInfo.userMeta && feedInfo.userMeta.first_name) {
            username = feedInfo.userMeta.first_name + ' ' + feedInfo.userMeta.last_name;
        }
        let point = 0;
        if (feedInfo.userMeta && feedInfo.userMeta.points) {
            point = feedInfo.userMeta.points;
        }
        let location = '';
        if (feedInfo.userMeta && feedInfo.userMeta.district) {
            location = feedInfo.userMeta.district;
        }
        let lastMsg = '';
        if (this.props.chatRoom && this.props.chatRoom.lastMsg) {
            lastMsg = this.props.chatRoom.lastMsg;
        }
        let lastMsgTime = '';
        if (this.props.chatRoom && this.props.chatRoom.lastMsgTime) {
            lastMsgTime = timeAgo.format(this.props.chatRoom.lastMsgTime);
        }
        return (
            <TouchableOpacity onPress={() => this._goToDetail()} activeOpacity={0.8} style={styles.contentWrapper}>
                <View style={[styles.feedBadge, feedBadge]}/>
                <View style={styles.chatContent}>
                    <View style={styles.titleView}>
                        <Text style={styles.titleTxt}>{feedInfo.product_title}</Text>
                    </View>
                    <View style={styles.otherView}>
                        <View style={styles.otherViewBox}>
                            <Image style={styles.iconProfile} source={IconAvatar}/>
                            <Text style={styles.otherTxts}>{username}</Text>
                        </View>
                        <View style={styles.otherViewBox}>
                            <Image style={styles.iconPoint} source={IconIdea}/>
                            <Text style={styles.otherTxts}>{point} points</Text>
                        </View>
                        <View style={styles.otherViewBox}>
                            <Image style={styles.iconLocation} source={IconMarker}/>
                            <Text style={styles.otherTxts}>{location}</Text>
                        </View>
                    </View>
                    <View style={styles.lastMessageView}>
                        <Text style={styles.lastMessage}>{lastMsg}</Text>
                    </View>
                </View>
                <View style={styles.dateView}>
                    <Text style={styles.dateTxt}>{lastMsgTime}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}


function mapStateToProps(state, props) {
    return {
        userId: state.AuthReducer.userId,
        groupId: state.AuthReducer.groupId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setChatFoodInfo: (feedInfo) => dispatch(authActions.setChatFoodInfo(feedInfo)),
        goToChatRoom: (roomInfo) => dispatch(authActions.goToChatRoom(roomInfo)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatItem);
