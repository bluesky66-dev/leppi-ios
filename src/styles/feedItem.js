import {StyleSheet} from 'react-native';
import {widthPercentage as wp, heightPercentage as hp} from '../util';

module.exports = StyleSheet.create({
    contentWrapper: {
        flexDirection: 'row',
        backgroundColor: '#E8E8E8',
        shadowOpacity: 0.16,
        shadowRadius: hp(6),
        shadowColor: '#000000',
        shadowOffset: {height: hp(3), width: 0},
        elevation: 6,
        marginBottom: hp(10)
    },
	iconDot: {
        position: "absolute",
        top: hp(7),
        right: wp(15),
        width: hp(22),
        height: hp(22),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    iconDotStyle: {
        width: hp(22),
        height: hp(22),
        resizeMode: 'contain',
    },
    feedBadge: {
        width: 7,
        shadowOpacity: 0.16,
        shadowRadius: hp(2),
        shadowColor: '#000000',
        shadowOffset: {height: 0, width: hp(2)},
        elevation: 6,
    },
    feedBadgeRed: {
        backgroundColor: '#F63341',
    },
    feedBadgeBlue: {
        backgroundColor: '#1C5596',
    },
    feedContent: {
        flex: 1,
        flexDirection: 'row',
    },
    imageBox: {
        width: wp(103),
        alignItems: 'center',
        justifyContent: 'center',
    },
    thumbnail: {
        width: hp(75),
        height: hp(75),
        borderRadius: hp(75/2),
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    thumbImage: {
        width: hp(69),
        height: hp(69),
        borderRadius: hp(69/2),
    },
    descWrapper: {
        flex: 1,
        paddingLeft: wp(7),
        paddingRight: wp(12),
        paddingTop: hp(17),
        paddingBottom: hp(15),
        flexDirection: 'column',
    },
    titleView:{
        marginBottom: hp(10),
    },
    catTxt: {
        color: "#3D3D3D",
        fontSize: hp(10),
        fontFamily: "Raleway-Medium",
        marginBottom: hp(2),
    },
    titleTxt: {
        color: "#3D3D3D",
        fontSize: hp(14),
        fontFamily: "Raleway-Bold",
        fontWeight: 'bold',
    },
    dateView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(10)
    },
    iconDate: {
        width: hp(10),
        height: hp(10),
        marginRight: wp(4)
    },
    dateTxt: {
        color: "#3D3D3D",
        fontSize: hp(10),
        fontFamily: "Raleway-Medium",
    },
    otherView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    otherViewBox:{
        flexDirection: 'row',
        marginRight: wp(12),
        alignItems: 'center',
    },
    otherTxts:{
        color: "#3D3D3D",
        fontSize: hp(10),
        fontFamily: "Raleway-Medium",
        marginLeft: wp(5)
    },
    iconProfile: {
        width: hp(9),
        height: hp(10),
    },
    iconPoint: {
        width: hp(6),
        height: hp(10),
    },
    iconLocation: {
        width: hp(7),
        height: hp(10),
    },
});
