import {StyleSheet} from 'react-native';
import {widthPercentage as wp} from '../../util';


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
        height: wp(812)
    },

    titleWrapper: {
        marginTop: wp(47),
    },

    titleTxt: {
        fontSize: wp(23),
        fontFamily: "Raleway-Bold",
        color: "#ffffff",
        textAlign: "center"
    },

    howToWorkWrapper: {
        flexDirection: 'row',
        paddingLeft: wp(51),
        paddingRight: wp(44),
        marginTop: wp(63),
        alignItems: 'flex-start',
    },

    howToWorkTxt: {
        fontFamily: "Raleway-Bold",
        fontSize: wp(51),
        color: "#ffffff",
        width: wp(157),
    },

    logoImage: {
        width: wp(100),
        height: wp(100),
        marginLeft: wp(22),
    },

    swiperWrapper: {
        marginTop: wp(59),
        height: wp(381),
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
        paddingTop: wp(54),
        paddingLeft: wp(57),
        paddingRight: wp(33),
    },

    swiperItemTxt: {
        fontFamily: "Raleway-Bold",
        fontSize: wp(25),
        color: "#ffffff",
    },

    width205: {
        width: wp(205),
    },

    btnWrapper: {
        marginBottom: wp(49)
    },

    btnWelcome: {
        alignSelf: 'center',
        width: wp(140),
        height: wp(57),
    },

    btnContainer: {
        borderRadius: wp(31),
    },

    button: {
        width: wp(140),
        height: wp(57),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        fontFamily: "Raleway-Bold",
        fontSize: wp(20),
        color: "#ffffff",
        alignSelf: 'center',
    },
});
