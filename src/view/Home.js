import React, {Component} from 'react';
import {listenOrientationChange as lor, removeOrientationListener as rol} from 'react-native-responsive-screen';
import {Alert, ScrollView, Text, View, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import HeaderSection from '../components/HeaderSection';
import SellShareModal from '../components/SellShareModal';
import SolicitationModal from '../components/SolicitationModal';

import styles from '../styles/home';
import * as authActions from "../redux/actions/AuthActions";
import {FeedTypes} from '../redux/constants/feedConstants'
import {FeedOptions} from '../redux/constants/feedOptions'
import AdActionsModal from "../components/AdActionsModal";
import FeedItem from "../components/FeedItem";
import NewUserItem from "../components/NewUserItem";
import ImageView from 'react-native-image-view';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            feedList: [],
            newUserList: [],
            viewImage: [],
            imageIndex: 0,
            selectedFeed: {},
            openModal: false,
            isSellShare: false,
            isSolicitation: false,
            isImageViewVisible: false,
            isTriggerOpenPlus: false,
        };

        this._onSellShare = this._onSellShare.bind(this);
        this._onSolicitation = this._onSolicitation.bind(this);
    }

    async componentDidMount() {
        lor(this);
        const {navigate} = this.props.navigation;
        await this.props.fetchingUserMeta(navigate);
        this._onFetchNewUsers();
        this._onFetchingFeeds();
    }

    componentWillUnmount() {
        rol();
    }

    _onFetchingFeeds = () => {
        const {setLoadingSpinner} = this.props;
        setLoadingSpinner(true);
        authActions.fetchingFeeds(this.props.userMeta, this.state.page, (listData) => {
            setLoadingSpinner(false);
            this.setState({feedList: listData});
        });
    }

    _onFetchNewUsers = () => {
        const {setLoadingSpinner} = this.props;
        setLoadingSpinner(true);
        authActions.fetchNewUsers((listData) => {
            setLoadingSpinner(false);
            this.setState({newUserList: listData});
        })
    }

    _onSellShare = () => {
        this.setState({isSellShare: true})
    }

    _onSolicitation = () => {
        this.setState({isSolicitation: true})
    }

    _onAdAction = (feed) => {
        delete feed.userMeta;
        this.setState({openModal: true, selectedFeed: feed});
    }

    _onEdit = () => {
        const feed = this.state.selectedFeed;
        this.setState({openModal: false});
        if (feed.feed_type === FeedTypes.solicitation) {
            this._onSolicitation();
        } else {
            this._onSellShare();
        }
    }

    _onDelete = () => {
        const mainThis = this;
        Alert.alert(
            'Remove Image',
            'Are you sure you want to remove the ad?',
            [
                {text: 'Cancel', onPress: () => {
                    }, style: 'cancel'},
                {text: 'OK', onPress: async () => {
                        mainThis.props.deleteFeed(mainThis.state.selectedFeed.feedId);
                        mainThis.setState({selectedFeed: {}, openModal: false});
                        mainThis._onFetchingFeeds();
                    }},
            ],
            { cancelable: false }
        );
    }

    _onSelectFeedCat = (feedCategory) => {
        this.setState({
            feedCategory: feedCategory,
            isTriggerOpenPlus: true,
        });
    }

    _onClosePlus = () => {
        this.setState({
            isTriggerOpenPlus: false,
        });
    }

    _onImageView = (images, index) => {
        this.setState({
            viewImage: images,
            imageIndex: index,
            isImageViewVisible: true,
        })
    }
    _onCloseImageView = () => {
        this.setState({
            viewImage: [],
            imageIndex: 0,
            isImageViewVisible: 0,
        })
    }

    render() {
        const {newUserList} = this.state;

        let feedList = this.state.feedList.map((feed, i) => {
            let feedBadge = 'red';
            if (feed.feed_type === FeedTypes.solicitation) {
                feedBadge = 'blue';
            }
            return(
                <FeedItem
                    onAdAction={this._onAdAction}
                    navigation={this.props.navigation}
                    onImageView={this._onImageView}
                    feed={feed}
                    key={i}
                    feedBadge={feedBadge}/>
            )
        });

        let newUserView = newUserList.map((userInfo, i) => {
            return(
                <NewUserItem
                    navigation={this.props.navigation}
                    userInfo={userInfo}
                    key={i}/>
            )
        });

        let feedCats = FeedOptions;
        let typeBoxList = feedCats.map((feedCatInfo, i) => {
            let boxStyle = [styles.typeBox];
            if (feedCatInfo.name === this.state.feedCategory){
                boxStyle = [styles.typeBox, styles.isSelected];
            }
            return (
                <TouchableOpacity style={boxStyle} activeOpacity={0.5} key={i} onPress={()=>this._onSelectFeedCat(feedCatInfo.name)}>
                    <Image source={feedCatInfo.icon} style={styles.typeIcon} resizeMode={'contain'}/>
                    <Text style={styles.typeTxt}>{feedCatInfo.name}</Text>
                </TouchableOpacity>
            )
        });

        return (
            <View style={styles.rootWrapper}>
                <Spinner
                    visible={this.props.isLoading}
                    textContent={''}
                    textStyle={{color: '#FFF'}}
                />
                <View style={styles.container}>
                    <HeaderSection
                        navigation={this.props.navigation}
                        isOpenPlus={this.state.isTriggerOpenPlus}
                        onClosePlus={this._onClosePlus}
                    />
                    <ScrollView style={styles.contentWrapper}>
                        <View style={styles.addressInfo}>
                            <Text style={styles.addressInfoTxt}>
                                Suas publicações tem um alcance de 5km.
                            </Text>
                            <Text style={styles.addressInfoTxt}>
                                Confirme seu endereço na área de perfi.
                            </Text>
                        </View>
                        <View style={styles.titleWrapper}>
                            <Text style={styles.titleTxt}>Divulgue tudo o que você tem e faz de bom para seus vizinhos.</Text>
                        </View>
                        <View style={styles.typesBox}>
                            {typeBoxList}
                        </View>
                        <View style={styles.typesWrapper}>
                            {newUserView}
                        </View>
                        <View style={styles.typesWrapper}>
                            {feedList}
                        </View>
                    </ScrollView>
                </View>
                {this.state.openModal && <AdActionsModal
                    isVisible={this.state.openModal}
                    onEdit={this._onEdit}
                    onDelete={this._onDelete}
                    onBackdropPress={()=>this.setState({openModal: false})} />}
                {this.state.isSellShare && <SellShareModal
                    navigation={this.props.navigation}
                    isVisible={this.state.isSellShare}
                    isEditAd={true}
                    feedInfo={this.state.selectedFeed}
                    afterAction={this._onFetchingFeeds}
                    onBackdropPress={()=>this.setState({isSellShare: false})}/>}
                {this.state.isSolicitation && <SolicitationModal
                    navigation={this.props.navigation}
                    isVisible={this.state.isSolicitation}
                    isEditAd={true}
                    feedInfo={this.state.selectedFeed}
                    afterAction={this._onFetchingFeeds}
                    onBackdropPress={()=>this.setState({isSolicitation: false})}/>}
                <ImageView
                    images={this.state.viewImage}
                    onClose={this._onCloseImageView}
                    isSwipeCloseEnabled={false}
                    imageIndex={this.state.imageIndex}
                    isVisible={this.state.isImageViewVisible}
                />
            </View>
        );
    }
}


function mapStateToProps(state, props) {
    return {
        userId: state.AuthReducer.userId,
        feedList: state.AuthReducer.feedList,
        userMeta: state.AuthReducer.userMeta,
        isLoading: state.AuthReducer.isLoading,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchingUserMeta: (navigate) => dispatch(authActions.fetchingUserMeta(navigate)),
        setLoadingSpinner: (loading) => dispatch(authActions.setLoadingSpinner(loading)),
        deleteFeed: (feedId) => dispatch(authActions.deleteFeed(feedId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
