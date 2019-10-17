import {StyleSheet} from 'react-native';
import { Dimensions, PixelRatio } from 'react-native';
let screenHeight = Dimensions.get('window').height;
import {widthPercentage as wp} from '../util';

module.exports = StyleSheet.create({
    container: {
        marginLeft: wp(23),
        marginRight: wp(23),
    },
    content: {
        backgroundColor: '#FFFFFF',
        paddingLeft: wp(23),
        paddingRight: wp(23),
        borderRadius: wp(25),
    },
    bookMark: {
        height: wp(30.8),
        width: wp(20),
        position: 'absolute',
        right: wp(76),
        top: 0,
    },
    btnCloseModal: {
        position: 'absolute',
        top: wp(23.7),
        right: wp(20.1)
    },
    iconClose: {
        width: wp(14),
        height: wp(14),
    },
    groupNameView: {
        marginTop: wp(36),
        paddingLeft: wp(6),
    },
    groupNameTxt: {
        color: "#3D3D3D",
        fontSize: wp(33),
        fontFamily: "Raleway-Medium",
    },
    locationView: {
        flexDirection: 'row',
        // marginTop: wp(8.6),
        paddingLeft: wp(6),
        alignItems: 'center'
    },
    iconLocation: {
        width: wp(7),
        height: wp(10),
        marginRight: wp(5.7),
    },
    locationTxt: {
        color: "#3D3D3D",
        fontSize: wp(12),
        fontFamily: "Raleway-Bold",
        opacity: 0.6,
    },
    descView: {
        paddingLeft: wp(6),
        marginTop: wp(8),
        width: wp(226),
    },
    descTxt: {
        color: "#7E7E7E",
        fontSize: wp(12),
        fontFamily: "Raleway-Bold",
    },
    recentLabel: {
        marginTop: wp(50),
        paddingLeft: wp(6),
    },
    recentTxt: {
        color: "#7E7E7E",
        fontSize: wp(12),
        fontFamily: "Raleway-Bold",
    },
    recentlyItems: {
        marginTop: wp(10),
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    groupInfo: {
        marginTop: wp(46),
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
        fontSize: wp(15),
        fontFamily: "Raleway-Bold",
        marginTop: wp(2),
    },
    ageLabel: {
        color: "#7E7E7E",
        fontSize: wp(12),
        fontFamily: "Raleway-Bold",
        marginTop: wp(13),
    },
    ageView: {
        flexDirection: 'row',
        marginTop: wp(1),
    },
    ageTxt: {
        color: "#7E7E7E",
        fontSize: wp(15),
        fontFamily: "Raleway-Bold",
        fontWeight: "bold",
    },
    ageUnite: {
        color: "#7E7E7E",
        fontSize: wp(15),
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
        width: wp(71),
        height: wp(71),
        borderRadius: wp(8),
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
    },
    memberCountNumber: {
        marginTop: wp(3),
        color: "#7E7E7E",
        fontSize: wp(32),
        fontFamily: "Raleway-Bold",
    },
    memberCountUnite: {
        color: "#7E7E7E",
        fontSize: wp(12),
        fontFamily: "Raleway-Bold",
    },
    joinBtnWrapper: {
        marginTop: wp(33),
        paddingLeft: wp(8),
        paddingRight: wp(8),
        flexDirection: 'row',
        marginBottom: wp(20),
    },
    groupCode: {
        flex: 1,
        borderTopLeftRadius: wp(13),
        borderBottomLeftRadius: wp(13),
        height: wp(33),
        paddingLeft: wp(17),
        paddingTop: wp(10),
        paddingBottom: wp(7),
        paddingRight: wp(5),
        backgroundColor: '#EEEEEE',
        color: "#3D3D3D",
        fontSize: wp(14),
        fontFamily: "Raleway-Regular",
        letterSpacing: wp(6),
    },
    btnJoinGroup: {
        backgroundColor: '#02C8A7',
        borderTopRightRadius: wp(13),
        borderBottomRightRadius: wp(13),
        height: wp(33),
        paddingLeft: wp(16),
        paddingRight: wp(12),
        justifyContent: 'center'
    },
    joinGroupTxt: {
        color: "#FFFFFF",
        fontSize: wp(15),
        fontFamily: "Raleway-Bold",
    },
    emptyView: {
        height: wp(25),
    },
});
