'use strict';
import React, {Component} from 'react';
import {View} from 'react-native';
import auth_styles from '../../styles/auth/auth'
import GooglePlacesAutocomplete from '../GooglePlacesAutocomplete';
import * as config from "../../config/config";
import {connect} from "react-redux";


class RegisterLocation extends Component {

    render() {
        return (
            <View style={auth_styles.registerTextInputBox}>
                <View style={auth_styles.registerInputContainer}>
                    {/*<View style={auth_styles.registerAddOn}>*/}
                    {/*    <Text style={[auth_styles.registerAddOnTxt]}>{this.props.labelText}</Text>*/}
                    {/*</View>*/}
                    <GooglePlacesAutocomplete
                        placeholder='Digite sua Rua'
                        autoFocus={false}
                        fetchDetails={true}
                        onPress={(data, details = null) => {
                            this.props.onAutoComplete(details);
                        }}
                        getDefaultValue={() => {
                            return '';
                        }}
                        query={{
                            key: config.GOOGLE_MAP_KEY,
                            // language: 'en',
                            // location: this.props.currentLocation.latitude + ',' + this.props.currentLocation.longitude,
                            // radius: 100 * 1000,
                            // strictbounds: ''
                        }}
                    />
                </View>
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        currentLocation: state.AuthReducer.currentLocation,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterLocation)
