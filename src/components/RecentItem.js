import React, {Component} from "react";
import {connect} from 'react-redux';
import {Image, View, Text} from "react-native";
import styles from '../styles/recentItem';
import RecentlyDefault from "../images/recent-default.png";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');


class RecentItem extends Component {

    constructor(props) {
        super(props);
    }

    _goToDetail() {
    }

    render() {
        let feedInfo = {};
        if (this.props.feedInfo) {
            feedInfo = this.props.feedInfo;
        }
        let thumbnail = RecentlyDefault;
        if (feedInfo.thumbnail) {
            thumbnail = {uri: feedInfo.thumbnail};
        }
        let feedTitle = '';
        if (feedInfo.product_title) {
            feedTitle = feedInfo.product_title;
        }
        let feedAge = '';
        if (feedInfo.createTime) {
            feedAge = timeAgo.format(feedInfo.createTime);
        }
        return (
            <View style={styles.recentItem}>
                <Image source={thumbnail} style={styles.thumbnail} resizeMode={'cover'}/>
                <View style={styles.recentInfo}>
                    <Text style={styles.itemTitle}>{feedTitle}</Text>
                    <Text style={styles.timeAgo}>{feedAge}</Text>
                </View>
            </View>
        );
    }

}


function mapStateToProps(state, props) {
    return {}
}

export default connect(mapStateToProps, null)(RecentItem);
