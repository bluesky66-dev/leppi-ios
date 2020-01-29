import React, {Component} from "react";
import {connect} from 'react-redux';
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from '../styles/newUserItem';
import UserAvatar from "../images/user-avatar.png";
import TimeAgo from 'javascript-time-ago';
import * as authActions from "../redux/actions/AuthActions";
import en from 'javascript-time-ago/locale/en';
import {MENU_TYPES} from "../redux/constants/menuTypes";

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

class NewUserItem extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    async _chatWithSeller() {
        const {navigate} = this.props.navigation;
        const {userInfo, userId} = this.props;

        if (!userInfo) {
            return false;
        }
        if (userId !== userInfo.userId) {
            let roomInfo = {
                users: [userId, userInfo.userId],
            };
            await this.props.goToChatRoom(userInfo.userId, roomInfo);
            this.props.clickMenu(MENU_TYPES.CHAT);
            navigate('ChatRoom');
        }
    }

    render() {
        const {userInfo, userId} = this.props;
        let avatarImage = UserAvatar;
        if (userInfo.avatarUrl) {
            avatarImage = {uri: userInfo.avatarUrl};
        }
        let feedAge = '';
        if (userInfo.createTime) {
            feedAge = timeAgo.format(userInfo.createTime);
        }
        let username = '';
        if (userInfo.first_name) {
            username = userInfo.first_name + ' ' + userInfo.last_name;
        }

        let disabled = false;
        if (userId === userInfo.userId) {
            disabled = true;
        }

        return (
            <View style={styles.contentWrapper}>
                <View style={styles.feedContent}>
                    <View style={styles.userInfoRow}>
                        <View style={styles.thumbnail}>
                            <Image source={avatarImage} style={styles.thumbImage}/>
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.usernameTxt}>{username}</Text>
                            <Text style={styles.timeAgoTxt}>{feedAge}</Text>
                        </View>
                    </View>
                    <View style={styles.descWrapper}>
                        <View style={styles.professionView}>
                            <Text style={styles.professionTxt}>Profissão:  <Text style={styles.professionTxtBold}>{userInfo.profession ? userInfo.profession: ''}</Text></Text>
                            <Text style={styles.professionDesc}>{userInfo.profession_desc ? userInfo.profession_desc : ''}</Text>
                        </View>
                        <View style={styles.professionView}>
                            <Text style={styles.professionTxt}>Como posso ajudar meus vizinhos:</Text>
                            <Text style={styles.professionTxtBold}>{userInfo.user_options ? userInfo.user_options.join(", "): ''}</Text>
                        </View>
                        {!disabled && <TouchableOpacity onPress={() => this._chatWithSeller()} style={[styles.btnChat]}>
                            <Text style={[styles.btnChatTxt]}>Chat</Text>
                        </TouchableOpacity>}
                    </View>
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
        setLoadingSpinner: (loading) => dispatch(authActions.setLoadingSpinner(loading)),
        setChatFoodInfo: (feedInfo) => dispatch(authActions.setChatFoodInfo(feedInfo)),
        goToChatRoom: (userId, roomInfo) => dispatch(authActions.goToChatRoom(userId, roomInfo)),
        clickMenu: (type) => dispatch(authActions.clickMenu(type)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(NewUserItem);