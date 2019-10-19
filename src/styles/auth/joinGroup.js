import {StyleSheet} from 'react-native';
import {widthPercentage as wp, heightPercentage as hp} from '../../util';


module.exports = StyleSheet.create({
    formWrapper: {
        marginTop: hp(53),
        flex: 1,
        position: 'relative',
    },

    topTitleWrapper: {
        justifyContent: 'center',
    },

    topTitleTxt: {
        fontFamily: "Raleway-Medium",
        color: "#3D3D3D",
        fontSize: hp(12),
        textAlign: 'center'
    },

    swiperWrapper: {
        marginTop: hp(26),
        height: hp(274)
    },

    dotStyle: {
        backgroundColor: '#00AD90',
        width: wp(9),
        height: hp(9),
        borderRadius: hp(4.5),
        marginLeft: wp(3),
        marginRight: wp(3),
    },

    activeDotStyle: {
        backgroundColor: '#FFFFFF',
        width: wp(9),
        height: hp(9),
        borderRadius: hp(4.5),
        marginLeft: wp(3),
        marginRight: wp(3),
    },

    formContainer: {
        paddingLeft: wp(60),
        paddingRight: wp(60)
    },

    afterEmail: {
        height: hp(6)
    },

    afterPassword: {
        marginTop: hp(-8)
    },

    prevIcon: {
        position: 'absolute',
        left: 0,
        top: hp(117),
        width: wp(36),
        height: hp(79),
        backgroundColor: '#00B395',
        borderBottomRightRadius: hp(22),
        borderTopRightRadius: hp(22),
        justifyContent: 'center',
    },

    prevIconStyle: {
        width: wp(14),
        height: hp(20),
        left: wp(10),
    },

    nextIcon: {
        position: 'absolute',
        right: 0,
        top: hp(117),
        width: wp(36),
        height: hp(79),
        backgroundColor: '#00B395',
        borderTopLeftRadius: hp(22),
        borderBottomLeftRadius: hp(22),
        justifyContent: 'center',
    },

    nextIconStyle: {
        width: wp(14),
        height: hp(20),
        left: wp(11),
    },

    otherCaseView: {
        marginTop: hp(33),
        paddingLeft: wp(60),
        paddingRight: wp(60),
        justifyContent: 'center',
        marginBottom: hp(50),
    },

    otherCaseTxt: {
        textAlign: 'center',
        fontFamily: "Raleway-Bold",
        color: "#3D3D3D",
        fontSize: hp(12),
    },

    toCreateGroupLink: {
        marginTop: hp(3),
    },

    toCreateGroupLinkTxt: {
        fontFamily: "Raleway-Bold",
        color: "#ffffff",
        fontSize: hp(12),
        alignSelf: 'center',
        textDecorationLine: 'underline',
    }
});
