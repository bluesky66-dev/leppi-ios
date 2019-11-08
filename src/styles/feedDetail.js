import {StyleSheet, Dimensions} from 'react-native';
import {widthPercentage as wp, heightPercentage as hp} from '../util';
let deviceHeight = Dimensions.get('window').height

module.exports = StyleSheet.create({
    rootWrapper: {
        flex: 1,
    },

    container: {
        flex: 1,
    },

    contentWrapper: {
        flex: 1,
        backgroundColor: '#35D3B9',
    },

    swiperWrapper: {
        height: hp(302),
    },

    slideItem: {
        flex: 1,
        padding: 0,
        margin: 0,
    },

    slideImage: {
        width: '100%',
        height: hp(302)
    },

    dotStyle: {
        backgroundColor: '#FFFFFF',
        width: wp(9),
        height: hp(9),
        borderRadius: hp(4.5),
        marginLeft: wp(8),
        marginRight: wp(8),
        marginTop: hp(21),
        marginBottom: hp(21),
    },

    activeDotStyle: {
        backgroundColor: '#02C8A7',
        width: wp(9),
        height: hp(9),
        borderRadius: hp(4.5),
        marginLeft: wp(8),
        marginRight: wp(8),
        marginTop: hp(21),
        marginBottom: hp(21),
    },

    detailWrapper: {
        backgroundColor: '#EFEFEF',
        borderTopLeftRadius: hp(41),
        borderTopRightRadius: hp(41),
        paddingLeft: wp(43),
        paddingRight: wp(42),
        paddingBottom: hp(35),
    },

    detailRed: {
        marginTop: hp(-35),
        minHeight: deviceHeight - hp(267)
    },

    detailBlue: {
        marginTop: hp(135),
        minHeight: deviceHeight - hp(135)
    },

    feedBadge: {
        width: wp(70),
        height: hp(15),
        borderRadius: hp(8),
        position: 'absolute',
        left: wp(41),
        top: hp(-7),
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
        fontSize: hp(19),
        fontFamily: "Raleway-Bold",
        marginTop: hp(30),
        fontWeight: '700',
    },

    dateView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(9)
    },

    iconDate: {
        width: hp(12),
        height: hp(12),
        marginRight: wp(6)
    },

    dateTxt: {
        color: "#3D3D3D",
        fontSize: hp(12),
        fontFamily: "Raleway-Medium",
    },

    otherView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: hp(17),
        backgroundColor: '#F8F8F8',
        borderRadius: hp(19),
        paddingTop: hp(12),
        paddingRight: wp(21),
        paddingLeft: wp(20),
        paddingBottom: hp(11)
    },

    otherViewBox:{
        flexDirection: 'row',
        marginRight: wp(7),
        alignItems: 'center',
    },

    otherTxts:{
        color: "#3D3D3D",
        fontSize: hp(12),
        fontFamily: "Raleway-Medium",
        marginLeft: wp(5)
    },

    iconProfile: {
        width: hp(10),
        height: hp(11),
    },

    iconPoint: {
        width: hp(8),
        height: hp(12),
    },

    iconLocation: {
        width: hp(9),
        height: hp(13),
    },

    descWrapper: {
        marginTop: hp(31),
    },

    descTitle: {
        color: "#3D3D3D",
        fontSize: hp(14),
        fontFamily: "Raleway-Bold",
        fontWeight: 'bold',
        paddingLeft: wp(3),
        paddingRight: wp(3),
    },

    feedDesc: {
        color: "#3D3D3D",
        fontSize: hp(14),
        fontFamily: "Raleway-Medium",
        paddingLeft: wp(3),
        paddingRight: wp(3),
        marginTop: hp(7),
    },

    metaWrapper: {
        marginTop: hp(21),
        paddingLeft: wp(3),
        paddingRight: wp(3),
    },

    metaRow: {
        flexDirection: 'row',
        marginBottom: hp(5),
    },

    metaRowLeft: {
        color: "#3D3D3D",
        fontSize: hp(14),
        fontFamily: "Roboto-Regular",
        width: wp(77),
        flexWrap: 'wrap',
    },

    metaRowLeftL: {
        width: wp(107),
    },

    metaRowRight: {
        color: "#3D3D3D",
        fontSize: hp(14),
        fontFamily: "Raleway-Bold",
        fontWeight: 'bold',
        flex: 1,
    },

    metaRowUnit: {
        marginLeft: wp(8),
        color: "#3D3D3D",
        fontSize: hp(14),
        fontFamily: "Raleway-Regular",
        paddingLeft: wp(3),
        flexWrap: 'wrap'
    },

    btnChatWrapper: {
        marginTop: hp(80),
    },

    btnChat: {
        height: hp(38),
        borderRadius: hp(19),
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnChatTxt: {
        color: "#B7000D",
        fontSize: hp(14),
        fontFamily: "Raleway-SemiBold",
    },

});
