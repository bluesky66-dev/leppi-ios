import {StyleSheet} from 'react-native';
import {widthPercentage as wp} from '../../util';
import { Dimensions } from 'react-native';
let screenWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({

    contentWrapper: {
        flex: 1,
        backgroundColor: '#02C8A7',
        paddingBottom: wp(13),
    },

    backIcon: {
        position: "absolute",
        top: wp(48),
        left: wp(33),
        width: wp(22),
        height: wp(20),
        backgroundColor: 'transparent',
        zIndex: 3,
    },

    backIconStyle: {
        width: wp(22),
        height: wp(20),
        resizeMode: 'stretch',
    },

    appHeader: {
        width: '100%',
        height: wp(250),
        backgroundColor: '#35d3b9',
        zIndex: 2
    },

    headerRound: {
        position: 'absolute',
        top: wp(-75),
        width: wp(375),
        height: wp(375),
        backgroundColor: '#35d3b9',
        borderRadius: wp(188),
        transform: [
            {scaleX: 1.5}
        ],
        zIndex: 1
    },

    headerText: {
        position: 'absolute',
        alignSelf: "center",
        top: wp(22),
        fontWeight: "400",
        fontFamily: "Raleway-Bold",
        fontSize: wp(46),
        color: "#ffffff",
        textAlign: "center",
        opacity: 0.2,
    },

    logoBox: {
        position: 'absolute',
        top: wp(59),
        alignSelf: "center",
        width: wp(177),
        height: wp(148),
    },

    headerLogo: {
        alignSelf: "flex-start",
        width: wp(148),
        height: wp(148),
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
        fontSize: wp(17),
    },

    stepDot0: {
        display: "none"
    },

    stepDot1: {
        width: wp(14),
        height: wp(14),
        zIndex: 2,
        backgroundColor: '#ffffff',
        borderRadius: wp(7),
        left: wp(25),
        top: wp(-11),
    },

    stepDot2: {
        width: wp(14),
        height: wp(14),
        zIndex: 2,
        backgroundColor: '#ffffff',
        borderRadius: wp(7),
        left: wp(129),
        top: wp(17),
    },

    stepDot3: {
        width: wp(14),
        height: wp(14),
        zIndex: 2,
        backgroundColor: "#ffffff",
        borderRadius: wp(7),
        left: wp(234),
        top: wp(17),
    },

    stepDot4: {
        width: wp(14),
        height: wp(14),
        zIndex: 2,
        backgroundColor: "#ffffff",
        borderRadius: wp(7),
        left: wp(338),
        top: wp(-11),
    },
});
