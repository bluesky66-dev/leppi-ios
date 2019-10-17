import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {RegisterTextInput, TextArea, GroupAccessCode} from '../start';
import createGroupStyles from '../../styles/auth/createGroup'

export default class CreateGroup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            group_name: "",
            group_desc: "",
            group_city: "",
            group_neighborhood: "",
            group_code: "",
        };
        this._onChangeValue = this._onChangeValue.bind(this);
    }

    _onChangeValue(value) {
        this.props.onChange(value);
        this.setState(value);
    }

    render() {
        let title = "Próximo";

        return (
            <View style={createGroupStyles.formWrapper}>
                <View style={createGroupStyles.formContainer}>
                    <RegisterTextInput
                        labelText={"Nome do Grupo"}
                        onChangeText={(text) => this._onChangeValue({group_name: text})}
                        placeholder={"Nome do Grupo"}
                        autoFocus={false}
                        value={this.state.group_name}
                        secureTextEntry={false}
                    />
                    <View style={createGroupStyles.afterGroupName}/>
                    <TextArea
                        labelText={"Descrição do Grupo"}
                        onChangeText={(text) => this._onChangeValue({group_desc: text})}
                        placeholder={"Descrição do Grupo"}
                        autoFocus={false}
                        numberOfLines={4}
                        value={this.state.group_desc}
                        secureTextEntry={false}
                    />
                    <View style={createGroupStyles.afterGroupNeighborhood}/>
                    <View style={createGroupStyles.groupLabel}>
                        <Text style={[createGroupStyles.groupLabelText]}>Crie um código de 4 dígitos</Text>
                    </View>
                    <GroupAccessCode
                        labelText={"Código do Grupo"}
                        onChangeText={(text) => this._onChangeValue({group_code: text})}
                        placeholder={""}
                        autoFocus={false}
                        value={this.state.group_code}
                        secureTextEntry={false}/>
                    <View style={createGroupStyles.afterGroupAccessCode}/>
                </View>
            </View>
        );
    }
}
