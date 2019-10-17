'use strict';
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import auth_styles from '../../styles/auth/auth'

export default class RegisterTextView extends Component {
    render() {
        return (
            <View style={auth_styles.registerTextInputBox}>
                <View style={auth_styles.registerInputContainer}>
                    <View style={auth_styles.registerAddOn}>
                        <Text style={[auth_styles.registerAddOnTxt]}>{this.props.labelText}</Text>
                    </View>
                    <View style={auth_styles.selectInput}>
                        <Text style={[auth_styles.selectInputTxt]}>{this.props.value ? this.props.value: this.props.placeholder}</Text>
                    </View>
                </View>
            </View>
        );
    }
}
