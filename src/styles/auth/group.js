import {StyleSheet} from 'react-native';
import {widthPercentage as wp} from '../../util';


module.exports = StyleSheet.create({
    formWrapper: {
        flex: 1
    },

    formContainer: {
        paddingLeft: wp(23),
        paddingRight: wp(23)
    },

    introWrapper: {
        position: "relative",
        alignItems: "center",
        paddingTop: wp(33),
        paddingBottom: wp(51),
        zIndex: 5,
    },

    introText: {
        alignSelf: "center",
        width: wp(222),
        textAlign: "center",
        fontFamily: "Raleway-Bold",
        fontSize: wp(14),
        color: "#FFFFFF",
    },

    introHelp: {
        position: "absolute",
        right: wp(13.6),
        top: wp(33),
        fontFamily: "Raleway-Bold",
        textAlign: "center",
        fontSize: wp(15),
        color: "#3D3D3D",
        width: wp(20),
        height: wp(20),
        backgroundColor: "#FFFFFF",
        borderRadius: wp(10),
    },

    joinBoxWrapper: {
        width: wp(329),
        height: wp(129),
    },

    marginBottom19: {
        marginBottom: wp(19),
    },
    joinBoxContainer: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: wp(25),
        backgroundColor: "#03BB9C",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: wp(36),
        paddingLeft: wp(30),
        paddingBottom: wp(29),
        paddingRight: wp(30),
    },

    iconWrapper: {
        width: wp(63),
        height: wp(63),
        borderRadius: wp(31),
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
    },

    iconCreate: {
        width: wp(28),
        height: wp(28),
    },

    iconJoin: {
        width: wp(32),
        height: wp(32),
    },
    labelWrapper: {
        flex: 1,
        paddingLeft: wp(22),
    },
    labelText: {
        fontFamily: "Raleway-Bold",
        fontSize: wp(14),
        color: "#ffffff",
    },
    introWrapper1: {},
});
