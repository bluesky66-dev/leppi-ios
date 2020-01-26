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

    async _onEditOption() {
        const {navigate} = this.props.navigation;
        navigate('EditOptions');
    }

    changeLocation () {
        const {navigate} = this.props.navigation;
        navigate('EditLocation');
    }

    render() {
        const {userMeta} = this.props;

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
                {this.props.isLoading && <Spinner
                    visible={this.props.isLoading}
                    textContent={''}
                    textStyle={{color: '#FFF'}}
                />}
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
                                        <Image source={IconMarker} style={styles.iconLocation} />
                                        <Text style={styles.otherTxts}>{this.props.userMeta.district ? this.props.userMeta.district : ''}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.userMetaWrapper}>
                            <View style={styles.professionView}>
                                <Text style={styles.professionTxt}>Profissão:  <Text style={styles.professionTxtBold}>{userMeta.profession}</Text></Text>
                                <Text style={styles.professionDesc}>{userMeta.profession_desc}</Text>
                            </View>
                            <View style={styles.professionView}>
                                <Text style={styles.professionTxt}>Como posso ajudar meus vizinhos:</Text>
                                <Text style={styles.professionTxtBold}>{userMeta.user_options ? userMeta.user_options.join(", "): ''}</Text>
                            </View>
                            <View style={styles.addressView}>
                                <View style={styles.addressViewRow}>
                                    <Text style={styles.addressViewLeft}>Endereço: </Text>
                                    <Text style={styles.addressViewRight}>
                                        {`${this.props.userMeta.address ? this.props.userMeta.address + '' : ''}`}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.btnBottomWrapper}>
                                <TouchableOpacity style={styles.btnBottom} onPress={() => this.changeLocation()}>
                                    <Text style={styles.btnBottomTxt}>Mudar Endereço</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.btnBottom, { marginRight: 0 }]} onPress={() => this._onEditOption()}>
                                    <Text style={styles.btnBottomTxt}>Editar</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.btnBottomWrapper}>
                                <TouchableOpacity style={[styles.logoutBottom]} onPress={() => this._onLogout()}>
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
