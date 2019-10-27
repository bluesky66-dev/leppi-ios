import React, {Component} from "react";
import {connect} from 'react-redux';
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from '../styles/userItem';
import UserAvatar from "../images/user-avatar.png";
import IconIdea from "../images/idea.png";
import IconMarker from "../images/maps-and-flags.png";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import * as authActions from "../redux/actions/AuthActions";

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

class UserItem extends Component {

    constructor(props) {
        super(props);
        this._goToDetail = this._goToDetail.bind(this);
    }

    async _goToDetail() {
        const {navigate} = this.props.navigation;

        let roomInfo = {
            buyerId: this.props.userInfo.buyerId,
            sellerId: this.props.userInfo.sellerId,
            feedId: this.props.userInfo.feedId,
        };
        await this.props.goToChatRoom(roomInfo);
        navigate('ChatRoom');
    }

    render() {
        let userInfo = {};
        if (this.props.userInfo) {
            userInfo = this.props.userInfo;
        }
        let avatarImage = UserAvatar;
        if (userInfo.userMeta && userInfo.userMeta.avatarUrl) {
            //console.log('===== avatarUrl', userInfo.userMeta.avatarUrl);
            avatarImage = {uri: userInfo.userMeta.avatarUrl};
        }
        let username = '';
        if (userInfo.userMeta && userInfo.userMeta.first_name) {
            username = userInfo.userMeta.first_name + ' ' + userInfo.userMeta.last_name;
        }
        let point = 0;
        if (userInfo.userMeta && userInfo.userMeta.points) {
            point = userInfo.userMeta.points;
        }
        let location = '';
        if (userInfo.userMeta && userInfo.userMeta.district) {
            location = userInfo.userMeta.district;
        }

        return (
            <TouchableOpacity onPress={() => this._goToDetail()} style={styles.contentWrapper} activeOpacity={0.8}>
                <View style={styles.feedContent}>
                    <View style={styles.imageBox}>
                        <View style={styles.thumbnail}>
                            <Image source={avatarImage} style={styles.thumbImage}/>
                        </View>
                    </View>
                    <View style={styles.descWrapper}>
                        <View style={styles.titleView}>
                            <Text style={styles.titleTxt}>{username}</Text>
                        </View>
                        <View style={styles.otherView}>
                            <View style={styles.otherViewBox}>
                                <Image style={styles.iconPoint} source={IconIdea}/>
                                <Text style={styles.otherTxts}>{point} points</Text>
                            </View>
                            <View style={styles.otherViewBox}>
                                <Image style={styles.iconLocation} source={IconMarker}/>
                                <Text style={styles.otherTxts}>{location}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

}


function mapStateToProps(state, props) {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        goToChatRoom: (roomInfo) => dispatch(authActions.goToChatRoom(roomInfo)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserItem);
