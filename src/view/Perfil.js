import React, {Component} from 'react';
import {listenOrientationChange as lor, removeOrientationListener as rol} from 'react-native-responsive-screen';
import {Image, ImageBackground, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import HeaderSection from '../components/HeaderSection';
import UserAvatar from "../images/user-avatar.png";
import IconIdea from "../images/idea.png";
import IconMarker from "../images/maps-and-flags.png";
import PointNormal1 from "../images/normal1.png";
import PointNormal1a from "../images/normal1a.png";
import PointNormal2 from "../images/normal2.png";
import PointNormal2a from "../images/normal2a.png";
import PointExcellent1 from "../images/excellent1.png";
import PointExcellent1a from "../images/excellent1a.png";
import PointExcellent2 from "../images/excellent2.png";
import PointExcellent2a from "../images/excellent2a.png";

import styles from '../styles/perfil';
import * as authActions from "../redux/actions/AuthActions";

class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_about: '',
        };
    }

    componentDidMount() {
        lor(this);
    }

    componentWillUnmount() {
        rol();
    }

    async _onInvite() {
    }



    async _onLogout() {
        await this.props.fetchLogout();
    }


    render() {

        let avatarUrl = UserAvatar;
        if (this.props.userMeta.avatarUrl) {
            avatarUrl = { uri: this.props.userMeta.avatarUrl };
        }
        let score = 0;
        if (this.props.userMeta.points) {
            score = this.props.userMeta.points;
        }

        return (
            <View style={styles.rootWrapper}>
                <Spinner
                    visible={this.props.isLoading}
                    textContent={''}
                    textStyle={{ color: '#FFF' }}
                />
                <View style={styles.container}>
                    <HeaderSection navigation={this.props.navigation}/>
                    <ScrollView style={styles.contentWrapper}>
                        <View style={styles.mainInfoWrapper}>
                            <View style={styles.avatarBox}>
                                <Image source={avatarUrl} style={styles.userAvatar} />
                            </View>
                            <View style={styles.mainInfoBox}>
                                <View style={styles.nameView}>
                                    <Text style={styles.nameTxt}>
                                        {`${this.props.userMeta.first_name ? this.props.userMeta.first_name : ''} ${this.props.userMeta.last_name ? this.props.userMeta.last_name : ''}`}
                                    </Text>
                                </View>
                                <View style={styles.otherView}>
                                    <View style={styles.otherViewBox}>
                                        <Image source={IconIdea} style={styles.iconPoint} />
                                        <Text style={styles.otherTxts}>{score} points</Text>
                                    </View>
                                    <View style={styles.otherViewBox}>
                                        <Image source={IconMarker} style={styles.iconLocation} />
                                        <Text style={styles.otherTxts}>{this.props.userMeta.district ? this.props.userMeta.district : ''}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.userMetaWrapper}>
                            <View style={styles.pointWrapper}>
                                <View style={styles.pointBox}>
                                    <Text style={[styles.pointStep, styles.marginRight8]}>0-100</Text>
                                    <ImageBackground style={styles.pointLevelBox}
                                        source={(score >= 0 && score <= 100) ? PointNormal1a : PointNormal1}>
                                        <Text style={[styles.pointLevel, styles.marginRight8]}>Normal</Text>
                                    </ImageBackground>
                                </View>
                                <View style={[styles.pointBox, styles.marginLeftM8]}>
                                    <Text style={[styles.pointStep, styles.marginLeft8]}>101-500</Text>
                                    <ImageBackground style={styles.pointLevelBox}
                                        source={(score >= 101 && score <= 500) ? PointNormal2a : PointNormal2}>
                                        {/*<Text style={[styles.pointLevel]}>Normal</Text>*/}
                                    </ImageBackground>
                                </View>
                                <View style={[styles.pointBox, styles.marginLeftM8]}>
                                    <Text style={[styles.pointStep, styles.marginLeft8]}>501-1000</Text>
                                    <ImageBackground style={styles.pointLevelBox}
                                        source={(score >= 501 && score <= 1000) ? PointExcellent1a : PointExcellent1}>
                                        {/*<Text style={[styles.pointLevel]}>Normal</Text>*/}
                                    </ImageBackground>
                                </View>
                                <View style={[styles.pointBox, styles.marginLeftM8]}>
                                    <Text style={[styles.pointStep, styles.marginLeft8]}>1001+</Text>
                                    <ImageBackground style={styles.pointLevelBox}
                                        source={(score >= 1001) ? PointExcellent2a : PointExcellent2}>
                                        <Text style={[styles.pointLevel, styles.marginLeft8]}>Excellent</Text>
                                    </ImageBackground>
                                </View>
                            </View>
                            <View style={styles. addressView}>
                                <View style={styles. addressViewRow}>
                                    <Text style={styles. addressViewLeft}>Seu Endereço: </Text>
                                    <Text style={styles. addressViewRight}>
                                        {`${this.props.userMeta.address ? this.props.userMeta.address + '' : ''}`}
                                    </Text>
                                </View>
                                {/*<View style={styles.inviteWrapper}>*/}
                                {/*    <TouchableOpacity style={styles.inviteBtn} onPress={() => this._onInvite()}>*/}
                                {/*        <Text style={styles.inviteBtnTxt}>Convidar vizinho</Text>*/}
                                {/*    </TouchableOpacity>*/}
                                {/*</View>*/}
                            </View>
                            <View style={styles.btnBottomWrapper}>
                                {/*<TouchableOpacity style={styles.btnBottom} onPress={() => ()}>*/}
                                {/*    <Text style={styles.btnBottomTxt}>Mudar de Grupo</Text>*/}
                                {/*</TouchableOpacity>*/}
                                <TouchableOpacity style={[styles.btnBottom, { marginRight: 0 }]} onPress={() => this._onLogout()}>
                                    <Text style={styles.btnBottomTxt}>Logout</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        userId: state.AuthReducer.userId,
        userMeta: state.AuthReducer.userMeta,
        isLoading: Boolean(state.AuthReducer.isLoading),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clickMenu: (type) => dispatch(authActions.clickMenu(type)),
        fetchLogout: () => dispatch(authActions.fetchLogout()),
        setLoadingSpinner: (loading) => dispatch(authActions.setLoadingSpinner(loading)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);
