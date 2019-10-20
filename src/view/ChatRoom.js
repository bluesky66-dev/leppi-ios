import React, {Component} from 'react';
import {Image, ScrollView, TextInput, TouchableOpacity, View, Text} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import HeaderSection from '../components/HeaderSection';

import styles from '../styles/chatRoom';
import ChatMessage from "../components/ChatMessage";
import IconAvatar from "../images/avatar.png";
import IconIdea from "../images/idea.png";
import IconMarker from "../images/maps-and-flags.png";
import IconPaperClip from "../images/school-paper-clip.png";
import * as authActions from "../redux/actions/AuthActions";

class ChatRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chat_msg: '',
            messages: [],
        };
    }

    componentDidMount() {
        authActions.onMessages(this.props.roomInfo.roomId, messages => {
            if (messages !== null) {
                this.setState({ messages: messages })
            }
        });
    }

    _onChangeText = (text)=> {        
        this.setState({chat_msg: text})
    }

    _onAttachFile(){
    }

    _onSendMsg = () => {
        if (!this.state.chat_msg) {
            return false;
        }
        
        let message = {
            content: this.state.chat_msg,
            sender: this.props.userId,
            isRead: false,
        };
        let roomInfo = {
            groupId: this.props.groupId,
            roomId: this.props.roomInfo.roomId,
            sellerFeed: this.props.roomInfo.sellerFeed,
            buyerFeed: this.props.roomInfo.buyerFeed,
            buyerId: this.props.roomInfo.buyerId,
            sellerId: this.props.roomInfo.sellerId,
            feedId: this.props.feedInfo.feedId,
        };
        console.log('chat roomInfo', roomInfo);
        authActions.sendMessage(this.props.userMeta, roomInfo, message);
        this.setState({chat_msg: ''});
    }

    render() {
        let feedInfo = {};
        if (this.props.feedInfo) {
            feedInfo = this.props.feedInfo;
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

        let chatMsgs = this.state.messages.map((msg, i) => {
            return (
                <ChatMessage message={msg} key={i}/>
            );
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
                        <View style={styles.height22}/>
                        <View style={styles.otherView}>
                            <View style={styles.otherViewBox}>
                                <Image style={styles.iconProfile} source={IconAvatar}/>
                                <Text style={styles.otherTxts}>{username}</Text>
                            </View>
                            <View style={styles.otherViewBox}>
                                <Image style={styles.iconPoint} source={IconIdea}/>
                                <Text style={styles.otherTxts}>{point} points</Text>
                            </View>
                            <View style={styles.otherViewBox}>
                                <Image style={styles.iconLocation} source={IconMarker}/>
                                <Text style={styles.otherTxts}>{location}</Text>
                            </View>
                        </View>
                        {chatMsgs}
                        <View style={styles.height104}/>
                    </ScrollView>
                    <View style={styles.chatBtnBox}>
                        <TextInput
                            onChangeText={(text) => this._onChangeText(text)}
                            placeholder={'Type your message'}
                            multiline={true}
                            numberOfLines={1}
                            style={[styles.chatInput]}
                            value={this.state.chat_msg}
                            secureTextEntry={false}
                            autoCapitalize='none'
                        />
                        <TouchableOpacity style={styles.btnAttach} activeOpacity={0.8} onPress={()=>this._onAttachFile()}>
                            <View style={styles.paperClipBox}>
                                <Image style={styles.iconPaperClip} source={IconPaperClip}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnSendMsg} activeOpacity={0.8} onPress={()=>this._onSendMsg()}>
                            <View style={styles.btnSendMsgBox}>
                                <Text style={styles.btnSendTxt}>Send</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}


function mapStateToProps(state, props) {
    return {
        userId: state.AuthReducer.userId,
        userMeta: state.AuthReducer.userMeta,
        groupId: state.AuthReducer.groupId,
        roomInfo: state.AuthReducer.roomInfo,
        feedInfo: state.AuthReducer.feedInfo,
        isLoading: state.AuthReducer.isLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);





