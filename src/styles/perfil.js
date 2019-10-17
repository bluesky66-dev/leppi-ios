import {StyleSheet} from 'react-native';
import {widthPercentage as wp} from '../util';

module.exports = StyleSheet.create({

    container: {},

    contentWrapper: {
        backgroundColor: '#ffffff',
    },
    mainInfoWrapper: {
        paddingLeft: wp(18),
        paddingRight: wp(18),
        paddingTop: wp(39),
        paddingBottom: wp(34),
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
        width: wp(97),
        height: wp(97),
        borderRadius: wp(97 / 2)
    },
    mainInfoBox: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: wp(12),
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameView: {
        marginBottom: wp(13)
    },
    nameTxt: {
        color: "#3D3D3D",
        fontSize: wp(23),
        fontFamily: "Raleway-Medium",
    },
    otherView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: wp(12),
        paddingBottom: wp(11),
        paddingRight: wp(12),
        paddingLeft: wp(18),
        shadowOpacity: 0.16,
        shadowRadius: wp(6),
        shadowColor: '#000000',
        shadowOffset: {height: wp(3), width: 0},
        elevation: 4,
        backgroundColor: '#F8F8F8',
        borderRadius: wp(19),
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
        fontSize: wp(11),
        fontFamily: "Raleway-Medium",
        marginLeft: wp(5)
    },
    iconPoint: {
        width: wp(8),
        height: wp(12),
    },
    iconLocation: {
        width: wp(9),
        height: wp(12),
    },
    userMetaWrapper: {
        backgroundColor: '#F8F8F8',
        paddingLeft: wp(18),
        paddingRight: wp(18),
        paddingTop: wp(22),
        paddingBottom: wp(84),
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
        fontSize: wp(10),
        fontFamily: "Roboto-Regular",
        opacity: 0.5,
        marginBottom: wp(3),
        alignSelf: 'center',
    },
    pointLevelBox: {
        width: wp(74),
        height: wp(19),
        justifyContent: 'center',
    },
    pointLevel: {
        color: "#3D3D3D",
        fontSize: wp(10),
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
        marginTop: wp(25),
        alignSelf: 'center',
        paddingLeft: wp(10),
        paddingRight: wp(10)
    },
    resiAddress: {
        color: "#3D3D3D",
        fontSize: wp(12),
        fontFamily: "Roboto-Regular",
    },
    groupView: {
        alignSelf: 'center',
        marginTop: wp(21),
        width: wp(289),
        paddingLeft: wp(10),
        paddingRight: wp(10),
    },
    groupViewRow: {
        flexDirection: 'row',
        marginTop: wp(12)
    },
    groupViewLeft: {
        color: "#3D3D3D",
        fontSize: wp(12),
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
        borderRadius: wp(20),
        width: wp(117),
        height: wp(30),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: wp(7),
    },
    userGroupBtnTxt: {
        color: "#3D3D3D",
        fontSize: wp(11),
        fontFamily: "Raleway-Regular",
        opacity: 0.4
    },
    inviteWrapper: {
        width: wp(289),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: wp(5)
    },
    inviteBtn: {
        backgroundColor: '#02C8A7',
        borderRadius: wp(20),
        width: wp(117),
        height: wp(30),
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
        fontSize: wp(11),
        fontFamily: "Raleway-Regular",
        opacity: 0.4,
    },

    btnBottomWrapper: {
        flexDirection: 'row',
        width: wp(279),
        marginTop: wp(28),
        alignSelf: 'center'
    },
    btnBottom: {
        flex: 1,
        backgroundColor: '#02C8A7',
        alignItems: 'center',
        justifyContent: 'center',
        height: wp(30),
        borderRadius: wp(20),
        marginRight: wp(12),
    },
    btnBottomTxt: {
        color: "#3D3D3D",
        fontSize: wp(11),
        fontFamily: "Raleway-Regular",
        opacity: 0.4
    }
});
