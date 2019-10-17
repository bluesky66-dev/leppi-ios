import {StyleSheet} from 'react-native';
import {widthPercentage as wp} from '../util';

module.exports = StyleSheet.create({
    contentWrapper: {
        backgroundColor: '#F8F8F8',
        marginBottom: wp(14),
        borderRadius: wp(8),
        paddingTop: wp(9),
        paddingRight: wp(10),
        paddingBottom: wp(10),
        paddingLeft: wp(14),
        position: 'relative',
    },

    feedBadge: {
        width: wp(32),
        height: wp(7),
        position: 'absolute',
        top: wp(-3.5),
        left: wp(14),
        borderRadius: wp(8),
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
        marginBottom: wp(10),
    },

    titleTxt: {
        color: "#3D3D3D",
        fontSize: wp(14),
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
        fontSize: wp(10),
        fontFamily: "Raleway-Medium",
        marginLeft: wp(5)
    },

    iconProfile: {
        width: wp(9),
        height: wp(10),
    },

    iconPoint: {
        width: wp(6),
        height: wp(10),
    },

    iconLocation: {
        width: wp(7),
        height: wp(10),
    },

    lastMessageView: {
        paddingRight: wp(50),
        marginTop: wp(11),
    },

    lastMessage: {
        color: "#3D3D3D",
        fontSize: wp(10),
        fontFamily: "Raleway-Regular",
        opacity: 0.5,
    },

    dateView: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: wp(10),
        bottom: wp(10),
    },

    dateTxt: {
        color: "#3D3D3D",
        fontSize: wp(9),
        fontFamily: "Raleway-Medium",
        opacity: 0.3,
    },
});
