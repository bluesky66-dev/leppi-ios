import React, {Component} from 'react';
import {View} from 'react-native';
import {RegisterLocation, RegisterTextView} from '../start';
import locationStyles from '../../styles/auth/location'

export default class LocationForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            city: "",
            street: "",
            district: "",
            country: '',
            cca2: '',
            address: '',
            location: {},
        };
        this._onSelectCountry = this._onSelectCountry.bind(this);
        this._onChangeValue = this._onChangeValue.bind(this);
    }

    submit() {
        let state = this.state;
    }

    _onSelectCountry(value) {
        this.props.onChange({ cca2: value.cca2, callingCode: value.callingCode, country: value.name });
        this.setState({ cca2: value.cca2, callingCode: value.callingCode, country: value.name })
    }

    _onChangeValue(value) {
        this.props.onChange(value);
        this.setState(value);
    }

    _onAutocomplete = (detail) => {
        let state = {
            city: "",
            street: "",
            district: "",
            country: '',
            address: '',
            cca2: '',
            location: {},
        };
        if (detail.address_components) {
            state.address = detail.formatted_address;
            state.location = detail.geometry.location;
            let address_components = detail.address_components.filter(item => {
                return !item.types.includes('postal_code') && !item.types.includes('street_number')
                    && !item.types.includes('postal_code_suffix');
            });
            address_components.reverse();
            console.log('============= address_components', address_components);
            if (address_components.length > 0) {
                state.country = address_components[0].long_name;
                state.cca2 = address_components[0].short_name;
            }
            if (address_components.length > 1) {
                state.city = address_components[1].long_name;
            }
            if (address_components.length > 2) {
                state.street = address_components[2].long_name;
            }
            if (address_components.length > 3) {
                state.district = address_components[3].long_name;
            }

            console.log('======= state', state);
            this.props.onChange(state);
            this.setState(state);
        }
    }

    render() {

        return (
            <View style={locationStyles.formWrapper}>
                <View style={locationStyles.formContainer}>
                    <RegisterLocation
                        onAutoComplete={this._onAutocomplete}
                    />
                    <RegisterTextView
                        labelText={"Country"}
                        onChangeText={(text) => this._onChangeValue({country: text})}
                        placeholder={"País"}
                        autoFocus={false}
                        value={this.state.country}
                        secureTextEntry={false}
                    />
                    <RegisterTextView
                        labelText={"City"}
                        onChangeText={(text) => this._onChangeValue({city: text})}
                        placeholder={"Cidade"}
                        autoFocus={false}
                        value={this.state.city}
                        secureTextEntry={false}
                    />
                    <RegisterTextView
                        labelText={"State"}
                        onChangeText={(text) => this._onChangeValue({street: text})}
                        placeholder={"Estado"}
                        autoFocus={false}
                        value={this.state.street}
                        secureTextEntry={false}
                    />
                    <RegisterTextView
                        labelText={"District"}
                        onChangeText={(text) => this._onChangeValue({district: text})}
                        placeholder={"Bairro"}
                        autoFocus={false}
                        value={this.state.district}
                        secureTextEntry={false}
                    />
                </View>
            </View>
        );
    }
}
