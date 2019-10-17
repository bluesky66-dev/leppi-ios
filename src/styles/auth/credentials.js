import {StyleSheet} from 'react-native';
import {widthPercentage as wp} from '../../util';


module.exports = StyleSheet.create({
    formWrapper: {
        marginTop: wp(86),
        flex: 1
    },

    formContainer: {
        paddingLeft: wp(42),
        paddingRight: wp(41)
    },

    afterEmail: {
        height: wp(6)
    },

    afterPassword: {
        marginTop: wp(-8)
    },
});
