'use strict';
import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import auth_styles from '../../styles/auth/auth'
import DateTimePicker from "react-native-modal-datetime-picker";
import date from 'date-and-time';

export default class DateInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
            isDateTimePickerVisible: false
        };
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = newDate => {
        console.log('====== newDate', newDate);
        this.props.onChangeText(   date.format(newDate, 'MM/DD/YYYY'));
        this.setState({date: newDate});
        this.hideDateTimePicker();
    };

    render() {
        return (
            <View style={auth_styles.registerTextInputBox}>
                <View style={auth_styles.registerInputContainer}>
                    <View style={auth_styles.registerAddOn}>
                        <Text style={[auth_styles.registerAddOnTxt]}>{this.props.labelText}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=> this.showDateTimePicker()} style={[auth_styles.selectInput, {}]}>
                        <Text  style={[auth_styles.selectInputTxt, this.props.value ? {}: {opacity: 0.5}]}>
                            {this.props.value ? this.props.value: this.props.placeholder}
                        </Text>
                    </TouchableOpacity>
                </View>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                />
            </View>
        );
    }
}
