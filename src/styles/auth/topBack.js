import {StyleSheet} from 'react-native';
import {widthPercentage as wp, heightPercentage as hp} from '../../util';

module.exports = StyleSheet.create({
    backIcon: {
        position: "absolute",
        top: hp(48),
        left: wp(33),
        width: hp(22),
        height: hp(20),
        backgroundColor: 'transparent',
        zIndex: 3,
    },

    backIconStyle: {
        width: hp(22),
        height: hp(20),
        resizeMode: 'stretch',
    },
});
