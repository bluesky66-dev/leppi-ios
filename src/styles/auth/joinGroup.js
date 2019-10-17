import {StyleSheet} from 'react-native';
import {widthPercentage as wp} from '../../util';


module.exports = StyleSheet.create({
    formWrapper: {
        marginTop: wp(53),
        flex: 1,
        position: 'relative',
    },

    topTitleWrapper: {
        justifyContent: 'center',
    },

    topTitleTxt: {
        fontFamily: "Raleway-Medium",
        color: "#3D3D3D",
        fontSize: wp(12),
        textAlign: 'center'
    },

    swiperWrapper: {
        marginTop: wp(26),
    },

    dotStyle: {
        backgroundColor: '#00AD90',
        width: wp(9),
        height: wp(9),
        borderRadius: wp(4.5),
        marginLeft: wp(3),
        marginRight: wp(3),
    },

    activeDotStyle: {
        backgroundColor: '#FFFFFF',
        width: wp(9),
        height: wp(9),
        borderRadius: wp(4.5),
        marginLeft: wp(3),
        marginRight: wp(3),
    },

    formContainer: {
        paddingLeft: wp(60),
        paddingRight: wp(60)
    },

    afterEmail: {
        height: wp(6)
    },

    afterPassword: {
        marginTop: wp(-8)
    },

    prevIcon: {
        position: 'absolute',
        left: 0,
        top: wp(117),
        width: wp(36),
        height: wp(79),
        backgroundColor: '#00B395',
        borderBottomRightRadius: wp(22),
        borderTopRightRadius: wp(22),
        justifyContent: 'center',
    },

    prevIconStyle: {
        width: wp(14),
        height: wp(20),
        left: wp(10),
    },

    nextIcon: {
        position: 'absolute',
        right: 0,
        top: wp(117),
        width: wp(36),
        height: wp(79),
        backgroundColor: '#00B395',
        borderTopLeftRadius: wp(22),
        borderBottomLeftRadius: wp(22),
        justifyContent: 'center',
    },

    nextIconStyle: {
        width: wp(14),
        height: wp(20),
        left: wp(11),
    },

    otherCaseView: {
        marginTop: wp(33),
        paddingLeft: wp(60),
        paddingRight: wp(60),
        justifyContent: 'center',
        marginBottom: wp(50),
    },

    otherCaseTxt: {
        textAlign: 'center',
        fontFamily: "Raleway-Bold",
        color: "#3D3D3D",
        fontSize: wp(12),
    },

    toCreateGroupLink: {
        marginTop: wp(3),
    },

    toCreateGroupLinkTxt: {
        fontFamily: "Raleway-Bold",
        color: "#ffffff",
        fontSize: wp(12),
        alignSelf: 'center',
        textDecorationLine: 'underline',
    }
});
