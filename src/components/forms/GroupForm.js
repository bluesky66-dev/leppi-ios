import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import groupStyles from '../../styles/auth/group'
import groupPlus from "../../images/group-plus.png";
import groupJoin from "../../images/group-join.png";

export default class GroupForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            confirm_pass: "",
        };
    }

    render() {
        return (
            <View style={groupStyles.formWrapper}>
                <View style={groupStyles.formContainer}>
                    <View style={groupStyles.introWrapper}>
                        <Text style={[groupStyles.introText]}>Procure um grupo próximo de você. Caso não exista, crie e compartilhe.</Text>
                        <Text style={groupStyles.introHelp}>?</Text>
                    </View>
                    <TouchableOpacity activeOpacity={1} style={[groupStyles.joinBoxWrapper, groupStyles.marginBottom19]} onPress={this.props.toJoinGroup}>
                        <View style={groupStyles.joinBoxContainer}>
                            <View style={groupStyles.iconWrapper}>
                                <Image style={groupStyles.iconJoin} source={groupJoin}/>
                            </View>
                            <View style={groupStyles.labelWrapper}>
                                <Text style={groupStyles.labelText}>Entrar em Grupo</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={groupStyles.joinBoxWrapper} onPress={this.props.toCreateGroup}>
                        <View style={groupStyles.joinBoxContainer}>
                            <View style={groupStyles.iconWrapper}>
                                <Image style={groupStyles.iconCreate} source={groupPlus}/>
                            </View>
                            <View style={groupStyles.labelWrapper}>
                                <Text style={groupStyles.labelText}>Criar Grupo</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
