import {StyleSheet} from 'react-native';
import {widthPercentage as wp} from '../util';

module.exports = StyleSheet.create({

    container: {
        backgroundColor: '#35D3B9',
    },

    contentWrapper: {
    },

    swiperWrapper: {
        height: wp(302),
    },

    slideItem: {
        flex: 1,
        padding: 0,
        margin: 0,
    },

    slideImage: {
        width: '100%',
        height: wp(302)
    },

    dotStyle: {
        backgroundColor: '#FFFFFF',
        width: wp(9),
        height: wp(9),
        borderRadius: wp(4.5),
        marginLeft: wp(8),
        marginRight: wp(8),
        marginTop: wp(21),
        marginBottom: wp(21),
    },

    activeDotStyle: {
        backgroundColor: '#02C8A7',
        width: wp(9),
        height: wp(9),
        borderRadius: wp(4.5),
        marginLeft: wp(8),
        marginRight: wp(8),
        marginTop: wp(21),
        marginBottom: wp(21),
    },

    detailWrapper: {
        backgroundColor: '#EFEFEF',
        borderTopLeftRadius: wp(41),
        borderTopRightRadius: wp(41),
        paddingLeft: wp(43),
        paddingRight: wp(42),
        paddingBottom: wp(35),
        minHeight: wp(500),
    },

    detailRed: {
        marginTop: wp(-35),
    },

    detailBlue: {
        marginTop: wp(135),
    },

    feedBadge: {
        width: wp(70),
        height: wp(15),
        borderRadius: wp(8),
        position: 'absolute',
        left: wp(41),
        top: wp(-7),
    },

    backRed: {
        backgroundColor: '#F63341',
    },

    backBlue: {
        backgroundColor: '#1C5596',
    },

    redTxt: {
        color: '#B7000D'
    },

    blueTxt: {
        color: '#ffffff'
    },

    feedTitle: {
        paddingLeft: wp(3),
        paddingRight: wp(3),
        color: "#3D3D3D",
        fontSize: wp(19),
        fontFamily: "Raleway-Bold",
        marginTop: wp(30),
        fontWeight: '700',
    },

    dateView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: wp(9)
    },

    iconDate: {
        width: wp(12),
        height: wp(12),
        marginRight: wp(6)
    },

    dateTxt: {
        color: "#3D3D3D",
        fontSize: wp(12),
        fontFamily: "Raleway-Medium",
    },

    otherView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: wp(17),
        backgroundColor: '#F8F8F8',
        borderRadius: wp(19),
        paddingTop: wp(12),
        paddingRight: wp(21),
        paddingLeft: wp(20),
        paddingBottom: wp(11)
    },

    otherViewBox:{
        flexDirection: 'row',
        marginRight: wp(7),
        alignItems: 'center',
    },

    otherTxts:{
        color: "#3D3D3D",
        fontSize: wp(12),
        fontFamily: "Raleway-Medium",
        marginLeft: wp(5)
    },

    iconProfile: {
        width: wp(10),
        height: wp(11),
    },

    iconPoint: {
        width: wp(8),
        height: wp(12),
    },

    iconLocation: {
        width: wp(9),
        height: wp(13),
    },

    descWrapper: {
        marginTop: wp(31),
    },

    descTitle: {
        color: "#3D3D3D",
        fontSize: wp(14),
        fontFamily: "Raleway-Bold",
        fontWeight: 'bold',
        paddingLeft: wp(3),
        paddingRight: wp(3),
    },

    feedDesc: {
        color: "#3D3D3D",
        fontSize: wp(14),
        fontFamily: "Raleway-Medium",
        paddingLeft: wp(3),
        paddingRight: wp(3),
        marginTop: wp(7),
    },

    metaWrapper: {
        marginTop: wp(21),
        paddingLeft: wp(3),
        paddingRight: wp(3),
    },

    metaRow: {
        flexDirection: 'row',
        marginBottom: wp(5),
    },

    metaRowLeft: {
        color: "#3D3D3D",
        fontSize: wp(14),
        fontFamily: "Roboto-Regular",
        width: wp(77),
        flexWrap: 'wrap',
    },

    metaRowLeftL: {
        width: wp(107),
    },

    metaRowRight: {
        color: "#3D3D3D",
        fontSize: wp(14),
        fontFamily: "Raleway-Bold",
        marginLeft: wp(8),
        fontWeight: 'bold',
        flexWrap: 'wrap'
    },

    metaRowUnit: {
        color: "#3D3D3D",
        fontSize: wp(14),
        fontFamily: "Raleway-Regular",
        paddingLeft: wp(3),
        flex: 1,
    },

    btnChatWrapper: {
        marginTop: wp(80),
    },

    btnChat: {
        height: wp(38),
        borderRadius: wp(19),
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnChatTxt: {
        color: "#B7000D",
        fontSize: wp(14),
        fontFamily: "Raleway-SemiBold",
    },

});
