import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Toast from 'react-native-simple-toast';
import {AuthTextInput, LoginButton} from '../start';
import styles from '../../styles/auth/auth'
import closedLock from "../../images/closed-lock.png";
import mailIcon from "../../images/mail.png";
import * as EmailValidator from 'email-validator';

export default class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        };
        this.submit = this.submit.bind(this);
    }

    submit() {
        let state = this.state;

        if (state.email.length <= 0) {
            Toast.show('Enter email address!', Toast.SHORT);
            return false;
        }

        if (!EmailValidator.validate(this.state.email)) {
            Toast.show('Invalid email address!', Toast.SHORT);
            return false;
        }

        if (state.password.length <= 0) {
            Toast.show('Enter your password!', Toast.SHORT);
            return false;
        }

        let data = {
            email: state.email,
            password: state.password,
        };

        this.props.onPress(data);
    }

    setEmail(email) {
        this.setState({email: email})
    }


    render() {
        const {navigate} = this.props.navigation;

        let title = "Leppi";
        if (this.props.login) title = "Login";

        return (
            <View style={styles.authFormWrapper}>
                <View style={styles.authFormContainer}>
                    <AuthTextInput
                        inputAddOn={mailIcon}
                        addOnStyle={styles.iconMail}
                        onChangeText={(text) => this.setEmail(text)}
                        placeholder={"Email Address"}
                        autoFocus={false}
                        value={this.state.email}
                        secureTextEntry={false}
                    />
                    <AuthTextInput
                        inputAddOn={closedLock}
                        addOnStyle={styles.iconClosedLock}
                        onChangeText={(text) => this.setState({password: text})}
                        placeholder={"Password"}
                        autoFocus={false}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                    <Text style={[styles.forgotText]} onPress={() => navigate('Password')}>{"Forgot Password"}</Text>
                    <View style={styles.loginBtnWrapper}>
                        <LoginButton style={styles.loginBtn} onPress={()=>this.submit()} btnText={title}/>
                    </View>
                </View>
            </View>
        );
    }
}
