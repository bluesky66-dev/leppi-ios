import React, {Component} from "react";
import {connect} from "react-redux";
import {PasswordForm} from "../../components/forms";
import styles from "../../styles/auth/auth";
import Spinner from 'react-native-loading-spinner-overlay';
import {AppTopSection} from "../../components/start";
import {ScrollView, View} from "react-native";
import {listenOrientationChange as lor, removeOrientationListener as rol} from 'react-native-responsive-screen';

class Password extends Component {
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
        var title = "Leppi";
        return (
            <View style={styles.rootWrapper}>
                <Spinner
                    visible={this.props.isLoading}
                    textContent={''}
                    textStyle={{color: '#FFF'}}
                />
                <ScrollView style={styles.rootWrapper}>
                    <AppTopSection authStep={0} onBackPress={() => {this.props.navigation.goBack()}}/>
                    <View style={styles.emptySpace}/>
                    <PasswordForm/>
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.AuthReducer.isLoading,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Password);
