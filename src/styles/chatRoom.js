import {StyleSheet} from 'react-native';
import {widthPercentage as wp} from '../util';

module.exports = StyleSheet.create({

    container: {
    },

    contentWrapper: {
        backgroundColor: '#FFFFFF',
        paddingLeft: wp(15),
        paddingRight: wp(15),
    },

    otherView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: wp(22),
        paddingTop: wp(14),
        paddingRight: wp(21),
        paddingBottom: wp(12),
        paddingLeft: wp(21),
        marginLeft: wp(28),
        marginRight: wp(27),
        backgroundColor: '#F8F8F8',
        borderRadius: wp(19),
    },

    otherViewBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: wp(7)
    },

    otherTxts: {
        color: "#3D3D3D",
        fontSize: wp(12),
        fontFamily: "Raleway-Medium",
        marginLeft: wp(7)
    },

    iconProfile: {
        width: wp(11),
        height: wp(13),
    },

    iconPoint: {
        width: wp(8),
        height: wp(12),
    },

    iconLocation: {
        width: wp(9),
        height: wp(13),
    },

    height22: {
        height:wp(22),
    },
    height104: {
        height:wp(104),
    },

    chatBtnBox: {
        height: wp(77),
        width: '100%',
        backgroundColor: '#EDEDED',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
    },

    chatInput: {
        width: wp(226),
        height: wp(47),
        color: "#3D3D3D",
        fontSize: wp(12),
        fontFamily: "Raleway-Medium",
        paddingTop: wp(17),
        paddingBottom: wp(16),
        paddingLeft: wp(24),
        paddingRight: wp(5),
        borderBottomLeftRadius: wp(30),
        borderTopLeftRadius: wp(30),
        backgroundColor: '#ffffff'
    },
    btnAttach: {
        backgroundColor: '#ffffff'
    },
    paperClipBox: {
        width: wp(32),
        height: wp(47),
        justifyContent: 'center',
        marginRight: wp(10),
        backgroundColor: '#ffffff'
    },
    iconPaperClip: {
        width: wp(32),
        height: wp(32),
    },
    btnSendMsg: {
        backgroundColor: '#ffffff',
        borderTopRightRadius: wp(24),
        borderBottomRightRadius: wp(24),
    },
    btnSendMsgBox: {
        width: wp(80),
        height: wp(47),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: wp(14),
        borderTopLeftRadius: wp(14),
        borderTopRightRadius: wp(24),
        borderBottomRightRadius: wp(24),
        backgroundColor: '#02C8A7'
    },
    btnSendTxt: {
        color: "#3D3D3D",
        fontSize: wp(12),
        fontFamily: "Raleway-Medium",
        opacity: 0.7
    }
});
