import {StyleSheet} from 'react-native';
import {widthPercentage as wp} from '../util';

module.exports = StyleSheet.create({

    header: {
        backgroundColor: '#35d3b9',
        height: wp(135),
        shadowOpacity: 0.16,
        shadowRadius: wp(6),
        shadowColor: '#000000',
        shadowOffset: {height: wp(3), width: 0},
        elevation: 6,
    },

    listIcon: {
        width: wp(19),
        height: wp(15),
        position: 'absolute',
        top: wp(50),
        left: wp(33)
    },

    listIconStyle: {
        width: wp(19),
        height: wp(15),
    },

    logoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: wp(40),
    },

    logoIcon: {
        width: wp(31),
        height: wp(31)
    },

    logoTxt: {
        color: "#ffffff",
        fontSize: wp(23),
        fontFamily: "Raleway-Bold",
        marginLeft: wp(8)
    },

    menuWrapper: {
        marginTop: wp(35),
        flexDirection: 'row',
        paddingLeft: wp(45),
        paddingRight: wp(45),
    },

    menuItem: {
        position: 'relative',
        zIndex: 3,
        height: wp(26),
        backgroundColor: '#35d3b9',
    },

    menuItemTxt: {
        color: "#3d3d3d",
        fontSize: wp(15),
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
        top: wp(-2),
        alignSelf: 'center',
        width: wp(20),
        height: wp(5),
        borderRadius: wp(3),
        backgroundColor: '#f9be02',
        zIndex: 1,
    }
});
