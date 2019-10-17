import {StyleSheet} from 'react-native';
import {widthPercentage as wp} from '../util';

module.exports = StyleSheet.create({
    contentWrapper: {
        flexDirection: 'row',
        backgroundColor: '#E8E8E8',
        shadowOpacity: 0.16,
        shadowRadius: wp(6),
        shadowColor: '#000000',
        shadowOffset: {height: wp(3), width: 0},
        elevation: 6,
        marginBottom: wp(10)
    },
    feedBadge: {
        width: wp(7),
        shadowOpacity: 0.16,
        shadowRadius: wp(2),
        shadowColor: '#000000',
        shadowOffset: {height: 0, width: wp(2)},
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
        width: wp(75),
        height: wp(75),
        borderRadius: wp(75/2),
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    thumbImage: {
        width: wp(69),
        height: wp(69),
        borderRadius: wp(69/2),
    },
    descWrapper: {
        flex: 1,
        paddingLeft: wp(7),
        paddingRight: wp(12),
        paddingTop: wp(17),
        paddingBottom: wp(15),
        flexDirection: 'column',
    },
    titleView:{
        marginBottom: wp(10),
    },
    catTxt: {
        color: "#3D3D3D",
        fontSize: wp(10),
        fontFamily: "Raleway-Medium",
        marginBottom: wp(2),
    },
    titleTxt: {
        color: "#3D3D3D",
        fontSize: wp(14),
        fontFamily: "Raleway-Bold",
        fontWeight: 'bold',
    },
    dateView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: wp(10)
    },
    iconDate: {
        width: wp(10),
        height: wp(10),
        marginRight: wp(4)
    },
    dateTxt: {
        color: "#3D3D3D",
        fontSize: wp(10),
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
        fontSize: wp(10),
        fontFamily: "Raleway-Medium",
        marginLeft: wp(5)
    },
    iconProfile: {
        width: wp(9),
        height: wp(10),
    },
    iconPoint: {
        width: wp(6),
        height: wp(10),
    },
    iconLocation: {
        width: wp(7),
        height: wp(10),
    },
});
