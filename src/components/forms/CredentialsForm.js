import React, {Component} from 'react';
import {View} from 'react-native';
import {RegisterTextInput} from '../start';
import credentialsStyles from '../../styles/auth/credentials'

export default class CredentialsForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            confirm_pass: "",
            error: {email: "", password: "", confirm_pass: ""},
        };

        this._onChangeValue = this._onChangeValue.bind(this);
    }

    submit() {
        let state = this.state;
    }

    _onChangeValue(value) {
        this.props.onChange(value);
        this.setState(value);
    }

    render() {
        let title = "Próximo";

        return (
            <View style={credentialsStyles.formWrapper}>
                <View style={credentialsStyles.formContainer}>
                    <RegisterTextInput
                        labelText={"Email"}
                        onChangeText={(text) => this._onChangeValue({email: text})}
                        placeholder={"Email"}
                        autoFocus={false}
                        value={this.state.email}
                        error={this.state.error['email']}
                        secureTextEntry={false}
                    />
                    <View style={credentialsStyles.afterEmail}/>
                    <RegisterTextInput
                        labelText={"Senha"}
                        onChangeText={(text) => this._onChangeValue({password: text})}
                        placeholder={""}
                        autoFocus={false}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                    <View style={credentialsStyles.afterPassword}/>
                    <RegisterTextInput
                        labelText={"Repetir Senha"}
                        onChangeText={(text) => this._onChangeValue({confirm_pass: text})}
                        placeholder={""}
                        autoFocus={false}
                        value={this.state.confirm_pass}
                        secureTextEntry={true}
                    />
                </View>
            </View>
        );
    }
}
