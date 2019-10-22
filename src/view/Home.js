import React, {Component} from 'react';
import {listenOrientationChange as lor, removeOrientationListener as rol} from 'react-native-responsive-screen';
import {Image, ScrollView, TouchableOpacity, View, Text} from 'react-native';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import HeaderSection from '../components/HeaderSection';
import SellShareModal from '../components/SellShareModal';
import SolicitationModal from '../components/SolicitationModal';

import styles from '../styles/home';
import JoinGroupModal from "../components/JoinGroupModal";
import * as authActions from "../redux/actions/AuthActions";
import {FeedCategories} from '../redux/constants/feedConstants'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSellShare: false,
            isSolicitation: false,
            isJoinGroup: false,
            // isOpenedJoinGroup: false,
            feedCategory: '',
        };
        this._onSellShare = this._onSellShare.bind(this);
        this._onSolicitation = this._onSolicitation.bind(this);
        this._onInfoGroup = this._onInfoGroup.bind(this);
        this._onSelectFeedCat = this._onSelectFeedCat.bind(this);
    }

    async componentDidMount() {
        lor(this);
        const {navigate} = this.props.navigation;
        if (this.props.userMeta.constructor === Object && Object.keys(this.props.userMeta).length === 0) {
            await this.props.fetchingUserMeta(navigate);
        }
    }

    componentWillUnmount() {
        rol();
    }

    _onSellShare = () => {
        if (this.state.feedCategory.length <= 0) {
            Toast.show('Select a category', Toast.SHORT);
            return false;
        }
        this.setState({isSellShare: true})
    }

    _onSolicitation = () => {
        if (this.state.feedCategory.length <= 0) {
            Toast.show('Select a category', Toast.SHORT);
            return false;
        }
        this.setState({isSolicitation: true})
    }

    _onInfoGroup = () => {
        this.setState({isJoinGroup: true})
    }

    _onSelectFeedCat = (feedCategory) => {
        this.setState({feedCategory: feedCategory});
    }

    render() {
        let feedCats = FeedCategories;

        let typeBoxList = feedCats.map((feedCatInfo, i) => {
            let boxStyle = [styles.typeBox];
            if (feedCatInfo.name === this.state.feedCategory){
                boxStyle = [styles.typeBox, styles.isSelected];
            }
            return (
                <TouchableOpacity style={boxStyle} activeOpacity={0.5} key={i} onPress={()=>this._onSelectFeedCat(feedCatInfo.name)}>
                    <Image source={feedCatInfo.icon} style={styles.typeIcon} resizeMode={'contain'}/>
                    <Text style={styles.typeTxt}>{feedCatInfo.name}</Text>
                </TouchableOpacity>
            )
        });

        let joinedGroup = {};
        if (this.props.joinedGroup) {
            joinedGroup = this.props.joinedGroup;
        }
        return (
            <View style={styles.rootWrapper}>
                <Spinner
                    visible={this.props.isLoading}
                    textContent={''}
                    textStyle={{color: '#FFF'}}
                />
                <View style={styles.container}>
                    <HeaderSection navigation={this.props.navigation}/>
                    <ScrollView style={styles.contentWrapper}>
                        <View style={styles.groupInfo}>
                            <Text style={styles.groupInfoTxt}>
                                Você está no grupo <Text style={[styles.groupInfoTxt, {fontWeight: "bold"}]}>{joinedGroup.group_name?joinedGroup.group_name:''}</Text>. Código de Acesso <Text style={[styles.groupInfoTxt, {fontWeight: "bold"}]}>{joinedGroup.group_code?joinedGroup.group_code:''}</Text>. {"\n"}Convide seus vizinhos!
                            </Text>
                        </View>
                        <TouchableOpacity onPress={()=>this._onInfoGroup()} style={styles.btnInfoGroup} activeOpacity={0.8}>
                            <Text style={styles.btnInfoGroupTxt}>Informações do Grupo</Text>
                        </TouchableOpacity>
                        <View style={styles.titleWrapper}>
                            <Text style={styles.titleTxt}>Clique em uma das opções e depois escolha Anunciar ou Solicitar!</Text>
                        </View>
                        <View style={styles.typesWrapper}>
                            {typeBoxList}
                        </View>
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity style={[styles.sellButton]} onPress={()=>this._onSellShare()}>
                                <View style={styles.buttonOut}>
                                    <View style={[styles.buttonIn, styles.buttonInRed]}>
                                        <Text style={styles.buttonTxt}>Anunciar</Text>
                                    </View>
                                </View>
                                <View style={[styles.btnBadge, styles.badgeRed]}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.solicitationButton]} onPress={()=>this._onSolicitation()}>
                                <View style={styles.buttonOut}>
                                    <View style={[styles.buttonIn, styles.buttonInBlue]}>
                                        <Text style={styles.buttonTxt}>Solicitar</Text>
                                    </View>
                                </View>
                                <View style={[styles.btnBadge, styles.badgeBlue]}/>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    <SellShareModal
                        navigation={this.props.navigation}
                        isVisible={this.state.isSellShare}
                        feedCategory={this.state.feedCategory}
                        onBackdropPress={()=>this.setState({isSellShare: false})}/>
                    <SolicitationModal
                        navigation={this.props.navigation}
                        feedCategory={this.state.feedCategory}
                        isVisible={this.state.isSolicitation}
                        onBackdropPress={()=>this.setState({isSolicitation: false})}/>
                    <JoinGroupModal
                        isVisible={this.state.isJoinGroup}
                        groupInfo={joinedGroup}
                        isVisibleJoinButton={false}
                        onBackdropPress={()=>this.setState({isJoinGroup: false})}/>
                </View>
            </View>
        );
    }
}


function mapStateToProps(state, props) {
    return {
        userId: state.AuthReducer.userId,
        userMeta: state.AuthReducer.userMeta,
        joinedGroup: state.AuthReducer.joinedGroup,
        isSignuped: state.AuthReducer.isSignuped,
        isJoinedGroup: state.AuthReducer.isJoinedGroup,
        isLoading: state.AuthReducer.isLoading,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchingUserMeta: (navigate) => dispatch(authActions.fetchingUserMeta(navigate)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
