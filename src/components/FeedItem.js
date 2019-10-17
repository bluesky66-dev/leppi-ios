import React, {Component} from "react";
import {connect} from 'react-redux';
import {Image, TouchableOpacity, View, Text} from "react-native";
import {Actions} from 'react-native-router-flux';
import styles from '../styles/feedItem';
import UserAvatar from "../images/user-avatar.png";
import IconClock from "../images/clock.png";
import IconAvatar from "../images/avatar.png";
import IconIdea from "../images/idea.png";
import IconMarker from "../images/maps-and-flags.png";
import {FeedTypes} from "../redux/constants/feedConstants";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

class FeedItem extends Component {

    constructor(props) {
        super(props);
        this._goToDetail = this._goToDetail.bind(this);
    }

    _goToDetail() {
        Actions.feedDetail({feedInfo: this.props.feed, feedBadge: this.props.feedBadge});
    }

    render() {
        let feedInfo = {};
        if (this.props.feed) {
            feedInfo = this.props.feed;
        }
        let feedBadge = styles.feedBadgeRed;
        if (feedInfo.feed_type === FeedTypes.solicitation) {
            feedBadge = styles.feedBadgeBlue;
        }
        let avatarImage = UserAvatar;
        if (feedInfo.userMeta && feedInfo.userMeta.avatarUrl) {
            avatarImage = {uri: feedInfo.userMeta.avatarUrl};
        }
        let feedAge = '';
        if (feedInfo.createTime) {
            feedAge = timeAgo.format(feedInfo.createTime);
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

        return (
            <TouchableOpacity onPress={() => this._goToDetail()} style={styles.contentWrapper}>
                <View style={[styles.feedBadge, feedBadge]}/>
                <View style={styles.feedContent}>
                    <View style={styles.imageBox}>
                        <View style={styles.thumbnail}>
                            <Image source={avatarImage} style={styles.thumbImage}/>
                        </View>
                    </View>
                    <View style={styles.descWrapper}>
                        <View style={styles.titleView}>
                            <Text style={styles.catTxt}>{feedInfo.feed_category?feedInfo.feed_category:''}</Text>
                            <Text style={styles.titleTxt}>{feedInfo.product_title?feedInfo.product_title:''}</Text>
                        </View>
                        <View style={styles.dateView}>
                            <Image style={styles.iconDate} source={IconClock}/>
                            <Text style={styles.dateTxt}>{feedAge}</Text>
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
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

}


function mapStateToProps(state, props) {
    return {}
}

export default connect(mapStateToProps, null)(FeedItem);
