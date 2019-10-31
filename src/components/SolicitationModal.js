import React, {Component} from "react";
import {connect} from 'react-redux';
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-simple-toast';
import styles from '../styles/solicitationModal';
import Modal from "react-native-modal";
import TextArea from "../components/start/TextArea";
import IconCloseModal from "../images/close-modal.png";
import * as authActions from "../redux/actions/AuthActions";
import {FeedTypes} from '../redux/constants/feedConstants'
import {MENU_TYPES} from "../redux/constants/menuTypes";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import date from "date-and-time";

class SolicitationModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product_title: '',
            product_desc: '',
            est_time: '',
            est_date: '',
            mode: 'date',
            date: new Date(),
            isDatePickerVisible: false
        };
        this._onSolicitation = this._onSolicitation.bind(this);
    }

    clearForm = () => {
        this.setState({
            product_title: '',
            product_desc: '',
            est_time: '',
            est_date: '',
            mode: 'date',
            date: new Date(),
            isDatePickerVisible: false
        });
    }

    async _onSolicitation() {
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
        state.feed_type = FeedTypes.solicitation;
        state.userId = this.props.userId;
        this.props.onBackdropPress();
        this.props.setLoadingSpinner(true);
        await this.props.createFeed(state, this.props.userMeta);
        this.props.setLoadingSpinner(false);
        this.clearForm();
        this.props.clickMenu(MENU_TYPES.FEED);
        navigate('Feed');
    }

    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
    };

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false });
    };

    handleConfirm = newDate => {
        newDate = newDate || this.state.date;
        //console.log('====== newDate', newDate);
        this.hideDatePicker();
        this.setState({date: newDate, est_date: date.format(newDate, 'MM/DD/YYYY')});
    };

    render() {
        const { isDatePickerVisible, date, mode } = this.state;
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
                    <View style={styles.estDateView}>
                        <View style={styles.estDateLabel}>
                            <Text style={styles.estDateTxt}>Data que precisa</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.showDatePicker()} style={styles.estDateInputView}>
                            <Text style={styles.estDateInput}>{this.state.est_date}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => this._onSolicitation()} disabled={this.props.isLoading} style={styles.btnSellShare}>
                        <Text style={styles.sellShareTxt}>Solicitar</Text>
                    </TouchableOpacity>
                </View>
                { isDatePickerVisible && <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode={mode}
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}/>
                }
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
        setLoadingSpinner: (loading) => dispatch(authActions.setLoadingSpinner(loading))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SolicitationModal);
