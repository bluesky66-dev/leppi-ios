import React, {Component} from "react";
import {connect} from 'react-redux';
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from '../styles/feedItem';
import UserAvatar from "../images/user-avatar.png";
import IconDot from "../images/icon-ddd.png";
import IconMarker from "../images/maps-and-flags.png";
import {FeedTypes} from "../redux/constants/feedConstants";
import TimeAgo from 'javascript-time-ago';
import * as authActions from "../redux/actions/AuthActions";
import en from 'javascript-time-ago/locale/en';
import {MENU_TYPES} from "../redux/constants/menuTypes";

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

class FeedItem extends Component {

    constructor(props) {
        super(props);
        this._goToDetail = this._goToDetail.bind(this);
        this.state = {
            gallery: []
        }
    }

    componentDidMount() {
        authActions.filterMediaList(this.props.feed.gallery, itemList => {
            this.setState({ gallery: itemList });
        });
    }

    _goToDetail() {
        const {navigate} = this.props.navigation;
        navigate('FeedDetail', {feedInfo: this.props.feed, feedBadge: this.props.feedBadge});
    }

    async _chatWithSeller() {
        const {navigate} = this.props.navigation;

        if (!this.state.feedInfo) {
            return false;
        }
        if (!this.state.disabled) {
            let roomInfo = {
                buyerId: this.props.userId,
                sellerId: this.state.feedInfo.userId,
                feedId: this.state.feedInfo.feedId,
            };
            await this.props.setChatFoodInfo(this.state.feedInfo);
            await this.props.goToChatRoom(roomInfo);
            this.props.clickMenu(MENU_TYPES.CHAT);
            navigate('ChatRoom');
        }
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

        let renderGallery = this.state.gallery.map((item, i) => {
            return <Image source={{uri: item}} key={i} style={styles.galleryItem}/>
        });
        let renderDefaultTags = feedInfo.defaultTags.map((tag, i) => {
            return <TouchableOpacity
                style={styles.tagItem}
                key={i}
                onPress={() => this._onSelectTag(tag)}
                activeOpacity={0.8}>
                <Text style={styles.tagItemText}>#{tag}</Text>
            </TouchableOpacity>
        });
        let extraTags = feedInfo.extraTags.split(" ").map((tag, i) => {
            return <TouchableOpacity
                style={styles.tagItem}
                key={i}
                onPress={() => this._onSelectTag(tag)}
                activeOpacity={0.8}>
                <Text style={styles.tagItemText}>#{tag}</Text>
            </TouchableOpacity>
        });
        let disabled = false;
        let disabledOpacity = {};
        if (this.props.userId === feedInfo.userId) {
            disabled = true;
            disabledOpacity = { opacity: 0.7 };
        }

        return (
            <TouchableOpacity onPress={() => this._goToDetail()} style={styles.contentWrapper}>
                {this.props.userId === feedInfo.userId && <TouchableOpacity style={styles.iconDot} onPress={() => this.props.onAdAction(feedInfo)}>
                    <Image source={IconDot} style={styles.iconDotStyle}/>
                </TouchableOpacity>}
                <View style={styles.feedContent}>
                    <View style={styles.userInfoRow}>
                        <View style={styles.thumbnail}>
                            <Image source={avatarImage} style={styles.thumbImage}/>
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.usernameTxt}>{username}</Text>
                            <Text style={styles.timeAgoTxt}>{feedAge}</Text>
                        </View>
                    </View>
                    <View style={styles.descWrapper}>
                        <Text style={styles.descTxt}>{feedInfo.product_desc ? feedInfo.product_desc : ''}</Text>
                        <View style={styles.galleryRow}>
                            {renderGallery}
                        </View>
                        <View style={styles.otherViewRow}>
                            <Image style={styles.iconLocation} source={IconMarker}/>
                            <Text style={styles.otherTxts}>{location}</Text>
                            <Text style={styles.priceTxt}>R$ {feedInfo.product_price}</Text>
                        </View>
                        <View style={styles.tagsRow}>
                            {renderDefaultTags}
                            {extraTags}
                        </View>
                        <TouchableOpacity onPress={() => this._chatWithSeller()} style={[styles.btnChat, disabledOpacity]} disabled={disabled}>
                            <Text style={[styles.btnChatTxt]}>Chat</Text>
                        </TouchableOpacity>
                    </View>
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
        setLoadingSpinner: (loading) => dispatch(authActions.setLoadingSpinner(loading)),
        setChatFoodInfo: (feedInfo) => dispatch(authActions.setChatFoodInfo(feedInfo)),
        goToChatRoom: (roomInfo) => dispatch(authActions.goToChatRoom(roomInfo)),
        clickMenu: (type) => dispatch(authActions.clickMenu(type)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(FeedItem);
