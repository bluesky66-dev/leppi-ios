'use strict';
import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import auth_styles from '../../styles/auth/auth'
import DownChevron from '../../images/down-chevron.png'

export default class SelectInput extends Component {
    render() {
        return (
            <View style={auth_styles.registerTextInputBox}>
                <View style={auth_styles.registerInputContainer}>
                    <View style={auth_styles.registerAddOn}>
                        <Text style={[auth_styles.registerAddOnTxt]}>{this.props.labelText}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={this.props.onPress}
                        style={[auth_styles.selectInput, {}]}>
                        <Text  style={[auth_styles.selectInputTxt, this.props.value ? {}: {opacity: 0.5}]}>
                            {this.props.value ? this.props.value: this.props.placeholder}
                        </Text>
                        <Image source={DownChevron} style={auth_styles.downChevron}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
