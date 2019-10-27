import React, {Component} from 'react';
import {View} from 'react-native';
import Toast from 'react-native-simple-toast';
import {AuthTextInput, LoginButton} from '../start';
import styles from '../../styles/auth/auth'
import phoneIcon from "../../images/icon-phone1.png";
import closedLock from "../../images/closed-lock.png";
import {connect} from "react-redux";
import * as authActions from "../../redux/actions/AuthActions";
import firebase from '@react-native-firebase/app';

class PasswordForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            phone_number: "",
            codeInput: "",
            confirmResult: null,
            password: "",
            confirmPassword: "",
        };
        this.submit = this.submit.bind(this);
    }

    async submit() {
        let state = this.state;
        if (!state.confirmResult) {
            if (state.phone_number.length <= 0) {
                Toast.show('Enter phone number!', Toast.SHORT);
                return false;
            }
            this.props.setLoadingSpinner(true);
            let existPhone = await authActions.checkPhoneNumber(state.phone_number);
            //console.log('====== phone_number', state.phone_number);
            if (existPhone) {
                firebase.auth().signInWithPhoneNumber('+' + state.phone_number)
                    .then(confirmResult => {
                        this.props.setLoadingSpinner(false);
                        this.setState({confirmResult})
                    })
                    .catch(error => {
                            this.props.setLoadingSpinner(false);
                            Toast.show(error.message, Toast.SHORT);
                            //console.log('====== signInWithPhoneNumber error', error.message);
                        }
                    );
            } else {
                this.props.setLoadingSpinner(false);
                Toast.show("Invalid phone number!", Toast.SHORT);
            }
        } else {
            if (state.phone_number.length <= 0) {
                Toast.show('Enter phone number!', Toast.SHORT);
                return false;
            }
            if (state.codeInput.length <= 0) {
                Toast.show('Enter code!', Toast.SHORT);
                return false;
            }
            if (state.password.length <= 7) {
                Toast.show('Use 8 characters or more for your password', Toast.SHORT);
                return false;
            }

            if (state.confirmPassword !== state.password) {
                Toast.show('Those passwords didn\'t match', Toast.SHORT);
                return false;
            }
            this.props.setLoadingSpinner(true);
            state.confirmResult.confirm(state.codeInput)
                .then((user) => {
                    user.updatePassword(state.password).then(() => {
                        firebase.auth().signOut();
                        this.props.setLoadingSpinner(false);
                        Toast.show('Updated password successfully!', Toast.SHORT);
                    }).catch((error) => {
                        //console.log(error);
                    });
                })
                .catch(error => {
                    this.props.setLoadingSpinner(false);
                    Toast.show(error.message, Toast.SHORT);
                });
        }
    }

    setPhoneNumber(phone_number) {
        this.setState({phone_number: phone_number});
    }


    render() {
        let title = "Submit";

        return (
            <View style={styles.authFormWrapper}>
                <View style={styles.authFormContainer}>
                    {(!this.state.confirmResult) && <AuthTextInput
                        inputAddOn={phoneIcon}
                        addOnStyle={styles.iconPhone}
                        onChangeText={(text) => this.setPhoneNumber(text)}
                        placeholder={"Phone number"}
                        autoFocus={false}
                        keyboardType={'numeric'}
                        value={this.state.phone_number}
                        secureTextEntry={false}
                    />}
                    {(this.state.confirmResult) && <AuthTextInput
                        inputAddOn={closedLock}
                        addOnStyle={styles.iconClosedLock}
                        onChangeText={(text) => this.setState({codeInput: text})}
                        placeholder={"Code"}
                        keyboardType={'numeric'}
                        autoFocus={false}
                        value={this.state.codeInput}
                        secureTextEntry={false}
                    />}
                    {(this.state.confirmResult) && <AuthTextInput
                        inputAddOn={closedLock}
                        addOnStyle={styles.iconClosedLock}
                        onChangeText={(text) => this.setState({password: text})}
                        placeholder={"Password"}
                        autoFocus={false}
                        value={this.state.password}
                        secureTextEntry={true}
                    />}
                    {(this.state.confirmResult) && <AuthTextInput
                        inputAddOn={closedLock}
                        addOnStyle={styles.iconClosedLock}
                        onChangeText={(text) => this.setState({confirmPassword: text})}
                        placeholder={"Again"}
                        autoFocus={false}
                        value={this.state.confirmPassword}
                        secureTextEntry={true}
                    />}
                    <View style={styles.loginBtnWrapper}>
                        <LoginButton style={styles.loginBtn} onPress={() => this.submit()} btnText={title}/>
                    </View>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.AuthReducer.isLoading,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoadingSpinner: (loading) => dispatch(authActions.setLoadingSpinner(loading))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordForm)