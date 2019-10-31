import React, {Component} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {DateInput, RegisterTextInput} from '../start';
import infoStyles from '../../styles/auth/information'
import defaultAvatar from "../../images/office-worker.png";
import plusIcon from "../../images/plus.png";
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

export default class InformationForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            whatsapp: "",
            birth_date: "",
            avatar: {
                uri: '',
                path: 'users'
            },
        };

        this._onChangeValue = this._onChangeValue.bind(this);
        this.handleChoosePhoto = this.handleChoosePhoto.bind(this);
    }

    _onChangeValue(value) {
        this.props.onChange(value);
        this.setState(value);
    }

    handleChoosePhoto = () => {
        let modalThis = this;
        const options = {
            title: 'Select Avatar',
            mediaType: 'photo',
            noData: true,
            storageOptions: {
                skipBackup: true,
            },
        };
        try {
            ImagePicker.showImagePicker(options, (response) => {
                //console.log('======= Response = ', response);
                if (response.didCancel) {
                    //console.log('======= User cancelled image picker');
                } else if (response.error) {
                    //console.log('======= ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    //console.log('======= User tapped custom button: ', response.customButton);
                } else {
                    if (response.uri) {
                        ImageResizer.createResizedImage(response.uri, 300, 300, 'JPEG', 70).then((newImage) => {
                            //console.log('newImage ===', newImage);
                            try {
                                let image: any = {};
                            image.uri = newImage.uri;
                            //console.log('image.uri', image.uri);
                            image.path = 'users';
                            modalThis.props.onChange({avatar: image});
                            modalThis.setState({avatar: image});
                            } catch (e) {
                                console.log(e.message);
                            }
                        }).catch((err) => {
                            console.log(err.message);
                        });
                    }
                }

            });
        } catch (e) {
            console.log(e.message);
        }
    };

    render() {
        //console.log('callingCode ====', this.props.callingCode);
        let whatsapp = this.state.whatsapp;
        let callingCode = this.props.callingCode ? this.props.callingCode: '55';
        if (whatsapp.length < callingCode.length){
            whatsapp = callingCode;
        }
        
        let title = "Próximo";
        let avatarSource = defaultAvatar;
        if (this.state.avatar.uri) {
            avatarSource = {uri: this.state.avatar.uri};
        }
        return (
            <View style={infoStyles.formWrapper}>
                <View style={infoStyles.avatarWrapper}>
                    <View style={infoStyles.avatarContainer}>
                        <Image style={this.state.avatar.uri ? infoStyles.realAvatar: infoStyles.defaultAvatar} source={avatarSource}/>
                    </View>
                    <TouchableOpacity style={infoStyles.plusIcon} activeOpacity={0.8} onPress={() => this.handleChoosePhoto()}>
                        <Image source={plusIcon} style={infoStyles.plusIconStyle}/>
                    </TouchableOpacity>
                </View>
                <View style={infoStyles.formContainer}>
                    <RegisterTextInput
                        labelText={"First Name"}
                        onChangeText={(text) => this._onChangeValue({first_name: text})}
                        placeholder={"Nome"}
                        autoFocus={false}
                        value={this.state.first_name}
                        secureTextEntry={false}
                    />
                    <RegisterTextInput
                        labelText={"Last Name"}
                        onChangeText={(text) => this._onChangeValue({last_name: text})}
                        placeholder={"Sobrenome"}
                        autoFocus={false}
                        value={this.state.last_name}
                        secureTextEntry={false}
                    />
                    <RegisterTextInput
                        labelText={"Whatsapp"}
                        onChangeText={(text) => this._onChangeValue({whatsapp: text})}
                        placeholder={"DDD+Numero"}
                        autoFocus={false}
                        keyboardType={'numeric'}
                        value={whatsapp}
                        secureTextEntry={false}
                    />
                    <DateInput
                        labelText={"Birth Date"}
                        onChangeText={(text) => this._onChangeValue({birth_date: text})}
                        placeholder={"Aniversário"}
                        autoFocus={false}
                        value={this.state.birth_date}
                        secureTextEntry={false}
                    />
                </View>
            </View>
        );
    }
}
