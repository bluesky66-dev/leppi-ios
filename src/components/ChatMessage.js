import React, {Component} from "react";
import {connect} from 'react-redux';
import {View} from "react-native";
import {Text} from "native-base";
import styles from '../styles/chatMessage';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

class ChatMessage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let msgType = styles.custMsg;
        let alignSelf = styles.flexStart;
        if (this.props.message.sender === this.props.userId) {
            msgType = styles.myMsg;
            alignSelf = styles.flexEnd;
        }
        return (
            <View style={[styles.contentWrapper, alignSelf]}>
                <View style={[styles.chatContent, msgType]}>
                    <Text style={styles.chatMessage}>{this.props.message.content}</Text>
                </View>
                <View style={[styles.dateView, alignSelf]}>
                    <Text style={styles.dateTxt}>{timeAgo.format(this.props.message.createTime)}</Text>
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

export default connect(mapStateToProps, null)(ChatMessage);
