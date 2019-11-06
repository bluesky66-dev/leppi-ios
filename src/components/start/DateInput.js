'use strict';
import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import auth_styles from '../../styles/auth/auth'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import date from 'date-and-time';

export default class DateInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
            mode: 'date',
            isDatePickerVisible: false
        };
    }
    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
    };

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false });
    };

    handleConfirm = newDate => {
        newDate = newDate || this.state.date;
        //console.log('====== newDate', newDate);
        this.hideDatePicker();
        this.props.onChangeText(date.format(newDate, 'MM/DD/YYYY'));
        this.setState({date: newDate});
    };

    render() {
        const { isDatePickerVisible, date, mode } = this.state;
        return (
            <View style={auth_styles.registerTextInputBox}>
                <View style={auth_styles.registerInputContainer}>
                    <View style={auth_styles.registerAddOn}>
                        <Text style={[auth_styles.registerAddOnTxt]}>{this.props.labelText}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=> this.showDatePicker()} style={[auth_styles.selectInput, {}]}>
                        <Text  style={[auth_styles.selectInputTxt, this.props.value ? {}: {opacity: 0.5}]}>
                            {this.props.value ? this.props.value: this.props.placeholder}
                        </Text>
                    </TouchableOpacity>
                </View>
                { isDatePickerVisible && <DateTimePickerModal
                    value={date}
                    isVisible={isDatePickerVisible}
                    mode={mode}
                    display="default"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}/>
                }
            </View>
        );
    }
}
