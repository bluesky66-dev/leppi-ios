import {Dimensions, StyleSheet} from 'react-native';
import {widthPercentage as wp, heightPercentage as hp} from '../util';

module.exports = StyleSheet.create({
    container: {
        marginLeft: wp(23),
        marginRight: wp(23),
    },
    content: {
        backgroundColor: '#FFFFFF',
        paddingLeft: wp(23),
        paddingRight: hp(23),
        borderRadius: hp(25),
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
    groupNameView: {
        marginTop: hp(36),
        paddingLeft: wp(6),
    },
    groupNameTxt: {
        color: "#3D3D3D",
        fontSize: hp(33),
        fontFamily: "Raleway-Medium",
    },
    locationView: {
        flexDirection: 'row',
        // marginTop: wp(8.6),
        paddingLeft: wp(6),
        alignItems: 'center'
    },
    iconLocation: {
        width: hp(7),
        height: hp(10),
        marginRight: wp(5.7),
    },
    locationTxt: {
        color: "#3D3D3D",
        fontSize: hp(12),
        fontFamily: "Raleway-Bold",
        opacity: 0.6,
    },
    descView: {
        paddingLeft: wp(6),
        marginTop: hp(8),
        width: wp(226),
    },
    descTxt: {
        color: "#7E7E7E",
        fontSize: hp(12),
        fontFamily: "Raleway-Bold",
    },
    recentLabel: {
        marginTop: hp(50),
        paddingLeft: wp(6),
    },
    recentTxt: {
        color: "#7E7E7E",
        fontSize: hp(12),
        fontFamily: "Raleway-Bold",
    },
    recentlyItems: {
        marginTop: hp(10),
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    groupInfo: {
        marginTop: hp(46),
        paddingLeft: wp(6),
        paddingRight: wp(8),
        flexDirection: 'row',
    },
    nameAndAge: {
        paddingRight: wp(8),
        flex: 1,
    },
    nameLabel: {
        color: "#7E7E7E",
        fontSize: wp(12),
        fontFamily: "Raleway-Bold",
    },
    nameTxt: {
        color: "#7E7E7E",
        fontSize: hp(15),
        fontFamily: "Raleway-Bold",
        marginTop: wp(2),
    },
    ageLabel: {
        color: "#7E7E7E",
        fontSize: hp(12),
        fontFamily: "Raleway-Bold",
        marginTop: hp(13),
    },
    ageView: {
        flexDirection: 'row',
        marginTop: hp(1),
    },
    ageTxt: {
        color: "#7E7E7E",
        fontSize: hp(15),
        fontFamily: "Raleway-Bold",
        fontWeight: "bold",
    },
    ageUnite: {
        color: "#7E7E7E",
        fontSize: hp(15),
        fontFamily: "Raleway-Bold",
        marginLeft: wp(5),
    },
    memberCountWrapper: {
        width: wp(71),
        position: 'relative'
    },
    memberCount: {
        position: 'absolute',
        bottom: 0,
        width: hp(71),
        height: hp(71),
        borderRadius: hp(8),
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
    },
    memberCountNumber: {
        marginTop: hp(3),
        color: "#7E7E7E",
        fontSize: hp(32),
        fontFamily: "Raleway-Bold",
    },
    memberCountUnite: {
        color: "#7E7E7E",
        fontSize: hp(12),
        fontFamily: "Raleway-Bold",
    },
    joinBtnWrapper: {
        marginTop: hp(33),
        paddingLeft: wp(8),
        paddingRight: wp(8),
        flexDirection: 'row',
        marginBottom: hp(20),
    },
    groupCode: {
        flex: 1,
        borderTopLeftRadius: hp(13),
        borderBottomLeftRadius: hp(13),
        height: hp(33),
        paddingLeft: wp(17),
        paddingTop: hp(10),
        paddingBottom: hp(7),
        paddingRight: wp(5),
        backgroundColor: '#EEEEEE',
        color: "#3D3D3D",
        fontSize: hp(14),
        fontFamily: "Raleway-Regular",
        letterSpacing: wp(6),
    },
    btnJoinGroup: {
        backgroundColor: '#02C8A7',
        borderTopRightRadius: hp(13),
        borderBottomRightRadius: hp(13),
        height: hp(33),
        paddingLeft: wp(16),
        paddingRight: wp(12),
        justifyContent: 'center'
    },
    joinGroupTxt: {
        color: "#FFFFFF",
        fontSize: hp(15),
        fontFamily: "Raleway-Bold",
    },
    emptyView: {
        height: wp(25),
    },
});
