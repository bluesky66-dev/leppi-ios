import {StyleSheet} from 'react-native';
import {widthPercentage as wp, heightPercentage as hp} from '../../util';
import { Dimensions } from 'react-native';
let screenWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({

    contentWrapper: {
        height: hp(300),
        backgroundColor: '#02C8A7',
    },

    headerRound: {
        position: 'absolute',
        top: hp(-73),
        left: wp(-74),
        width: wp(523),
        height: hp(373),
        zIndex: 0
    },

    backIcon: {
        position: "absolute",
        top: hp(48),
        left: wp(33),
        width: wp(22),
        height: hp(20),
        backgroundColor: 'transparent',
        zIndex: 3,
    },

    backIconStyle: {
        width: 22,
        height: 20,
        resizeMode: 'stretch',
    },

    appHeader: {
        width: '100%',
        height: hp(250),
        zIndex: 2
    },

    headerText: {
        position: 'absolute',
        alignSelf: "center",
        top: hp(22),
        fontWeight: "400",
        fontFamily: "Raleway-Bold",
        fontSize: hp(46),
        color: "#ffffff",
        textAlign: "center",
        opacity: 0.2,
    },

    logoBox: {
        position: 'absolute',
        top: hp(59),
        alignSelf: "center",
        width: hp(177),
        height: hp(148),
    },

    headerLogo: {
        alignSelf: "flex-start",
        width: hp(148),
        height: hp(148),
    },

    stepTitleWrapper: {
        flex: 1,
        zIndex: 2
    },

    stepTitle: {
        alignSelf: "center",
        fontWeight: "400",
        fontFamily: "Raleway-Bold",
        color: "#ffffff",
        fontSize: hp(17),
    },

    stepDot0: {
        display: "none"
    },

    stepDot1: {
        width: hp(14),
        height: hp(14),
        zIndex: 2,
        backgroundColor: '#ffffff',
        borderRadius: hp(7),
        left: wp(25),
        top: hp(-11),
    },

    stepDot2: {
        width: hp(14),
        height: hp(14),
        zIndex: 2,
        backgroundColor: '#ffffff',
        borderRadius: hp(7),
        left: wp(129),
        top: hp(17),
    },

    stepDot3: {
        width: hp(14),
        height: hp(14),
        zIndex: 2,
        backgroundColor: "#ffffff",
        borderRadius: hp(7),
        left: wp(234),
        top: hp(17),
    },

    stepDot4: {
        width: hp(14),
        height: hp(14),
        zIndex: 2,
        backgroundColor: "#ffffff",
        borderRadius: hp(7),
        left: wp(338),
        top: hp(-11),
    },
});
