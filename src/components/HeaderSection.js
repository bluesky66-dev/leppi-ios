import React, {Component} from "react";
import {connect} from 'react-redux';
import {Image, TouchableOpacity, View} from "react-native";
import {Actions} from "react-native-router-flux";
import styles from '../styles/header';
import logoIcon from "../images/monkey.png";
import {Text} from "native-base";
import * as authActions from "../redux/actions/AuthActions";
import {MENU_TYPES} from "../redux/constants/menuTypes";

class HeaderSection extends Component {

    constructor(props) {
        super(props);
        this._onPressMenu = this._onPressMenu.bind(this);
    }

    _onPressList() {
    }

    _onPressMenu(type) {
        this.props.clickMenu(type);
        if (this.props.currentMenu === type && this.props.currentMenu !== MENU_TYPES.CHAT) {
            return false;
        }
        switch (type) {
            case MENU_TYPES.HOME:
                Actions.home();
                break;
            case MENU_TYPES.FEED:
                Actions.feed();
                break;
            case MENU_TYPES.CHAT:
                Actions.chat();
                break;
            case MENU_TYPES.PERFIL:
                Actions.perfil();
                break;
            default:
                Actions.home();
                break;
        }
    }

    render() {
        return (
            <View style={styles.header}>
                <View style={styles.logoWrapper}>
                    <Image source={logoIcon} style={styles.logoIcon}/>
                    <Text style={styles.logoTxt}>Leppi</Text>
                </View>
                <View style={styles.menuWrapper}>
                    <TouchableOpacity style={[styles.marginRight46]} onPress={()=>this._onPressMenu(MENU_TYPES.HOME)}>
                        <View style={styles.menuItem}><Text style={styles.menuItemTxt}>Home</Text></View>
                        {(this.props.currentMenu === MENU_TYPES.HOME) && <View style={styles.menuActive}/>}
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.marginRight48]} onPress={()=>this._onPressMenu(MENU_TYPES.FEED)}>
                        <View style={styles.menuItem}><Text style={styles.menuItemTxt}>Feed</Text></View>
                        {(this.props.currentMenu === MENU_TYPES.FEED) && <View style={styles.menuActive}/>}
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.marginRight50]} onPress={()=>this._onPressMenu(MENU_TYPES.CHAT)}>
                        <View style={styles.menuItem}><Text style={styles.menuItemTxt}>Chat</Text></View>
                        {(this.props.currentMenu === MENU_TYPES.CHAT) && <View style={styles.menuActive}/>}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this._onPressMenu(MENU_TYPES.PERFIL)}>
                        <View style={styles.menuItem}><Text style={styles.menuItemTxt}>Perfil</Text></View>
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
