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
        marginTop: hp(38),
        paddingLeft: wp(54),
        paddingRight: wp(54)
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: wp(33),
        paddingRight: wp(32),
        marginTop: hp(14),
    },

    isSelected: {
        borderRadius: hp(8),
        backgroundColor: '#e2e2e2'
    },

    typeBox: {
        width: wp(103),
        marginBottom: hp(9),
        alignItems: 'center',
        justifyContent: 'center',
        padding: hp(5)
    },

    typeIcon: {
        width: hp(34),
        height: hp(33),
        marginBottom: hp(8)
    },

    typeTxt: {
        color: "#3d3d3d",
        fontSize: hp(10),
        fontFamily: "Rubik-Regular",
        textAlign: 'center',
    },

    buttonGroup: {
        marginTop: hp(60),
        paddingRight :wp(32),
        paddingLeft: wp(33),
        marginBottom: hp(62)
    },

    sellButton: {
        marginBottom: hp(18)
    },

    buttonOut: {
        width: wp(310),
        height: hp(55),
        backgroundColor: '#ffffff',
        borderRadius: hp(35),
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonIn: {
        width: wp(302),
        height: hp(49),
        borderRadius: hp(35),
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonInRed: {
        borderColor: '#f63341',
    },

    buttonInBlue: {
        borderColor: '#1c5596',
    },

    buttonTxt: {
        color: "#3d3d3d",
        fontSize: hp(18),
        fontFamily: "Raleway-Bold",
    },

    btnBadge: {
        width: wp(55),
        height: hp(17),
        borderRadius: hp(35),
        alignSelf: 'center',
        position: 'absolute',
        top: hp(-7),
    },

    badgeRed: {
        backgroundColor: '#f63341',
    },

    badgeBlue: {
        backgroundColor: '#1c5596',
    },

    solicitationButton: {},
});
