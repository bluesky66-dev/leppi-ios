import {StyleSheet} from 'react-native';
import {widthPercentage as wp, heightPercentage as hp} from '../util';

module.exports = StyleSheet.create({

    header: {
        backgroundColor: '#35d3b9',
        height: hp(105),
        shadowOpacity: 0.16,
        shadowRadius: hp(6),
        shadowColor: '#000000',
        shadowOffset: {height: hp(3), width: 0},
        elevation: 6,
    },

    listIcon: {
        width: hp(19),
        height: hp(15),
        position: 'absolute',
        top: hp(50),
        left: wp(33)
    },

    listIconStyle: {
        width: wp(19),
        height: hp(15),
    },

    logoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(40),
    },

    logoIcon: {
        width: hp(31),
        height: hp(31)
    },

    logoTxt: {
        color: "#ffffff",
        fontSize: hp(23),
        fontFamily: "Raleway-Bold",
        marginLeft: wp(8)
    },

    menuWrapper: {
        marginTop: hp(20),
        flexDirection: 'row',
        paddingLeft: wp(45),
        paddingRight: wp(45),
    },

    menuItem: {
        position: 'relative',
        zIndex: 3,
        height: hp(40),
        backgroundColor: '#35d3b9',
    },

    menuIcon: {
        width: wp(28),
        height: wp(28),
    },

    menuItemTxt: {
        color: "#3d3d3d",
        fontSize: hp(15),
        fontFamily: "Raleway-Bold",
    },

    marginRight46: {
        marginRight: wp(46)
    },

    marginRight48: {
        marginRight: wp(48)
    },

    marginRight50: {
        marginRight: wp(50)
    },

    menuActive: {
        position: 'relative',
        bottom: hp(-2),
        alignSelf: 'center',
        width: wp(20),
        height: hp(5),
        borderRadius: hp(3),
        backgroundColor: '#f9be02',
        zIndex: 1,
    }
});
