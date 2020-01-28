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
        backgroundColor: '#FFFFFF',
        paddingLeft: wp(24),
        paddingRight: wp(24),
    },

    height44: {
        height:hp(30),
    },

    height56: {
        height:hp(106),
    }
});
