import React, {Component} from 'react';
import {listenOrientationChange as lor, removeOrientationListener as rol} from 'react-native-responsive-screen';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import HeaderSection from '../components/HeaderSection';
import UserItem from '../components/UserItem';
import styles from '../styles/feed';
import * as authActions from "../redux/actions/AuthActions";

class ChatUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            userList: [],
        };
    }

     componentDidMount() {
        lor(this);
         const roomInfo = this.props.navigation.getParam('roomInfo', {});
         if (roomInfo) {
             this.props.setLoadingSpinner(true);
             authActions.fetchingChatUsers(roomInfo, this.state.page, userList => {
                 this.props.setLoadingSpinner(false);
                 if (userList !== null) {
                     this.setState({ userList: userList });
                 }
             });
         }
    }

    componentWillUnmount() {
        rol();
    }

    render() {
        console.log('this.state.userList', this.state.userList.length);
        let userList = this.state.userList.map((item, i) => {
            return(
                <UserItem
                    navigation={this.props.navigation}
                    userInfo={item}
                    key={i}/>
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
                        <View style={styles.height13}/>
                        {userList}
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoadingSpinner: (loading) => dispatch(authActions.setLoadingSpinner(loading))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatUsers);