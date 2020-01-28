import React, {Component} from "react";
import {connect} from 'react-redux';
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from '../styles/chatItem';
import * as authActions from "../redux/actions/AuthActions";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import UserAvatar from "../images/user-avatar.png";
import IconMarker from "../images/maps-and-flags.png";

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

class ChatItem extends Component {

    constructor(props) {
        super(props);
    }

    async _goToDetail() {
        const {navigate} = this.props.navigation;
        const {chatRoom, userId} = this.props;

        if (chatRoom && chatRoom.userMeta) {
            let roomInfo = {
                users: [userId, chatRoom.userMeta.userId],
            };
            await this.props.goToChatRoom(chatRoom.userMeta.userId, roomInfo);
            navigate('ChatRoom');
        }
    }

    render() {
        const {chatRoom} = this.props;

        let feedBadge = styles.feedBadgeRed;
        let username = '';
        if (chatRoom.userMeta && chatRoom.userMeta.first_name) {
            username = chatRoom.userMeta.first_name + ' ' + chatRoom.userMeta.last_name;
        }

        let location = '';
        if (chatRoom.userMeta && chatRoom.userMeta.district) {
            location = chatRoom.userMeta.district;
        }

        let avatarImage = UserAvatar;
        if (chatRoom.userMeta && chatRoom.userMeta.avatarUrl) {
            avatarImage = {uri: chatRoom.userMeta.avatarUrl};
        }

        let lastMsg = '';
        if (chatRoom && chatRoom.lastMsg) {
            lastMsg = chatRoom.lastMsg;
        }
        let lastMsgTime = '';
        if (chatRoom && chatRoom.lastMsgTime) {
            lastMsgTime = timeAgo.format(chatRoom.lastMsgTime);
        }

        return (
            <TouchableOpacity onPress={() => this._goToDetail()} activeOpacity={0.8} style={styles.contentWrapper}>
                <View style={[styles.feedBadge, feedBadge]}/>
                <View style={styles.chatContent}>
                    <View style={styles.titleView}>
                        <Text style={styles.titleTxt}>{feedInfo.product_title}</Text>
                    </View>
                   <View style={styles.userInfoRow}>
                        <View style={styles.thumbnail}>
                            <Image source={avatarImage} style={styles.thumbImage}/>
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.usernameTxt}>{username}</Text>
                            <Text style={styles.locationTxt}><Image style={styles.iconLocation} source={IconMarker}/> {location}</Text>
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setChatFoodInfo: (feedInfo) => dispatch(authActions.setChatFoodInfo(feedInfo)),
        goToChatRoom: (userId, roomInfo) => dispatch(authActions.goToChatRoom(userId, roomInfo)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatItem);
