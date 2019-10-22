import React, {Component} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {JoinGroupItem} from '../start';
import joinGroupStyles from '../../styles/auth/joinGroup'
import nextIcon from "../../images/right-chevron.png";
import prevIcon from "../../images/left-chevron.png";
import Swiper from '../../components/swiper';
import JoinGroupModal from '../JoinGroupModal';
import * as authActions from "../../redux/actions/AuthActions";
import {connect} from "react-redux";

class JoinGroup extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            isJoinGroup: false,
            joinGroupInfo: {},
            groupList: [],
            groupSwiperLength: 0,
            swipe_index: "",
            swipe_length: 0,
        };
        this._onPrevPress = this._onPrevPress.bind(this);
        this._onNextPress = this._onNextPress.bind(this);
        this._onMomentumScrollEnd = this._onMomentumScrollEnd.bind(this);
        this._onJoinGroup = this._onJoinGroup.bind(this);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        let mainThis = this;
        if (this.props.userMeta && Object.keys(this.props.userMeta).length !== 0 && this.props.userMeta.constructor === Object) {
            this.props.setLoadingSpinner(true);
            console.log('========= fetchingGroups call');
            authActions.fetchingGroups(this.props.groupId, this.props.userMeta, groupList => {
                console.log('========= fetchingGroups callback', groupList);
                mainThis.props.setLoadingSpinner(false);
                if (groupList !== null) {
                    let groupSwiperLength = 0;
                    if (groupList.length > 0) {
                        let groupLength = groupList.length;
                        if (groupLength % 5 === 0) {
                            groupSwiperLength = (groupLength / 5) - 1;
                        } else {
                            groupSwiperLength = Math.floor(groupLength / 5);
                        }
                    }
                    if (this._isMounted) {
                        mainThis.setState({ groupList: groupList, groupSwiperLength: groupSwiperLength });
                    }
                }
            });
        }
    }

    _onMomentumScrollEnd = (e, state, context) => {
        this.setState({ swipe_index: state.index });
    }

    _onPrevPress = () => {
        if (this.state.swipe_index > 0) {
            this.refs.swiper.scrollBy(-1);
        }
    }

    _onNextPress = () => {
        if (this.state.swipe_index < this.state.groupSwiperLength) {
            this.refs.swiper.scrollBy(1);
        }
    }

    _onJoinGroup = (group) => {
        console.log('===== _onJoinGroup');
        this.setState({ isJoinGroup: true, joinGroupInfo: group });
    }

    _toCreateGroupLink = () => {
        console.log('===== _toCreateGroupLink 1');
        this.props.toCreateGroup();
    }

    render() {
        let groupSwiper = <View />;
        if (this.state.groupList.length > 0) {
            let groupCount = 0;
            let swiperItems = [];
            let ItemGroups = [];
            this.state.groupList.map((group, i) => {
                groupCount++;
                ItemGroups.push(<JoinGroupItem key={i}
                    onPress={() => this._onJoinGroup(group)}
                    labelText={"Info & Join"}
                    value={group.group_name} />);
                if (groupCount % 5 === 0) {
                    swiperItems.push(<View style={joinGroupStyles.formContainer} key={i}>
                        {ItemGroups}
                    </View>);
                    ItemGroups = [];
                }
            });
            if (ItemGroups.length > 0) {
                swiperItems.push(<ScrollView style={joinGroupStyles.formContainer} key={this.state.groupSwiperLength + 1}>
                    {ItemGroups}
                </ScrollView>);
            }
            groupSwiper = <Swiper ref={'swiper'}
                scrollEnabled={true}
                showsPagination={true}
                onMomentumScrollEnd={this._onMomentumScrollEnd}
                dotStyle={joinGroupStyles.dotStyle}
                activeDotStyle={joinGroupStyles.activeDotStyle}
                loop={false} style={joinGroupStyles.swiperWrapper}>
                {swiperItems}
            </Swiper>;
        }
        return (
            <View style={joinGroupStyles.formWrapper}>
                <View style={joinGroupStyles.topTitleWrapper}>
                    <Text style={[joinGroupStyles.topTitleTxt]}>Grupos próximos do seu Endereço</Text>
                </View>
                {groupSwiper}
                {
                    this.state.groupList.length === 0 &&
                    <View style={joinGroupStyles.otherCaseView}>
                        <Text style={joinGroupStyles.otherCaseTxt}>Não encontrou um grupo do seu bairro ou condomínio? Crie agora!</Text>
                        <TouchableOpacity style={joinGroupStyles.toCreateGroupLink} onPress={() => this._toCreateGroupLink()}
                            activeOpacity={0.5}>
                            <Text style={joinGroupStyles.toCreateGroupLinkTxt}>Criar um grupo agora!</Text>
                        </TouchableOpacity>
                    </View>
                }
                <TouchableOpacity style={joinGroupStyles.prevIcon} onPress={this._onPrevPress}>
                    <Image source={prevIcon} style={joinGroupStyles.prevIconStyle} />
                </TouchableOpacity>
                <TouchableOpacity style={joinGroupStyles.nextIcon} onPress={this._onNextPress}>
                    <Image source={nextIcon} style={joinGroupStyles.nextIconStyle} />
                </TouchableOpacity>
                <JoinGroupModal
                    isVisible={this.state.isJoinGroup}
                    groupInfo={this.state.joinGroupInfo}
                    onJoinGroup={this.props.onJoinGroup}
                    onBackdropPress={() => this.setState({ isJoinGroup: false })}
                />
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        userId: state.AuthReducer.userId,
        groupId: state.AuthReducer.groupId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoadingSpinner: (loading) => dispatch(authActions.setLoadingSpinner(loading)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinGroup)
