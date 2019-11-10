import {StyleSheet, Dimensions} from 'react-native';
import {widthPercentage as wp, heightPercentage as hp} from '../util';
let deviceHeight = Dimensions.get('window').height
module.exports = StyleSheet.create({
    rootWrapper: {
        flex: 1,
    },

    container: {
        flex: 1,
    },

    contentWrapper: {
        backgroundColor: '#FFFFFF',
        paddingLeft: wp(15),
        paddingRight: wp(15),
    },

    backIcon: {
        top: hp(20),
        left: wp(20),
        width: hp(22),
        height: hp(20),
        backgroundColor: 'transparent',
        zIndex: 3,
    },

    backIconStyle: {
        width: hp(22),
        height: hp(20),
        resizeMode: 'stretch',
    },

    otherView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: hp(22),
        paddingTop: hp(14),
        paddingRight: wp(21),
        paddingBottom: hp(12),
        paddingLeft: wp(21),
        marginLeft: wp(28),
        marginRight: wp(27),
        backgroundColor: '#F8F8F8',
        borderRadius: hp(19),
    },

    otherViewBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: wp(7)
    },

    otherTxts: {
        color: "#3D3D3D",
        fontSize: hp(12),
        fontFamily: "Raleway-Medium",
        marginLeft: wp(7)
    },

    iconProfile: {
        width: hp(11),
        height: hp(13),
    },

    iconPoint: {
        width: hp(8),
        height: hp(12),
    },

    iconLocation: {
        width: hp(9),
        height: hp(13),
    },

    height22: {
        height:hp(22),
    },
    height104: {
        height:hp(104),
    },
    msgsWrapper: {
    
    },
    chatBtnBox: {
        height: hp(77),
        width: '100%',
        backgroundColor: '#EDEDED',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
    },

    chatInput: {
        width: wp(260),
        height: hp(47),
        color: "#3D3D3D",
        fontSize: hp(12),
        fontFamily: "Raleway-Medium",
        paddingTop: hp(17),
        paddingBottom: hp(16),
        paddingLeft: wp(24),
        paddingRight: wp(5),
        borderBottomLeftRadius: hp(30),
        borderTopLeftRadius: hp(30),
        backgroundColor: '#ffffff',
        textAlignVertical: 'top',
        justifyContent: 'flex-start'
    },
    btnAttach: {
        backgroundColor: '#ffffff'
    },
    paperClipBox: {
        width: wp(32),
        height: hp(47),
        justifyContent: 'center',
        marginRight: wp(10),
        backgroundColor: '#ffffff'
    },
    iconPaperClip: {
        width: hp(32),
        height: hp(32),
    },
    btnSendMsg: {
        backgroundColor: '#ffffff',
        borderTopRightRadius: hp(24),
        borderBottomRightRadius: hp(24),
    },
    btnSendMsgBox: {
        width: wp(80),
        height: hp(47),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: hp(14),
        borderTopLeftRadius: hp(14),
        borderTopRightRadius: hp(24),
        borderBottomRightRadius: hp(24),
        backgroundColor: '#02C8A7'
    },
    btnSendTxt: {
        color: "#3D3D3D",
        fontSize: hp(12),
        fontFamily: "Raleway-Medium",
        opacity: 0.7
    }
});
