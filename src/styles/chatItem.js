import {StyleSheet} from 'react-native';
import {widthPercentage as wp, heightPercentage as hp} from '../util';

module.exports = StyleSheet.create({
    contentWrapper: {
        backgroundColor: '#F8F8F8',
        marginBottom: hp(14),
        borderRadius: hp(8),
        paddingTop: hp(9),
        paddingRight: wp(10),
        paddingBottom: hp(10),
        paddingLeft: wp(14),
        position: 'relative',
    },

    feedBadge: {
        width: wp(32),
        height: hp(7),
        position: 'absolute',
        top: wp(-3.5),
        left: wp(14),
        borderRadius: hp(8),
    },

    feedBadgeRed: {
        backgroundColor: '#F63341',
    },

    feedBadgeBlue: {
        backgroundColor: '#1C5596',
    },

    chatContent: {
        flex: 1,
    },

    titleView: {
        marginBottom: hp(10),
    },

    titleTxt: {
        color: "#3D3D3D",
        fontSize: hp(14),
        fontFamily: "Raleway-Medium",
    },

    otherView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    otherViewBox: {
        flexDirection: 'row',
        marginRight: wp(12),
        alignItems: 'center',
    },

    otherTxts: {
        color: "#3D3D3D",
        fontSize: hp(10),
        fontFamily: "Raleway-Medium",
        marginLeft: wp(5)
    },

    iconProfile: {
        width: hp(9),
        height: hp(10),
    },

    iconPoint: {
        width: hp(6),
        height: hp(10),
    },

    iconLocation: {
        width: hp(7),
        height: hp(10),
    },

    lastMessageView: {
        paddingRight: wp(50),
        marginTop: hp(11),
    },

    lastMessage: {
        color: "#3D3D3D",
        fontSize: hp(10),
        fontFamily: "Raleway-Regular",
        opacity: 0.5,
    },

    dateView: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: wp(10),
        bottom: hp(10),
    },

    dateTxt: {
        color: "#3D3D3D",
        fontSize: hp(9),
        fontFamily: "Raleway-Medium",
        opacity: 0.3,
    },
});
