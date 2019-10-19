import {StyleSheet} from 'react-native';
import {widthPercentage as wp, heightPercentage as hp} from '../../util';


module.exports = StyleSheet.create({
    formWrapper: {
        marginTop: hp(86),
        flex: 1
    },

    formContainer: {
        paddingLeft: wp(42),
        paddingRight: wp(41)
    },

    afterEmail: {
        height: hp(6)
    },

    afterPassword: {
        marginTop: hp(-8)
    },
});
