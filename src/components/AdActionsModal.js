import React, {Component} from "react";
import {connect} from 'react-redux';
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from '../styles/adActionsModal';
import Modal from "react-native-modal";
import IconCloseModal from "../images/close-modal.png";
import IconBookmark from "../images/library-bookmark.png";

class AdActionsModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: true,
        };
    }

    componentDidMount(){
    }

    render() {
        return (
            <Modal
                ref={'joinModal'}
                onBackdropPress={this.props.onBackdropPress}
                style={styles.container}
                isVisible={this.props.isVisible && this.state.isVisible}>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.btnCloseModal} activeOpacity={0.8}
                                      onPress={this.props.onBackdropPress}>
                        <Image source={IconCloseModal} style={styles.iconClose}/>
                    </TouchableOpacity>
                    <View style={styles.btnGroup}>
                        <TouchableOpacity onPress={()=>this.props.onEdit()} style={styles.btnBox} activeOpacity={0.8}>
                            <Text style={styles.btnTxt}>Editar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnGroup}>
                        <TouchableOpacity onPress={()=>this.props.onDelete()} style={styles.btnBox} activeOpacity={0.8}>
                            <Text style={styles.btnTxt}>Excluir</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdActionsModal);
