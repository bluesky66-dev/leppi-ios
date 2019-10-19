import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import HeaderSection from '../components/HeaderSection';
import FeedItem from '../components/FeedItem';
import styles from '../styles/feed';
import * as authActions from "../redux/actions/AuthActions";
import {FeedTypes} from '../redux/constants/feedConstants';

class Feed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            feedList: [],
        };
    }

     componentDidMount() {
         this.props.setLoadingSpinner(true);
         authActions.fetchingFeeds(this.props.groupId, this.props.userMeta, this.state.page, feedList => {
             this.props.setLoadingSpinner(false);
             if (feedList !== null) {
                 let cloneFeedList = [...feedList];
                 this.setState({ feedList: cloneFeedList.reverse() });
             }
         });
    }

    render() {
        let feedList = this.state.feedList.map((feed, i) => {
            let feedBadge = 'red';
            if (feed.feed_type === FeedTypes.solicitation) {
                feedBadge = 'blue';
            }
            return(
                <FeedItem
                    navigation={this.props.navigation}
                    feed={feed}
                    key={i}
                    feedBadge={feedBadge}/>
            )
        });
        return (
            <View>
                <Spinner
                    visible={this.props.isLoading}
                    textContent={''}
                    textStyle={{color: '#FFF'}}
                />
                <View style={styles.container}>
                    <HeaderSection navigation={this.props.navigation}/>
                    <ScrollView style={styles.contentWrapper}>
                        <View style={styles.height13}/>
                        {feedList}
                        <View style={styles.height44}/>
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
        userMeta: state.AuthReducer.userMeta,
        isLoading: state.AuthReducer.isLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoadingSpinner: (loading) => dispatch(authActions.setLoadingSpinner(loading))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
