import {StyleSheet} from 'react-native';
import {widthPercentage as wp, heightPercentage as hp} from '../util';

module.exports = StyleSheet.create({

    container: {},

    contentWrapper: {
        backgroundColor: '#ffffff',
    },
    mainInfoWrapper: {
        paddingLeft: wp(18),
        paddingRight: wp(18),
        paddingTop: hp(39),
        paddingBottom: hp(34),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    avatarBox: {
        alignItems: 'center',
        paddingLeft: wp(25),
        paddingRight: wp(18),
    },
    userAvatar: {
        width: hp(97),
        height: hp(97),
        borderRadius: hp(97 / 2)
    },
    mainInfoBox: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: wp(12),
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameView: {
        marginBottom: hp(13)
    },
    nameTxt: {
        color: "#3D3D3D",
        fontSize: hp(23),
        fontFamily: "Raleway-Medium",
    },
    otherView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: hp(12),
        paddingBottom: hp(11),
        paddingRight: wp(12),
        paddingLeft: wp(18),
        shadowOpacity: 0.16,
        shadowRadius: hp(6),
        shadowColor: '#000000',
        shadowOffset: {height: hp(3), width: 0},
        elevation: 4,
        backgroundColor: '#F8F8F8',
        borderRadius: hp(19),
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp(193)
    },
    otherViewBox: {
        flexDirection: 'row',
        marginRight: wp(12),
        alignItems: 'center',
    },
    otherTxts: {
        color: "#3D3D3D",
        fontSize: hp(11),
        fontFamily: "Raleway-Medium",
        marginLeft: wp(5)
    },
    iconPoint: {
        width: hp(8),
        height: hp(12),
    },
    iconLocation: {
        width: hp(9),
        height: hp(12),
    },
    userMetaWrapper: {
        backgroundColor: '#F8F8F8',
        paddingLeft: wp(18),
        paddingRight: wp(18),
        paddingTop: hp(22),
        paddingBottom: hp(84),
        justifyContent: 'center',
    },
    pointWrapper: {
        alignSelf: 'center',
        flexDirection: 'row',
        width: wp(270),
    },
    pointBox: {
        width: wp(74),
    },
    pointStep: {
        color: "#3D3D3D",
        fontSize: hp(10),
        fontFamily: "Roboto-Regular",
        opacity: 0.5,
        marginBottom: hp(3),
        alignSelf: 'center',
    },
    pointLevelBox: {
        width: wp(74),
        height: hp(19),
        justifyContent: 'center',
    },
    pointLevel: {
        color: "#3D3D3D",
        fontSize: hp(10),
        fontFamily: "Roboto-Regular",
        opacity: 0.5,
        alignSelf: 'center',
    },
    marginRight8: {
        marginRight: wp(8)
    },
    marginLeft8: {
        marginLeft: wp(8)
    },
    marginLeftM8: {
        marginLeft: wp(-8)
    },
    aboutView: {
        width: wp(289),
        marginTop: hp(25),
        alignSelf: 'center',
        paddingLeft: wp(10),
        paddingRight: wp(10)
    },
    resiAddress: {
        color: "#3D3D3D",
        fontSize: hp(12),
        fontFamily: "Roboto-Regular",
    },
    groupView: {
        alignSelf: 'center',
        marginTop: hp(21),
        width: wp(289),
        paddingLeft: wp(10),
        paddingRight: wp(10),
    },
    groupViewRow: {
        flexDirection: 'row',
        marginTop: hp(12)
    },
    groupViewLeft: {
        color: "#3D3D3D",
        fontSize: hp(12),
        fontFamily: "Roboto-Regular",
        width: wp(57),
    },
    groupViewRight: {
        marginLeft: wp(8),
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    userGroupBtn: {
        backgroundColor: '#02C8A7',
        borderRadius: hp(20),
        width: wp(117),
        height: hp(30),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(7),
    },
    userGroupBtnTxt: {
        color: "#3D3D3D",
        fontSize: hp(11),
        fontFamily: "Raleway-Regular",
        opacity: 0.4
    },
    inviteWrapper: {
        width: wp(289),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(5)
    },
    inviteBtn: {
        backgroundColor: '#02C8A7',
        borderRadius: hp(20),
        width: wp(117),
        height: hp(30),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(17),
    },
    inviteBtnTxt: {
        color: "#3D3D3D",
        fontSize: wp(11),
        fontFamily: "Raleway-Regular",
        opacity: 0.4,
    },
    earnByInvite: {
        color: "#3D3D3D",
        fontSize: hp(11),
        fontFamily: "Raleway-Regular",
        opacity: 0.4,
    },

    btnBottomWrapper: {
        flexDirection: 'row',
        width: wp(279),
        marginTop: hp(28),
        alignSelf: 'center'
    },
    btnBottom: {
        flex: 1,
        backgroundColor: '#02C8A7',
        alignItems: 'center',
        justifyContent: 'center',
        height: hp(30),
        borderRadius: hp(20),
        marginRight: wp(12),
    },
    btnBottomTxt: {
        color: "#3D3D3D",
        fontSize: hp(11),
        fontFamily: "Raleway-Regular",
        opacity: 0.4
    }
});
