'use strict';
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../../styles/auth/index'

export default class LoginButton extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={styles.btnContainer}>
                <View style={[styles.button, (this.props.bordered) && styles.bordered]}>
                    <Text style={[styles.loginButtonText, (this.props.bordered) && styles.mainColor]}>
                        {this.props.btnText}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}
