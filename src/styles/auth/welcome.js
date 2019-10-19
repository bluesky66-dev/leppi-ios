import {StyleSheet} from 'react-native';
import {widthPercentage as wp, heightPercentage as hp} from '../../util';


module.exports = StyleSheet.create({

    container: {
        flex: 1,
        padding: 0,
        backgroundColor: "#02C8A7",
    },

    containerScroll: {
        flex: 1
    },

    backgroundImage: {
        width: wp(375),
        height: hp(812)
    },

    titleWrapper: {
        marginTop: hp(47),
    },

    titleTxt: {
        fontSize: hp(23),
        fontFamily: "Raleway-Bold",
        color: "#ffffff",
        textAlign: "center"
    },

    howToWorkWrapper: {
        flexDirection: 'row',
        paddingLeft: wp(51),
        paddingRight: wp(44),
        marginTop: hp(63),
        alignItems: 'flex-start',
    },

    howToWorkTxt: {
        fontFamily: "Raleway-Bold",
        fontSize: hp(51),
        color: "#ffffff",
        width: wp(157),
    },

    logoImage: {
        width: hp(100),
        height: hp(100),
        marginLeft: wp(22),
    },

    swiperWrapper: {
        marginTop: hp(59),
        height: hp(381),
    },

    dotStyle: {
        backgroundColor: '#00977E',
        marginLeft: wp(4),
        marginRight: wp(5),
    },

    activeDotStyle: {
        backgroundColor: '#FFFFFF',
        marginLeft: wp(4),
        marginRight: wp(5),
    },

    swiperItem: {
        flex: 1,
        paddingTop: hp(54),
        paddingLeft: wp(57),
        paddingRight: wp(33),
    },

    swiperItemTxt: {
        fontFamily: "Raleway-Bold",
        fontSize: hp(25),
        color: "#ffffff",
    },

    width205: {
        width: wp(205),
    },

    btnWrapper: {
        marginBottom: hp(49)
    },

    btnWelcome: {
        alignSelf: 'center',
        width: hp(140),
        height: hp(57),
    },

    btnContainer: {
        borderRadius: wp(31),
    },

    button: {
        width: hp(140),
        height: hp(57),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        fontFamily: "Raleway-Bold",
        fontSize: hp(20),
        color: "#ffffff",
        alignSelf: 'center',
    },
});
