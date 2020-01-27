import {StyleSheet} from 'react-native';
import {widthPercentage as wp, heightPercentage as hp} from '../../util';


module.exports = StyleSheet.create({
    formWrapper: {
        marginTop: hp(56),
        flex: 1,
    },
    formContainer: {
        paddingLeft: wp(42),
        paddingRight: wp(41)
    },
    descInput: {
        marginTop: hp(1)
    },
});
