import React, {Component} from "react";
import styles from "../../styles/auth/topBack";
import backIcon from "../../images/login_back.png";
import {Image, TouchableOpacity} from "react-native";
import {
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

export default class AppTopBack extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        lor(this);
    }

    componentWillUnmount() {
        rol();
    }

    render() {
        return (
            <TouchableOpacity style={styles.backIcon} onPress={this.props.onBackPress}>
                <Image source={backIcon} style={styles.backIconStyle}/>
            </TouchableOpacity>
        );
    }
}
