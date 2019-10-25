import React, {Component} from "react";
import {connect} from 'react-redux';
import {Alert, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import Toast from 'react-native-simple-toast';
import styles from '../styles/sellModal';
import Modal from "react-native-modal";
import TextArea from "../components/start/TextArea";
import IconCloseModal from "../images/close-modal.png";
import IconPlus from "../images/add-image.png";
import * as authActions from "../redux/actions/AuthActions";
import {FeedTypes} from "../redux/constants/feedConstants";
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {MENU_TYPES} from "../redux/constants/menuTypes";

class SellShareModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product_title: '',
            product_desc: '',
            product_qty: '',
            product_price: '',
            gallery: [],
        };
        this._onSellShare = this._onSellShare.bind(this);
        this._onAddImage = this._onAddImage.bind(this);
        this._onRemoveImage = this._onRemoveImage.bind(this);
    }

    async _onSellShare() {
        const {navigate} = this.props.navigation;

        let state = this.state;
        if (!state.product_title || state.product_title.length <= 0) {
            Toast.show('Enter the title', Toast.SHORT);
            return false;
        }
        if (!state.product_desc || state.product_desc.length <= 0) {
            Toast.show('Enter the description', Toast.SHORT);
            return false;
        }
        state.feed_category = this.props.feedCategory;
        state.feed_type = FeedTypes.sell;
        state.userId = this.props.userId;
        await this.props.createFeed(state, this.props.userMeta);
        this.refs.modal.close();
        this.props.onBackdropPress();
        this.props.clickMenu(MENU_TYPES.FEED);
        navigate('Feed');
    }

    _onRemoveImage(index) {
        let modalThis = this;
        let gallery = modalThis.state.gallery;
        Alert.alert(
            'Remove Image',
            'Are you sure you want to remove the image?',
            [
                {text: 'Cancel', onPress: () => {

                    }, style: 'cancel'},
                {text: 'OK', onPress: () => {
                        gallery.splice(index, 1);
                        modalThis.setState({gallery: gallery});
                    }},
            ],
            { cancelable: false }
        );
    }

    _onAddImage() {
        let modalThis = this;
        let gallery = modalThis.state.gallery;
        if (gallery.length >= 5) {
            Toast.show('Can only upload up to 5 photos', Toast.SHORT);
            return false;
        }
        const options = {
            title: 'Select Picture',
            mediaType: 'photo',
            noData: true,
            storageOptions: {
                skipBackup: true,
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('======= Response = ', response);
            if (response.didCancel) {
                // console.log('======= User cancelled image picker');
            } else if (response.error) {
                // console.log('======= ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                // console.log('======= User tapped custom button: ', response.customButton);
            } else {
                ImageResizer.createResizedImage(response.uri, 500, 600, 'JPEG', 70).then((newImage) => {
                    console.log('newImage ===', newImage);
                    if (gallery.length >= 5) {
                        return false;
                    }
                    gallery.push(newImage.uri);
                    modalThis.setState({gallery: gallery});
                }).catch((err) => {
                });
            }
        });
    }

    render() {
        let gallery = this.state.gallery.map((image, i) => {
            return (
                <TouchableOpacity onPress={() => this._onRemoveImage(i)} style={styles.imageItem} key={i}>
                    <Image source={{uri: image}} style={styles.imageView}/>
                </TouchableOpacity>
            )
        });
        return (
            <Modal
                ref={'modal'}
                onBackdropPress={this.props.onBackdropPress}
                style={styles.container}
                isVisible={this.props.isVisible}>
                <View style={styles.content}>
                    <View style={styles.feedBadge}/>
                    <TouchableOpacity style={styles.btnCloseModal} activeOpacity={0.8}
                                      onPress={this.props.onBackdropPress}>
                        <Image source={IconCloseModal} style={styles.iconClose}/>
                    </TouchableOpacity>
                    <View style={styles.titleView}>
                        <Text style={styles.titleTxt}>{this.props.feedCategory?this.props.feedCategory:''}</Text>
                    </View>
                    <TextInput
                        onChangeText={(text) => this.setState({product_title: text})}
                        placeholder={'Coloque um título :)'}
                        autoFocus={true}
                        style={[styles.titleInput, {}]}
                        value={this.state.product_title}
                        secureTextEntry={false}
                        autoCapitalize='none'
                    />
                    <TextArea
                        onChangeText={(text) => this.setState({product_desc: text})}
                        placeholder={'Escreva tudo o que considera relevante para seus vizinhos'}
                        numberOfLines={6}
                        style={styles.descInput}
                        value={this.state.product_desc}
                        autoFocus={false}
                    />
                    <View style={styles.priceAndQtyWrapper}>
                        <View style={styles.priceBox}>
                            <View style={styles.priceLabelView}><Text style={styles.priceLabel}>Preço (não obrigatório)</Text></View>
                            <TextInput
                                onChangeText={(text) => this.setState({product_price: text})}
                                placeholder={''}
                                autoFocus={true}
                                style={[styles.priceInput, {}]}
                                value={this.state.product_price}
                                keyboardType={'numeric'}
                                secureTextEntry={false}
                                autoCapitalize='none'
                            />
                            <View style={styles.currencyLabelView}>
                                <Text style={styles.currencyLabel}>R$</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.imageLabel}>Product Images</Text>
                    <View style={styles.imageGallery}>
                        {gallery}
                        <TouchableOpacity onPress={() => this._onAddImage()} style={styles.imageItem}>
                            <View style={styles.btnAddImage}>
                                <Image source={IconPlus} style={styles.iconPlus}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => this._onSellShare()} style={styles.btnSellShare}>
                        <Text style={styles.sellShareTxt}>Anunciar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        userId: state.AuthReducer.userId,
        userMeta: state.AuthReducer.userMeta,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createFeed: (feed, userMeta) => dispatch(authActions.createFeed(feed, userMeta)),
        clickMenu: (type) => dispatch(authActions.clickMenu(type)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SellShareModal);
