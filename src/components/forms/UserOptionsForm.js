import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, TouchableOpacity, View} from 'react-native';
import infoStyles from '../../styles/auth/userOptions'
import cloneDeep from "lodash/cloneDeep";

class UserOptionsForm extends Component {

    constructor(props) {
        super(props);

        this.userOptionsData = [
            'Carregador Iphone',
            'Carregador Padrão',
            'Impressora',
            'Carregador Notebook',
            'Fone de Ouvido',
            'Máquina de Lavar',
            'Vassoura',
            'Rodo',
            'Balde',
            'Microondas',
            'Fogão',
            'Forno',
            'Vaga Garagem',
            'Geladeira',
            'Colchonete',
            'Varal',
            'Mochila',
            'Liquidificador',
            'Batedeira',
            'Mesa',
            'Cadeira',
            'WiFi',
            'Guarda-Chuva',
            'Mala',
            'Aspirador',
            'Ventilador',
            'Bola de Futebol',
        ]
        this.state = {
            user_options: [],
            isLoading: false,
        };
    }

    componentDidMount(): void {
        const {userOptions} = this.props;
        if (userOptions){
            this.setState({ user_options: userOptions });
        }
    }

    _onSelectOption = (option) => {
        let userOptions = cloneDeep(this.state.user_options);
        const index = userOptions.indexOf(option);

        if (index > -1) {
            userOptions.splice(index, 1);
        } else {
            userOptions.push(option);
        }
        this.props.onChange({user_options : userOptions});
        this.setState({ user_options: userOptions });
    }

    render() {
        const {user_options: userOptions} = this.state;
        const optionItems = this.userOptionsData.map((optionItem, i) => {
            const optionItemStyle = userOptions.indexOf(optionItem) > -1 ? [infoStyles.optionTxt, infoStyles.optionTxtActive] : infoStyles.optionTxt;
            return <TouchableOpacity
                style={infoStyles.optionItem}
                onPress={() => this._onSelectOption(optionItem)}
                key={i}>
                <Text style={optionItemStyle}>{optionItem}</Text>
            </TouchableOpacity>
        });
        return (
            <View style={infoStyles.formWrapper}>
                <View style={infoStyles.formContainer}>
                    <Text style={infoStyles.descTxt}>
                        Selecione abaixo pelo menos 3 coisas que você possui em casa.
                    </Text>
                    <Text style={infoStyles.descTxt}>
                        Quando alguém precisar você pode negociar um preço pelo tempo de uso ou compartilhar gratuitamente.
                    </Text>
                    <Text style={infoStyles.descTxt}>
                        Lembre-se: Em algum momento você também pode precisar :)
                    </Text>
                    <View style={infoStyles.optionsWrapper}>
                        {optionItems}
                    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserOptionsForm);
