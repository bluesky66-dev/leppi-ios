import React, {Component} from 'react';
import {listenOrientationChange as lor, removeOrientationListener as rol} from 'react-native-responsive-screen';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import HeaderSection from '../components/HeaderSection';

import styles from '../styles/chat';
import ChatItem from "../components/ChatItem";
import * as authActions from "../redux/actions/AuthActions";

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chatRooms: []
        };
    }

    componentDidMount() {
        lor(this);
        this.props.setLoadingSpinner(true);
        authActions.fetchingChatRooms(this.props.userMeta, chatRooms => {
            this.props.setLoadingSpinner(false);
            if (chatRooms !== null) {
                this.setState({ chatRooms: chatRooms });
            }
        });
    }

    componentWillUnmount() {
        rol();
    }

    render() {
        let chatRooms = this.state.chatRooms.map((item, i) => {
            return (
                <ChatItem
                    navigation={this.props.navigation}
                    chatRoom={item}
                    key={i}/>
            )
        });
        return (
            <View style={styles.rootWrapper}>
                {this.props.isLoading && <Spinner
                    visible={this.props.isLoading}
                    textContent={''}
                    textStyle={{color: '#FFF'}}
                />}
                <View style={styles.container}>
                    <HeaderSection navigation={this.props.navigation}/>
                    <ScrollView style={styles.contentWrapper}>
                        <View style={styles.height44}/>
                        {chatRooms}
                        <View style={styles.height56}/>
                    </ScrollView>
                </View>
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
        setLoadingSpinner: (loading) => dispatch(authActions.setLoadingSpinner(loading))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);





