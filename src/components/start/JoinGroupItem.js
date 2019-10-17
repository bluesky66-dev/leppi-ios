'use strict';
import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import auth_styles from '../../styles/auth/auth'

export default class JoinGroupItem extends Component {
    render() {
        return (
            <View style={auth_styles.joinTextInputBox}>
                <View style={auth_styles.joinInputContainer}>
                    <View style={[auth_styles.joinGroupTitle, {}]}>
                        <Text style={[auth_styles.groupTitleTxt, {}]}>{this.props.value}</Text>
                    </View>
                    <TouchableOpacity style={auth_styles.joinAddOn} activeOpacity={0.8} onPress={this.props.onPress}>
                        <Text style={[auth_styles.joinAddOnTxt]}>{this.props.labelText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
