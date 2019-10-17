import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {Container, Root} from 'native-base';
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

    componentWillMount() {
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
                <FeedItem feed={feed} key={i} feedBadge={feedBadge}/>
            )
        });
        return (
            <Root>
                <Spinner
                    visible={this.props.isLoading}
                    textContent={''}
                    textStyle={{color: '#FFF'}}
                />
                <Container style={styles.container}>
                    <HeaderSection/>
                    <ScrollView style={styles.contentWrapper}>
                        <View style={styles.height13}/>
                        {feedList}
                        <View style={styles.height44}/>
                    </ScrollView>
                </Container>
            </Root>
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
