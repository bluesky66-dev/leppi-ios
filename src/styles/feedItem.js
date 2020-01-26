import {StyleSheet} from 'react-native';
import {widthPercentage as wp, heightPercentage as hp} from '../util';

module.exports = StyleSheet.create({
    contentWrapper: {
        backgroundColor: '#ffffff',
        shadowOpacity: 0.16,
        width: '100%',
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
        zIndex: 5,
    },
    iconDotStyle: {
        width: hp(22),
        height: hp(22),
        resizeMode: 'contain',
    },
    feedContent: {
        flex: 1,
    },
    userInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: hp(10),
        paddingLeft: wp(10)
    },
    thumbnail: {
        width: hp(35),
        height: hp(35),
        borderRadius: hp(35/2),
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    thumbImage: {
        width: hp(35),
        height: hp(35),
        borderRadius: hp(35/2),
    },
    userInfo: {
        paddingLeft: wp(15)
    },
    usernameTxt: {
        fontSize: hp(13),
        fontFamily: "Raleway-Bold",
    },
    timeAgoTxt: {
        color: '#3D3D3D',
        fontSize: hp(10),
        fontFamily: "Raleway-Medium",
    },
    descWrapper: {
        paddingLeft: wp(60),
        paddingRight: wp(50),
        paddingTop: hp(12),
        paddingBottom: hp(15),
    },
    descTxt: {
        color: "#000000",
        fontSize: hp(11),
        fontFamily: "Raleway-Bold",
        marginBottom: hp(2),
    },
    galleryRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    galleryItemView: {
        marginRight: wp(8)
    },
    galleryItem: {
        width: hp(70),
        height: hp(70),
        borderRadius: hp(8),
        marginTop: hp(10)
    },
    otherViewRow: {
        marginTop: hp(10),
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        position: 'relative'
    },
    otherTxts: {
        color: "#3D3D3D",
        fontSize: hp(10),
        fontFamily: "Raleway-Medium",
        marginLeft: wp(5)
    },
    priceTxt: {
        color: "#3D3D3D",
        fontSize: hp(10),
        fontFamily: "Raleway-Medium",
        alignContent: 'flex-end',
        position: 'absolute',
        right: 0,
    },
    iconLocation: {
        width: hp(7),
        height: hp(10),
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: hp(10),
        paddingBottom: hp(10),
    },
    tagItem: {
        backgroundColor: '#02C8A7',
        padding: 5,
        borderRadius: 12,
        marginBottom: 5,
        marginRight: 5
    },
    tagItemText: {
        color: "#ffffff",
        fontSize: hp(11),
        fontFamily: "Raleway-Regular",
    },
    btnChat: {
        backgroundColor: '#02C8A7',
        height: hp(25),
        width: wp(100),
        borderRadius: hp(19),
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnChatTxt: {
        color: "#ffffff",
        fontSize: hp(12),
        fontFamily: "Raleway-SemiBold",
    },
});
