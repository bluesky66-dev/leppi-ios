import React, {Component} from 'react';
import {listenOrientationChange as lor, removeOrientationListener as rol} from 'react-native-responsive-screen';
import {Alert, ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import HeaderSection from '../components/HeaderSection';
import SellShareModal from '../components/SellShareModal';
import SolicitationModal from '../components/SolicitationModal';

import styles from '../styles/home';
import * as authActions from "../redux/actions/AuthActions";
import {FeedTypes} from '../redux/constants/feedConstants'
import AdActionsModal from "../components/AdActionsModal";
import FeedItem from "../components/FeedItem";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            feedList: [],
            selectedFeed: {},
            openModal: false,
            isSellShare: false,
            isSolicitation: false,
        };

        this._onSellShare = this._onSellShare.bind(this);
        this._onSolicitation = this._onSolicitation.bind(this);
    }

    async componentDidMount() {
        lor(this);
        const {navigate} = this.props.navigation;
        await this.props.fetchingUserMeta(navigate);
        this._onFetchingFeeds();
    }

    componentWillUnmount() {
        rol();
    }

    _onFetchingFeeds = () => {
        this.props.setLoadingSpinner(true);
        authActions.fetchingFeeds(this.props.userMeta, this.state.page, feedList => {
            this.props.setLoadingSpinner(false);
            if (feedList !== null) {
                let cloneFeedList = [...feedList];
                this.setState({ feedList: cloneFeedList.reverse() });
            }
        });
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


    render() {
        // console.log('feedList === ', this.state.feedList);
        let feedList = this.state.feedList.reverse().map((feed, i) => {
            let feedBadge = 'red';
            if (feed.feed_type === FeedTypes.solicitation) {
                feedBadge = 'blue';
            }
            return(
                <FeedItem
                    onAdAction={this._onAdAction}
                    navigation={this.props.navigation}
                    feed={feed}
                    key={i}
                    feedBadge={feedBadge}/>
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
                    <HeaderSection navigation={this.props.navigation}/>
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
            </View>
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
        fetchingUserMeta: (navigate) => dispatch(authActions.fetchingUserMeta(navigate)),
        setLoadingSpinner: (loading) => dispatch(authActions.setLoadingSpinner(loading)),
        deleteFeed: (feedId) => dispatch(authActions.deleteFeed(feedId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
