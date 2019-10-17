'use strict';
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../../styles/auth/index'

export default class Button extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={styles.btnContainer}>
                <View style={[styles.button, (this.props.bordered) && styles.bordered]}>
                    <Text style={[styles.buttonText, (this.props.bordered) && styles.mainColor]}>
                        {this.props.btnText}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}
