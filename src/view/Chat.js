import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {Container, Root} from 'native-base';
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
        this.props.setLoadingSpinner(true);
        authActions.fetchingChatRooms(this.props.groupId, this.props.userMeta, chatRooms => {
            this.props.setLoadingSpinner(false);
            if (chatRooms !== null) {
                this.setState({ chatRooms: chatRooms });
            }
        });
    }

    render() {
        let chatRooms = this.state.chatRooms.map((item, i) => {
            return (
                <ChatItem chatRoom={item} key={i}/>
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
                        <View style={styles.height56}/>
                        {chatRooms}
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

export default connect(mapStateToProps, mapDispatchToProps)(Chat);





