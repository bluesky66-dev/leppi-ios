import React, {Component} from "react";
import {connect} from 'react-redux';
import {Alert, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import Toast from 'react-native-simple-toast';
import styles from '../styles/sellModal';
import Modal from "react-native-modal";
import TextArea from "../components/start/TextArea";
import IconCloseModal from "../images/close-modal.png";
import IconPlus from "../images/add-image.png";
import IconLoader from "../images/white-loader.gif";
import * as authActions from "../redux/actions/AuthActions";
import {FeedTypes} from "../redux/constants/feedConstants";
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {MENU_TYPES} from "../redux/constants/menuTypes";
import cloneDeep from 'lodash/cloneDeep';

class SellShareModal extends Component {

    constructor(props) {
        super(props);
        this.defaultTags = [
            'Venda',
            'Compartilhar',
            'Alugar',
            'Ajuda',
            'Indicação',
            'Negociar',
            'Serviços',
            'Comida',
        ];
        this.state = {
            feedId: '',
            extraTags: '',
            defaultTags: [],
            product_desc: '',
            product_price: '',
            gallery: [],
            mediaList: [],
            isLoading: false,
        };
        this._onSellShare = this._onSellShare.bind(this);
        this._onAddImage = this._onAddImage.bind(this);
        this._onRemoveImage = this._onRemoveImage.bind(this);
    }
	
	componentDidMount() {
        if (this.props.isEditAd) {
            let feedInfo = this.props.feedInfo;
            this.setState({
                feedId: feedInfo.feedId,
                extraTags: feedInfo.extraTags,
                defaultTags: feedInfo.defaultTags,
                product_desc: feedInfo.product_desc,
                product_price: feedInfo.product_price,
                gallery: feedInfo.gallery,
            })
            if (feedInfo && feedInfo.gallery && Array.isArray(feedInfo.gallery)) {
                // this.props.setLoadingSpinner(true);
                authActions.filterMediaList(feedInfo.gallery, mediaList => {
                    // this.props.setLoadingSpinner(false);
                    if (mediaList !== null) {
                        this.setState({ mediaList: mediaList });
                    }
                });
            }
        }
    }

    clearForm = () => {
        this.setState({
            feedId: '',
            product_desc: '',
            extraTags: '',
            defaultTags: [],
            product_price: '',
            gallery: [],
            mediaList: [],
            isLoading: false,
        });
    }

    async _onSellShare() {
        const {navigate} = this.props.navigation;

        let state = this.state;
        if (!state.product_desc || state.product_desc.length <= 0) {
            Toast.show('Enter the description', Toast.SHORT);
            return false;
        }
		  if (this.props.isEditAd) {
            let feedInfo = {
                product_desc: state.product_desc,
                extraTags: state.extraTags,
                defaultTags: state.defaultTags,
                product_price: state.product_price,
                gallery: state.gallery,
            };
            await this.props.updateFeed(state.feedId, feedInfo);
            this.clearForm();
            this.props.onBackdropPress();
            this.props.afterAction();
        } else {
			state.feed_type = FeedTypes.sell;
			state.userId = this.props.userId;
			this.props.onBackdropPress();    
			this.props.setLoadingSpinner(true);
			await this.props.createFeed(state, this.props.userMeta);
			this.props.setLoadingSpinner(false);
			this.clearForm();
        }
        this.props.fetchingFeeds(this.props.userMeta, 1);
    }

    _onRemoveImage(index) {
        let modalThis = this;
        let gallery = modalThis.state.gallery;
        let mediaList = modalThis.state.mediaList;
        Alert.alert(
            'Remove Image',
            'Are you sure you want to remove the image?',
            [
                {text: 'Cancel', onPress: () => {
                    }, style: 'cancel'},
                {text: 'OK', onPress: async () => {
                        modalThis.props.setLoadingSpinner(true);
                        await authActions.deleteFile(gallery[index]);
                        modalThis.props.setLoadingSpinner(false);

                        gallery.splice(index, 1);
                        mediaList.splice(index, 1);
                        modalThis.setState({gallery: gallery, mediaList: mediaList});
                    }},
            ],
            { cancelable: false }
        );
    }

    _onAddImage() {
        let modalThis = this;
        let gallery = modalThis.state.gallery;
        let mediaList = modalThis.state.mediaList;
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
        try {
            modalThis.props.setLoadingSpinner(true);
            ImagePicker.showImagePicker(options, (response) => {
                //console.log('======= Response = ', response);
                if (response.didCancel) {
                    // //console.log('======= User cancelled image picker');
                } else if (response.error) {
                    // //console.log('======= ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    // //console.log('======= User tapped custom button: ', response.customButton);
                } else {
                    if (typeof response.uri !== 'undefined') {
                        ImageResizer.createResizedImage(response.uri, 400, 500, 'JPEG', 70).then(async (newImage) => {
                            //console.log('newImage ===', newImage);
                            if (gallery.length >= 5) {
                                return false;
                            }
                            try {
                                const uploadPath = await authActions.uploadFile(newImage.uri, 'feeds/' + this.props.userId);
                                console.log(uploadPath);
                                modalThis.props.setLoadingSpinner(false);
                                if (uploadPath) {
                                    gallery.push(uploadPath);
                                    mediaList.push(newImage.uri);
                                    modalThis.setState({gallery: gallery, mediaList: mediaList});
                                }  
                            } catch (e) {
                                console.log(e.message);
                                modalThis.props.setLoadingSpinner(false);
                            }      
                        }).catch((err) => {
                            console.log(err.message);
                            modalThis.props.setLoadingSpinner(false);
                        });
                    } else {
                        modalThis.props.setLoadingSpinner(false);
                    }                  
                }
                modalThis.props.setLoadingSpinner(false);
            });
        } catch (e) {
            console.log(e.message);
            modalThis.props.setLoadingSpinner(false);
        }
    }

    _onSelectTag = (tag) => {
        let defaultTags = cloneDeep(this.state.defaultTags);
        const index = defaultTags.indexOf(tag);

        if (index > -1) {
            defaultTags.splice(index, 1);
        } else {
            defaultTags.push(tag);
        }
        this.setState({ defaultTags });
    }

    render() {
        let { defaultTags } = this.state;
        // console.log('defaultTags ===', defaultTags);
        let gallery = this.state.mediaList.map((image, i) => {
            return (
                <TouchableOpacity onPress={() => this._onRemoveImage(i)} style={styles.imageItem} key={i}>
                    <Image source={{uri: image}} style={styles.imageView}/>
                </TouchableOpacity>
            )
        });

        let renderDefaultTags = this.defaultTags.map((tag, i) => {
            const tagItemStyle = defaultTags.indexOf(tag) > -1 ? [styles.tagItem, styles.tagItemActive] : styles.tagItem;
            return <TouchableOpacity
                style={tagItemStyle}
                key={i}
                onPress={() => this._onSelectTag(tag)}
                activeOpacity={0.8}>
                <Text style={styles.tagItemText}>#{tag}</Text>
            </TouchableOpacity>
        });

        return (
            <Modal
                ref={'modal'}
                onBackdropPress={this.props.onBackdropPress}
                style={styles.container}
                isVisible={this.props.isVisible}>
                <View style={styles.content} behavior={'padding'}>
                    <View style={styles.feedBadge}/>
                    <TouchableOpacity style={styles.btnCloseModal} activeOpacity={0.8}
                                      onPress={() => this.props.onBackdropPress()}>
                        <Image source={IconCloseModal} style={styles.iconClose}/>
                    </TouchableOpacity>
                    <View style={styles.titleView}>
                    </View>
                    <TextArea
                        onChangeText={(text) => this.setState({product_desc: text})}
                        placeholder={'Escreva para seus vizinhos o que deseja negociar'}
                        numberOfLines={6}
                        style={styles.descInput}
                        value={this.state.product_desc}
                        autoFocus={true}
                    />
                    <Text style={styles.imageLabel}>Adicionar Imagens</Text>
                    <View style={styles.imageGallery}>
                        {gallery}
                        <TouchableOpacity onPress={() => this._onAddImage()} disabled={this.state.isLoading} style={styles.imageItem}>
                            <View style={styles.btnAddImage}>
                                {this.state.isLoading && <Image source={IconLoader} style={styles.iconPlus}/>}
                                {!this.state.isLoading && <Image source={IconPlus} style={styles.iconPlus}/>}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.priceAndQtyWrapper}>
                        <View style={styles.priceBox}>
                            <View style={styles.priceLabelView}><Text style={styles.priceLabel}>Preço (não obrigatório)</Text></View>
                            <TextInput
                                onChangeText={(text) => this.setState({product_price: text})}
                                placeholder={''}
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
                    <Text style={styles.hashTagLabel}>Selecione pelo menos uma hashtag abaixo que se enquadre à publicação</Text>
                    <View style={styles.defaultTags}>
                        {renderDefaultTags}
                    </View>
                    <TextInput
                        onChangeText={(text) => this.setState({extraTags: text})}
                        placeholder={'Adicione mais hashtags'}
                        multiline={true}
                        numberOfLines={2}
                        style={[styles.extraTags]}
                        value={this.state.extraTags}
                        autoCapitalize='none'
                    />
                    <TouchableOpacity onPress={() => this._onSellShare()} disabled={this.state.isLoading} style={styles.btnSellShare}>
                        <Text style={styles.sellShareTxt}>Publicar</Text>
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
        isLoading: state.AuthReducer.isLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createFeed: (feed, userMeta) => dispatch(authActions.createFeed(feed, userMeta)),
        clickMenu: (type) => dispatch(authActions.clickMenu(type)),
        updateFeed: (feedId, feed) => dispatch(authActions.updateFeed(feedId, feed)),
        fetchingFeeds: (userMeta, page) => dispatch(authActions.fetchingFeeds(userMeta, page)),
        setLoadingSpinner: (loading) => dispatch(authActions.setLoadingSpinner(loading))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SellShareModal);
