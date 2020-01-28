import React, {Component} from 'react';
import {listenOrientationChange as lor, removeOrientationListener as rol} from 'react-native-responsive-screen';
import {Image, ScrollView, TextInput, TouchableOpacity, View, Text} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import HeaderSection from '../components/HeaderSection';

import styles from '../styles/chatRoom';
import ChatMessage from "../components/ChatMessage";
import IconAvatar from "../images/avatar.png";
import IconIdea from "../images/idea.png";
import IconMarker from "../images/maps-and-flags.png";
import backIcon from "../images/back_black.png";
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
        lor(this);
        authActions.onMessages(this.props.roomInfo.roomId, messages => {
            if (messages !== null) {
                this.setState({ messages: messages })
            }
        });
    }

    componentWillUnmount() {
        rol();
    }

    _onChangeText = (text)=> {        
        this.setState({chat_msg: text})
    }

    _onAttachFile(){
    }

    _onSendMsg = async () => {
        if (!this.state.chat_msg) {
            return false;
        }
        
        let message = {
            content: this.state.chat_msg,
            sender: this.props.userId,
            isRead: false,
        };
        let roomInfo = {
            roomId: this.props.roomInfo.roomId,
            users: this.props.roomInfo.users,
        };
        await authActions.sendMessage(this.props.userMeta, roomInfo, message);
        this.setState({chat_msg: ''});
    }

    _onPressBack = () => {
        const {navigate} = this.props.navigation;
        navigate('Chat');
    }

    render() {
        const {roomInfo} = this.props;

        let username = '';
        if (roomInfo.userMeta && roomInfo.userMeta.first_name) {
            username = roomInfo.userMeta.first_name + ' ' + roomInfo.userMeta.last_name;
        }
        let location = '';
        if (roomInfo.userMeta && roomInfo.userMeta.district) {
            location = roomInfo.userMeta.district;
        }

        let chatMsgs = this.state.messages.map((msg, i) => {
            return (
                <ChatMessage message={msg} key={i}/>
            );
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
                    <TouchableOpacity style={styles.backIcon} onPress={() => this._onPressBack()}>
                        <Image source={backIcon} style={styles.backIconStyle}/>
                    </TouchableOpacity>
                    <ScrollView style={styles.contentWrapper}>
                        <View style={styles.height22}/>
                        <View style={styles.otherView}>
                            <View style={styles.otherViewBox}>
                                <Image style={styles.iconProfile} source={IconAvatar}/>
                                <Text style={styles.otherTxts}>{username}</Text>
                            </View>
                            <View style={styles.otherViewBox}>
                                <Image style={styles.iconLocation} source={IconMarker}/>
                                <Text style={styles.otherTxts}>{location}</Text>
                            </View>
                        </View>
                        <View style={styles.msgsWrapper}>
                            {chatMsgs}
                        </View>
                        <View style={styles.height104}/>
                    </ScrollView>
                </View>
                <View style={styles.chatBtnBox}>
                        <TextInput
                            onChangeText={(text) => this._onChangeText(text)}
                            placeholder={'Escreva sua mensagem'}
                            multiline={true}
                            numberOfLines={1}
                            style={[styles.chatInput]}
                            value={this.state.chat_msg}
                            secureTextEntry={false}
                            autoCapitalize='none'
                        />
                        {/*<TouchableOpacity style={styles.btnAttach} activeOpacity={0.8} onPress={()=>this._onAttachFile()}>*/}
                        {/*    <View style={styles.paperClipBox}>*/}
                        {/*        <Image style={styles.iconPaperClip} source={IconPaperClip}/>*/}
                        {/*    </View>*/}
                        {/*</TouchableOpacity>*/}
                        <TouchableOpacity style={styles.btnSendMsg} activeOpacity={0.8} onPress={()=>this._onSendMsg()}>
                            <View style={styles.btnSendMsgBox}>
                                <Text style={styles.btnSendTxt}>Enviar</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
            </View>
        );
    }
}


function mapStateToProps(state, props) {
    return {
        userId: state.AuthReducer.userId,
        userMeta: state.AuthReducer.userMeta,
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





