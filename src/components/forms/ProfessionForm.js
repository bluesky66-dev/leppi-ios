import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {RegisterTextInput, TextArea} from '../start';
import infoStyles from '../../styles/auth/profession'

class ProfessionForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            profession: "",
            profession_desc: "",
            isLoading: false,
        };

        this._onChangeValue = this._onChangeValue.bind(this);
    }

    _onChangeValue(value) {
        this.props.onChange(value);
        this.setState(value);
    }

    render() {
        return (
            <View style={infoStyles.formWrapper}>
                <View style={infoStyles.formContainer}>
                    <RegisterTextInput
                        labelText={"Profissão"}
                        onChangeText={(text) => this._onChangeValue({profession: text})}
                        placeholder={""}
                        value={this.state.profession}
                        secureTextEntry={false}
                    />
                    <TextArea
                        onChangeText={(text) => this._onChangeValue({profession_desc: text})}
                        placeholder={'Se sua profissão for relevante para a comunidade você pode falar mais sobre ela'}
                        numberOfLines={10}
                        style={infoStyles.descInput}
                        value={this.state.profession_desc}
                        autoFocus={false}
                    />
                </View>
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionForm);