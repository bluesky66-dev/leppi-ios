import React, {Component} from "react";
import {connect} from 'react-redux';
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from '../styles/feedItem';
import UserAvatar from "../images/user-avatar.png";
import IconDot from "../images/icon-ddd.png";
import IconMarker from "../images/maps-and-flags.png";
import TimeAgo from 'javascript-time-ago';
import * as authActions from "../redux/actions/AuthActions";
import en from 'javascript-time-ago/locale/en';

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
    }

    _goToDetail() {
        const {navigate} = this.props.navigation;
        navigate('FeedDetail', {feedInfo: this.props.feed, feedBadge: this.props.feedBadge});
    }

    async _chatWithSeller() {
        const {navigate} = this.props.navigation;
        const {feed, userId} = this.props;

        if (!feed) {
            return false;
        }
        if (this.props.userId !== feed.userId) {
            let roomInfo = {
                users: [userId, feed.userId],
            };
            await this.props.setChatFoodInfo(feed);
            await this.props.goToChatRoom(feed.userId, roomInfo);
        }
    }

    render() {
        const {onImageView, feed} = this.props;
        let feedInfo = {};
        if (feed) {
            feedInfo = feed;
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
        let location = '';
        if (feedInfo.userMeta && feedInfo.userMeta.district) {
            location = feedInfo.userMeta.district;
        }

        let renderImageView = this.state.gallery.map((item, i) => {
            return {
                source: {
                    uri: item,
                },
            }
        });
        let renderGallery = [];
        if (feedInfo.galleryUrls && Array.isArray(feedInfo.galleryUrls)) {
            renderGallery = feedInfo.galleryUrls.map((item, i) => {
                return <TouchableOpacity
                    style={styles.galleryItemView}
                    onPress={() => onImageView(renderImageView, i)}
                >
                    <Image source={{uri: item}} key={i} style={styles.galleryItem}/>
                </TouchableOpacity>
            });
        }
        let renderDefaultTags = feedInfo.defaultTags.map((tag, i) => {
            if (!tag){
                return null
            }
            return <TouchableOpacity
                style={styles.tagItem}
                key={i}
                onPress={() => this._onSelectTag(tag)}
                activeOpacity={0.8}>
                <Text style={styles.tagItemText}>#{tag}</Text>
            </TouchableOpacity>
        });
        let extraTags = feedInfo.extraTags.split(" ").map((tag, i) => {
            if (!tag){
                return null
            }
            return <TouchableOpacity
                style={styles.tagItem}
                key={i}
                onPress={() => this._onSelectTag(tag)}
                activeOpacity={0.8}>
                <Text style={styles.tagItemText}>#{tag}</Text>
            </TouchableOpacity>
        });

        let disabled = false;
        if (this.props.userId === feedInfo.userId) {
            disabled = true;
        }

        return (
            <View onPress={() => this._goToDetail()} style={styles.contentWrapper}>
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
                        {!disabled && <TouchableOpacity onPress={() => this._chatWithSeller()} style={[styles.btnChat]}>
                            <Text style={[styles.btnChatTxt]}>Chat</Text>
                        </TouchableOpacity>}
                    </View>
                </View>
            </View>
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
        goToChatRoom: (userId, roomInfo) => dispatch(authActions.goToChatRoom(userId, roomInfo)),
        clickMenu: (type) => dispatch(authActions.clickMenu(type)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(FeedItem);
