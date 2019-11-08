import React, {Component} from 'react';
import {listenOrientationChange as lor, removeOrientationListener as rol} from 'react-native-responsive-screen';
import {Image, ScrollView, TouchableOpacity, View, Text} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import HeaderSection from '../components/HeaderSection';
import SellShareModal from '../components/SellShareModal';
import SolicitationModal from '../components/SolicitationModal';
import SellShareSwitchModal from "../components/SellShareSwitchModal";
import styles from '../styles/home';
import * as authActions from "../redux/actions/AuthActions";
import {FeedCategories} from '../redux/constants/feedConstants'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSellShare: false,
            isSolicitation: false,
            isSwitchModal: false,
            feedCategory: '',
        };
        this._onSellShare = this._onSellShare.bind(this);
        this._onSolicitation = this._onSolicitation.bind(this);
        this._onSelectFeedCat = this._onSelectFeedCat.bind(this);
    }

    async componentDidMount() {
        lor(this);
        const {navigate} = this.props.navigation;
        await this.props.fetchingUserMeta(navigate);
    }

    componentWillUnmount() {
        rol();
    }

    _onSellShare = () => {
        if (this.state.feedCategory.length <= 0) {
            Toast.show('Select a category', Toast.SHORT);
            return false;
        }
        this.setState({isSellShare: true, isSwitchModal: false})
    }

    _onSolicitation = () => {
        if (this.state.feedCategory.length <= 0) {
            Toast.show('Select a category', Toast.SHORT);
            return false;
        }
        this.setState({isSolicitation: true, isSwitchModal: false})
    }

    _onSelectFeedCat = (feedCategory) => {
        this.setState({feedCategory: feedCategory, isSwitchModal: true});
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

        return (
            <KeyboardAwareScrollView style={styles.rootWrapper}>
                <Spinner
                    visible={this.props.isLoading}
                    textContent={''}
                    textStyle={{color: '#FFF'}}
                />
                <View style={styles.container}>
                    <HeaderSection navigation={this.props.navigation}/>
                    <ScrollView style={styles.contentWrapper}>
                        <View style={styles.addressInfo}>
                            <Text style={styles.addressInfoTxt}>
                                Você está no {this.props.userMeta.street ? this.props.userMeta.street : ''}. Suas publicações tem um alcance de 5 km do seu endereço.
                            </Text>
                        </View>
                        <View style={styles.titleWrapper}>
                            <Text style={styles.titleTxt}>Clique em uma das opções e depois escolha Anunciar ou Solicitar!</Text>
                        </View>
                        <View style={styles.typesWrapper}>
                            {typeBoxList}
                        </View>
                    </ScrollView>
                    <View style={{height: 15}}/>
                </View>
                {this.state.isSellShare && <SellShareModal
                    navigation={this.props.navigation}
                    isVisible={this.state.isSellShare}
                    feedCategory={this.state.feedCategory}
                    onBackdropPress={()=>this.setState({isSellShare: false})}/>}
                {this.state.isSolicitation && <SolicitationModal
                    navigation={this.props.navigation}
                    feedCategory={this.state.feedCategory}
                    isVisible={this.state.isSolicitation}
                    onBackdropPress={()=>this.setState({isSolicitation: false})}/>}
                {this.state.isSwitchModal && <SellShareSwitchModal
                    isVisible={this.state.isSwitchModal}
                    openSellModal={this._onSellShare}
                    openSolicitaionModal={this._onSolicitation}
                    onBackdropPress={()=>this.setState({isSwitchModal: false})}/>}
            </KeyboardAwareScrollView>
        );
    }
}


function mapStateToProps(state, props) {
    return {
        userId: state.AuthReducer.userId,
        userMeta: state.AuthReducer.userMeta,
        isSignuped: state.AuthReducer.isSignuped,
        isLoading: state.AuthReducer.isLoading,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchingUserMeta: (navigate) => dispatch(authActions.fetchingUserMeta(navigate)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
