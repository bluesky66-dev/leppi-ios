'use strict';
import React, {Component} from 'react';
import {Image, TextInput, View} from 'react-native';
import auth_styles from '../../styles/auth/auth'

export default class AuthTextInput extends Component {
    render() {
        return (
            <View style={auth_styles.authTextInput}>
                <View style={auth_styles.authInputContainer}>
                    <View style={auth_styles.inputAddOnWrapper}>
                        <Image source={this.props.inputAddOn} style={[auth_styles.inputAddOnIcon, this.props.addOnStyle]}/>
                    </View>
                    <TextInput
                        onChangeText={this.props.onChangeText}
                        placeholder={this.props.placeholder}
                        autoFocus={this.props.autoFocus}
                        style={[auth_styles.textInput, {}]}
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
