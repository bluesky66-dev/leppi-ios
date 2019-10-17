import React, {Component} from 'react';
import {Image, ScrollView, TouchableOpacity, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Swiper from "react-native-swiper";
import styles from '../styles/feedDetail';
import {AppTopBack} from "../components/start";
import IconClock from "../images/clock.png";
import IconAvatar from "../images/avatar.png";
import IconIdea from "../images/idea.png";
import IconMarker from "../images/maps-and-flags.png";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Spinner from "react-native-loading-spinner-overlay";
import * as authActions from "../redux/actions/AuthActions";
import {MENU_TYPES} from "../redux/constants/menuTypes";

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

class FeedDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            mediaGallery: [],
        };
    }

    componentWillMount() {
    }

    componentDidMount() {
        if (this.props.feedInfo && this.props.feedInfo.gallery && Array.isArray(this.props.feedInfo.gallery)) {
            this.props.setLoadingSpinner(true);
            authActions.filterMediaGallery(this.props.feedInfo.gallery, mediaGallery => {
                this.props.setLoadingSpinner(false);
                if (mediaGallery !== null) {
                    this.setState({ mediaGallery: mediaGallery });
                }
            });
        }
    }

    async _chatWithSeller() {
        if (!this.state.disabled) {
            let roomInfo = {
                buyerId: this.props.userId,
                sellerId: this.props.feedInfo.userId,
                feedId: this.props.feedInfo.feedId,
            };
            await this.props.setChatFoodInfo(this.props.feedInfo);
            await this.props.goToChatRoom(roomInfo);
            this.props.clickMenu(MENU_TYPES.CHAT);
            Actions.chatRoom();
        }
    }

    render() {
        let feedInfo = {};
        if (this.props.feedInfo) {
            feedInfo = this.props.feedInfo;
        }
        let feedBadge = styles.backRed;
        let btnColor = styles.redTxt;
        let detailTop = styles.detailRed;
        let est_time = '';
        let est_date = '';
        let product_price = '';
        let product_qty = '';
        let swiperContent = [];
        if (this.props.feedBadge === 'blue') {
            feedBadge = styles.backBlue;
            btnColor = styles.blueTxt;
            detailTop = styles.detailBlue;
            if (feedInfo.est_time) {
                est_time = feedInfo.est_time;
            }
            if (feedInfo.est_date) {
                est_date = feedInfo.est_date;
            }
        } else {
            if (feedInfo.product_price) {
                product_price = feedInfo.product_price;
            }
            if (feedInfo.product_qty) {
                product_qty = feedInfo.product_qty;
            }
            if (this.state.mediaGallery && this.state.mediaGallery.length > 0) {
                swiperContent = this.state.mediaGallery.map((item, i) => {
                    return (<View style={styles.slideItem} key={i}>
                        <Image source={{ uri: item }} resizeMode={'cover'} style={styles.slideImage} />
                    </View>);
                });
            }
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

        let disabled = false;
        let disabledOpacity = {};
        if (this.props.userId === feedInfo.userId) {
            disabled = true;
            disabledOpacity = { opacity: 0.3 };
        }


        return (
            <View>
                <Spinner
                    visible={this.props.isLoading}
                    textContent={''}
                    textStyle={{ color: '#FFF' }}
                />
                <View style={styles.container}>
                    <ScrollView style={styles.contentWrapper}>
                        <AppTopBack onBackPress={() => {
                            this.props.navigation.goBack()
                        }} />
                        {(this.props.feedBadge !== 'blue') && <Swiper ref={'swiper'}
                            scrollEnabled={true}
                            showsPagination={true}
                            dotStyle={styles.dotStyle}
                            activeDotStyle={styles.activeDotStyle}
                            loop={true}
                            autoplay={true}
                            style={styles.swiperWrapper}>
                            {swiperContent}
                        </Swiper>}
                        <View style={[styles.detailWrapper, detailTop]}>
                            <View style={[styles.feedBadge, feedBadge]} />
                            <Text style={styles.feedTitle}>{feedInfo.product_title ? feedInfo.product_title : ''}</Text>
                            <View style={styles.dateView}>
                                <Image style={styles.iconDate} source={IconClock} />
                                <Text style={styles.dateTxt}>{feedAge}</Text>
                            </View>
                            <View style={styles.otherView}>
                                <View style={styles.otherViewBox}>
                                    <Image style={styles.iconProfile} source={IconAvatar} />
                                    <Text style={styles.otherTxts}>{username}</Text>
                                </View>
                                <View style={styles.otherViewBox}>
                                    <Image style={styles.iconPoint} source={IconIdea} />
                                    <Text style={styles.otherTxts}>{point} points</Text>
                                </View>
                                <View style={styles.otherViewBox}>
                                    <Image style={styles.iconLocation} source={IconMarker} />
                                    <Text style={styles.otherTxts}>{location}</Text>
                                </View>
                            </View>
                            <View style={styles.descWrapper}>
                                <Text style={styles.descTitle}>Descrição</Text>
                                <Text style={styles.feedDesc}>
                                    {feedInfo.product_desc ? feedInfo.product_desc : ''}
                                </Text>
                            </View>
                            {(this.props.feedBadge === 'blue') && <View style={styles.metaWrapper}>
                                <View style={styles.metaRow}>
                                    <Text style={[styles.metaRowLeft, styles.metaRowLeftL]}>Data: </Text>
                                    <Text style={styles.metaRowRight}>{est_date}</Text>
                                </View>
                            </View>
                            }
                            {(this.props.feedBadge !== 'blue') && <View style={styles.metaWrapper}>
                                <View style={styles.metaRow}>
                                    <Text style={styles.metaRowLeft}>Preço: </Text>
                                    <Text style={styles.metaRowRight}>{product_price}</Text>
                                    <Text style={styles.metaRowUnit}>R$</Text>
                                </View>
                            </View>
                            }

                            <TouchableOpacity onPress={() => this._chatWithSeller()} style={[styles.btnChatWrapper, disabledOpacity]} disabled={disabled}>
                                <View style={[styles.btnChat, feedBadge]}>
                                    <Text style={[styles.btnChatTxt, btnColor]}>
                                        {this.props.feedBadge === 'blue' ? 'Chat' : 'Chat with seller'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
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
        mediaGallery: state.AuthReducer.mediaGallery,
        isLoading: state.AuthReducer.isLoading,
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

export default connect(mapStateToProps, mapDispatchToProps)(FeedDetail);





