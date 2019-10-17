'use strict';
import React, {Component} from 'react';
import {TextInput, View} from 'react-native';
import auth_styles from '../../styles/auth/auth'

export default class TextArea extends Component {
    render() {
        return (
            <View style={auth_styles.textAreaBox}>
                <View style={auth_styles.textAreaContainer}>
                    <TextInput
                        onChangeText={this.props.onChangeText}
                        placeholder={this.props.placeholder}
                        autoFocus={this.props.autoFocus}
                        multiline={true}
                        numberOfLines={this.props.numberOfLines}
                        style={[auth_styles.textArea, this.props.style]}
                        value={this.props.value}
                        secureTextEntry={false}
                        autoCapitalize='none'
                    />
                </View>
            </View>
        );
    }
}
