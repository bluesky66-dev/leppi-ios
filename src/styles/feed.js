import {StyleSheet} from 'react-native';
import {widthPercentage as wp, heightPercentage as hp} from '../util';

module.exports = StyleSheet.create({
    rootWrapper: {
        flex: 1,
    },

    container: {
        flex: 1,
    },

    contentWrapper: {
        backgroundColor: '#ffffff',
        paddingLeft: wp(23),
        paddingRight: wp(23),
    },

    height13: {
        height:hp(13),
    },

    height44: {
        height:hp(44),
    }
});
