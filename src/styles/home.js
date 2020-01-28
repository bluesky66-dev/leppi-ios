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
        marginTop: hp(20),
        paddingLeft: wp(40),
        paddingRight: wp(40),
    },
    titleTxt: {
        color: "#3d3d3d",
        fontSize: hp(14),
        fontFamily: "Raleway-Bold",
    },
    titleSaleTxt: {
        letterSpacing: wp(2),
    },
    typesWrapper: {
        flexDirection: 'column',
        paddingLeft: wp(33),
        paddingRight: wp(33),
        marginTop: hp(14),
        paddingBottom: hp(15)
    },
    typesBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: wp(33),
        paddingRight: wp(15),
        marginTop: hp(14),
        paddingBottom: hp(15)
    },
    isSelected: {
        borderRadius: hp(8),
        backgroundColor: '#e2e2e2'
    },
    typeBox: {
        width: wp(90),
        marginRight: wp(15),
        height: hp(80),
        backgroundColor: '#ffffff',
        borderRadius: hp(8),
        marginBottom: hp(9),
        alignItems: 'center',
        justifyContent: 'center',
        padding: hp(5)
    },
    typeIcon: {
        width: wp(34),
        height: hp(33),
        marginBottom: hp(8)
    },
    typeTxt: {
        color: "#3d3d3d",
        fontSize: hp(10),
        fontFamily: "Rubik-Regular",
        textAlign: 'center',
    },
});
