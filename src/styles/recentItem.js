import {StyleSheet} from 'react-native';
import {widthPercentage as wp, heightPercentage as hp} from '../util';

module.exports = StyleSheet.create({
    recentItem: {
        width: wp(83),
        borderRadius: hp(11),
        height: hp(115),
        position: 'relative',
        marginRight: wp(11),
    },
    thumbnail: {
        borderRadius: hp(11),
        width: '100%',
        height: hp(115),
    },
    recentInfo: {
        width: '100%',
        paddingLeft: wp(6),
        paddingTop: hp(6),
        paddingBottom: hp(8),
        paddingRight: wp(8),
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#FFFFFF',
        opacity: 0.5
    },
    itemTitle: {
        color: "#3D3D3D",
        fontSize: hp(8),
        fontFamily: "Raleway-Bold",
        marginBottom: hp(1),
    },
    timeAgo: {
        color: "#3D3D3D",
        fontSize: hp(5),
        fontFamily: "Raleway-Regular",
        opacity: 0.5
    }
});
