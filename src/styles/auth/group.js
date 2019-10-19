import {StyleSheet} from 'react-native';
import {widthPercentage as wp, heightPercentage as hp} from '../../util';


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
        paddingTop: hp(33),
        paddingBottom: hp(51),
        zIndex: 5,
    },

    introText: {
        alignSelf: "center",
        width: wp(222),
        textAlign: "center",
        fontFamily: "Raleway-Bold",
        fontSize: hp(14),
        color: "#FFFFFF",
    },

    introHelp: {
        position: "absolute",
        right: wp(13.6),
        top: hp(33),
        fontFamily: "Raleway-Bold",
        textAlign: "center",
        fontSize: hp(15),
        color: "#3D3D3D",
        width: wp(20),
        height: hp(20),
        backgroundColor: "#FFFFFF",
        borderRadius: hp(10),
    },

    joinBoxWrapper: {
        width: wp(329),
        height: hp(129),
    },

    marginBottom19: {
        marginBottom: hp(19),
    },
    joinBoxContainer: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: hp(25),
        backgroundColor: "#03BB9C",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: hp(36),
        paddingLeft: wp(30),
        paddingBottom: hp(29),
        paddingRight: wp(30),
    },

    iconWrapper: {
        width: hp(63),
        height: hp(63),
        borderRadius: hp(31),
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
    },

    iconCreate: {
        width: hp(28),
        height: hp(28),
    },

    iconJoin: {
        width: hp(32),
        height: hp(32),
    },
    labelWrapper: {
        flex: 1,
        paddingLeft: wp(22),
    },
    labelText: {
        fontFamily: "Raleway-Bold",
        fontSize: hp(14),
        color: "#ffffff",
    },
    introWrapper1: {},
});
