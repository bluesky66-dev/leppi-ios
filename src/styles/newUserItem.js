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
    feedContent: {
        flex: 1,
    },
    userInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: hp(10),
        paddingLeft: hp(10)
    },
    thumbnail: {
        width: hp(35),
        height: hp(35),
        borderRadius: hp(15),
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
        paddingLeft: wp(10),
        paddingRight: wp(50),
        paddingTop: hp(12),
        paddingBottom: hp(15),
    },
    professionView: {
        paddingBottom: hp(10)
    },
    professionTxt: {
        color: "#3D3D3D",
        fontSize: hp(12),
        fontFamily: "Roboto-Regular",
    },
    professionTxtBold: {
        color: "#000000",
        fontSize: hp(12),
        fontFamily: "Roboto-Bold",
    },
    professionDesc: {
        color: "#3D3D3D",
        fontSize: hp(12),
        fontFamily: "Roboto-Regular",
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
