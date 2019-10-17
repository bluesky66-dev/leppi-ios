import {StyleSheet} from 'react-native';
import {widthPercentage as wp} from '../util';

module.exports = StyleSheet.create({
    recentItem: {
        width: wp(83),
        borderRadius: wp(11),
        height: wp(115),
        position: 'relative',
        marginRight: wp(11),
    },
    thumbnail: {
        borderRadius: wp(11),
        width: '100%',
        height: wp(115),
    },
    recentInfo: {
        width: '100%',
        paddingLeft: wp(6),
        paddingTop: wp(6),
        paddingBottom: wp(8),
        paddingRight: wp(8),
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#FFFFFF',
        opacity: 0.5
    },
    itemTitle: {
        color: "#3D3D3D",
        fontSize: wp(8),
        fontFamily: "Raleway-Bold",
        marginBottom: wp(1),
    },
    timeAgo: {
        color: "#3D3D3D",
        fontSize: wp(5),
        fontFamily: "Raleway-Regular",
        opacity: 0.5
    }
});
