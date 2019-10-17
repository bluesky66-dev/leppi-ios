import {StyleSheet} from 'react-native';
import {widthPercentage as wp} from '../../util';

module.exports = StyleSheet.create({
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
});
