import React, {Component} from "react";
import {connect} from 'react-redux';
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from '../styles/header';
import logoIcon from "../images/monkey.png";
import * as authActions from "../redux/actions/AuthActions";
import {MENU_TYPES} from "../redux/constants/menuTypes";
import HomeIcon from "../images/home-sign.png";
import AddIcon from "../images/more.png";
import ChatIcon from "../images/chat-bubble.png";
import UserIcon from "../images/user.png";

class HeaderSection extends Component {

    constructor(props) {
        super(props);
        this._onPressMenu = this._onPressMenu.bind(this);
    }

    _onPressList() {
    }

    _onPressMenu(type) {
        const {navigate} = this.props.navigation;

        this.props.clickMenu(type);
        if (this.props.currentMenu === type && this.props.currentMenu !== MENU_TYPES.CHAT) {
            return false;
        }
        switch (type) {
            case MENU_TYPES.HOME:
                navigate('Home');
                break;
            case MENU_TYPES.FEED:
                navigate('Feed');
                break;
            case MENU_TYPES.CHAT:
                navigate('Chat');
                break;
            case MENU_TYPES.PERFIL:
                navigate('Perfil');
                break;
            default:
                navigate('Home');
                break;
        }
    }

    render() {
        return (
            <View style={styles.header}>
                <View style={styles.logoWrapper}>
                </View>
                <View style={styles.menuWrapper}>
                    <TouchableOpacity style={[styles.marginRight46]} onPress={()=>this._onPressMenu(MENU_TYPES.HOME)}>
                        <View style={styles.menuItem}><Image source={HomeIcon} style={styles.menuIcon}/></View>
                        {(this.props.currentMenu === MENU_TYPES.HOME) && <View style={styles.menuActive}/>}
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.marginRight48]} onPress={()=>this._onPressMenu(MENU_TYPES.FEED)}>
                        <View style={styles.menuItem}><Image source={HomeIcon} style={styles.menuIcon}/></View>
                        {(this.props.currentMenu === MENU_TYPES.FEED) && <View style={styles.menuActive}/>}
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.marginRight50]} onPress={()=>this._onPressMenu(MENU_TYPES.CHAT)}>
                        <View style={styles.menuItem}><Image source={HomeIcon} style={styles.menuIcon}/></View>
                        {(this.props.currentMenu === MENU_TYPES.CHAT) && <View style={styles.menuActive}/>}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this._onPressMenu(MENU_TYPES.PERFIL)}>
                        <View style={styles.menuItem}><Image source={UserIcon} style={styles.menuIcon}/></View>
                        {(this.props.currentMenu === MENU_TYPES.PERFIL) && <View style={styles.menuActive}/>}
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


function mapStateToProps(state, props) {
    return {
        currentMenu: state.AuthReducer.currentMenu,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clickMenu: (type) => dispatch(authActions.clickMenu(type)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSection);
