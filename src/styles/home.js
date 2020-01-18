import {StyleSheet} from 'react-native';
import {widthPercentage as wp, heightPercentage as hp} from '../util';

module.exports = StyleSheet.create({
    rootWrapper: {
        flex: 1,
    },

    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },

    contentWrapper: {
    },

    addressInfo: {
        width: wp(303),
        alignSelf: 'center',
        backgroundColor: '#e2e2e2',
        borderBottomRightRadius: hp(28),
        borderBottomLeftRadius: hp(28),
        paddingLeft: wp(14),
        paddingRight: wp(14),
        alignItems: 'center',
        paddingTop: hp(16),
        paddingBottom: hp(9),
    },

    addressInfoTxt: {
        color: "#3d3d3d",
        fontSize: hp(11),
        fontFamily: "Rubik-Regular",
        textAlign: 'center'
    },

    titleWrapper: {
        marginTop: hp(15),
    },

    titleTxt: {
        color: "#3d3d3d",
        fontSize: hp(19),
        fontFamily: "Raleway-Bold",
    },
    titleSaleTxt: {
        letterSpacing: wp(2),
    },


    typesWrapper: {
        flexDirection: 'column',
        paddingLeft: wp(16),
        paddingRight: wp(16),
        marginTop: hp(14),
        paddingBottom: hp(100)
    },
});
