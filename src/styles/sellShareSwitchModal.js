import {Dimensions, StyleSheet} from 'react-native';
import {widthPercentage as wp, heightPercentage as hp} from '../util';

module.exports = StyleSheet.create({
    container: {
        marginLeft: wp(23),
        marginRight: wp(23),
    },
    content: {
        backgroundColor: '#FFFFFF',
        paddingLeft: hp(23),
        paddingRight: hp(23),
        borderRadius: hp(25),
        paddingTop: hp(45),
        paddingBottom: hp(30)
    },
    bookMark: {
        height: hp(30.8),
        width: hp(20),
        position: 'absolute',
        right: wp(76),
        top: 0,
    },
    btnCloseModal: {
        position: 'absolute',
        top: hp(23.7),
        right: wp(20.1)
    },
    iconClose: {
        width: hp(14),
        height: hp(14),
    },
    btnGroup: {
        marginTop: hp(12),
    },

    labelTxt: {
        color: "#3D3D3D",
        fontSize: hp(14),
        fontFamily: "Raleway-Medium",
    },

    btnBox: {
        marginTop: hp(12),
        width: wp(300),
        alignSelf: 'center',
        backgroundColor: '#35d3b9',
        alignItems: 'center',
        justifyContent: 'center',
        height: hp(38),
        borderRadius: hp(35)
    },

    btnTxt: {
        color: "#ffffff",
        fontSize: hp(14),
        fontFamily: "Raleway-SemiBold",
    },
});
