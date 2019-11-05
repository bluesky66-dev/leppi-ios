import React, {Component} from "react";
import {connect} from 'react-redux';
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from '../styles/sellShareSwitchModal';
import Modal from "react-native-modal";
import IconCloseModal from "../images/close-modal.png";
import IconBookmark from "../images/library-bookmark.png";

class SellShareSwitchModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: true,
        };
    }

    componentDidMount(){
    }

    gotSell = () => {
        console.log('openSellModal');
        this.props.openSellModal();
    }
    gotSolicitation = () => {
        console.log('openSolicitaionModal')
        this.props.openSolicitaionModal();
    }

    render() {
        return (
            <Modal
                ref={'joinModal'}
                onBackdropPress={this.props.onBackdropPress}
                style={styles.container}
                isVisible={this.props.isVisible && this.state.isVisible}>
                <View style={styles.content}>
                    <Image style={styles.bookMark} source={IconBookmark}/>
                    <TouchableOpacity style={styles.btnCloseModal} activeOpacity={0.8}
                                      onPress={this.props.onBackdropPress}>
                        <Image source={IconCloseModal} style={styles.iconClose}/>
                    </TouchableOpacity>
                    <View style={styles.btnGroup}>
                        <Text style={styles.labelTxt}>Anuncie para vender ou compartilhar</Text>
                        <TouchableOpacity onPress={()=>this.gotSell()} style={styles.btnBox} activeOpacity={0.8}>
                            <Text style={styles.btnTxt}>Anunciar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnGroup}>
                        <Text style={styles.labelTxt}>Você sempre terá um vizinho para ajudar</Text>
                        <TouchableOpacity onPress={()=>this.gotSolicitation()} style={styles.btnBox} activeOpacity={0.8}>
                            <Text style={styles.btnTxt}>Solicitar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(SellShareSwitchModal);
