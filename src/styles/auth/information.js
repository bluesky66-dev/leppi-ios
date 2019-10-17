import {StyleSheet} from 'react-native';
import {widthPercentage as wp} from '../../util';


module.exports = StyleSheet.create({
    formWrapper: {
        marginTop: wp(31),
        flex: 1,
    },

    avatarWrapper: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: wp(30),
    },

    avatarContainer: {
        width: wp(114),
        height: wp(114),
        borderRadius: wp(54),
        borderWidth: wp(3),
        borderColor: "#ffffff",
        overflow: "hidden",
    },

    defaultAvatar: {
        position: "absolute",
        width: wp(86),
        height: wp(95),
        bottom: -4,
        left: wp(6),
    },

    realAvatar: {
        width: wp(108),
        height: wp(108),
        resizeMode: 'cover',
    },

    plusIcon: {
        position: "absolute",
        top: wp(83),
        right: wp(136),
        width: wp(38),
        height: wp(38),
        backgroundColor: 'transparent',
        zIndex: 3,
    },

    plusIconStyle: {
        width: wp(38),
        height: wp(38),
        resizeMode: "stretch",
    },

    formContainer: {
        paddingLeft: wp(42),
        paddingRight: wp(41)
    },
});
