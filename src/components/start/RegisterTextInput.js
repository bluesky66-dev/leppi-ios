'use strict';
import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import auth_styles from '../../styles/auth/auth'

export default class RegisterTextInput extends Component {
    render() {
        return (
            <View style={auth_styles.registerTextInputBox}>
                <View style={auth_styles.registerInputContainer}>
                    <View style={auth_styles.registerAddOn}>
                        <Text style={[auth_styles.registerAddOnTxt]}>{this.props.labelText}</Text>
                    </View>
                    <TextInput
                        onChangeText={this.props.onChangeText}
                        placeholder={this.props.placeholder}
                        autoFocus={this.props.autoFocus}
                        style={[auth_styles.registerTextInput, {}]}
                        value={this.props.value}
                        keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
                        secureTextEntry={this.props.secureTextEntry}
                        autoCapitalize='none'
                    />
                </View>
            </View>
        );
    }
}
