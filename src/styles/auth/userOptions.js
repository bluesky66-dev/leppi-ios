import {StyleSheet} from 'react-native';
import {widthPercentage as wp, heightPercentage as hp} from '../../util';


module.exports = StyleSheet.create({
    formWrapper: {
        marginTop: hp(30),
        flex: 1,
    },
    formContainer: {
        paddingLeft: wp(42),
        paddingRight: wp(41)
    },
    descTxt: {
        color: "#ffffff",
        textAlign: 'center',
        fontSize: hp(14),
        fontFamily: "Raleway-SemiBold",
        marginBottom: hp(12)
    },
    optionsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: hp(18)
    },
    optionItem: {
        width: wp(95),
        paddingLeft: wp(3),
        paddingRight: wp(3),
        justifyContent: 'center'
    },
    optionTxt: {
        color: "#000000",
        textAlign: 'center',
        fontSize: hp(12),
        fontFamily: "Raleway-SemiBold",
        marginBottom: hp(22)
    },
    optionTxtActive: {
        color: "#ffffff",
    }
});
