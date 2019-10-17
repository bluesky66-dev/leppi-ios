'use strict';
import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import auth_styles from '../../styles/auth/auth'

export default class GroupAccessCode extends Component {
    render() {
        return (
            <View style={auth_styles.registerTextInputBox}>
                <View style={auth_styles.groupAccessCodeContainer}>
                    <View style={auth_styles.registerAddOn}>
                        <Text style={[auth_styles.registerAddOnTxt]}>{this.props.labelText}</Text>
                    </View>
                    <TextInput
                        onChangeText={this.props.onChangeText}
                        placeholder={this.props.placeholder}
                        autoFocus={this.props.autoFocus}
                        style={[auth_styles.groupAccessCode, {}]}
                        value={this.props.value}
                        maxLength= {4}
                        keyboardType={'numeric'}
                        secureTextEntry={this.props.secureTextEntry}
                        autoCapitalize='none'
                    />
                    <Text style={[auth_styles.groupCodeAddonHelpTxt]}>?</Text>
                </View>
            </View>
        );
    }
}
