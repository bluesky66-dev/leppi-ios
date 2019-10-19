import {StyleSheet} from 'react-native';
import {widthPercentage as wp, heightPercentage as hp} from '../../util';


module.exports = StyleSheet.create({
    formWrapper: {
        marginTop: hp(31),
        flex: 1,
    },

    avatarWrapper: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: hp(30),
    },

    avatarContainer: {
        width: hp(114),
        height: hp(114),
        borderRadius: hp(54),
        borderWidth: 3,
        borderColor: "#ffffff",
        overflow: "hidden",
    },

    defaultAvatar: {
        position: "absolute",
        width: hp(86),
        height: hp(95),
        bottom: hp(-4),
        left: hp(6),
    },

    realAvatar: {
        width: hp(108),
        height: hp(108),
        resizeMode: 'cover',
    },

    plusIcon: {
        position: "absolute",
        top: hp(83),
        right: wp(156),
        width: hp(38),
        height: hp(38),
        backgroundColor: 'transparent',
        zIndex: 3,
    },

    plusIconStyle: {
        width: hp(38),
        height: hp(38),
        resizeMode: "stretch",
    },

    formContainer: {
        paddingLeft: wp(42),
        paddingRight: wp(41)
    },
});
