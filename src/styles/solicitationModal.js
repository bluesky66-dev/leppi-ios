import {StyleSheet} from 'react-native';
import {widthPercentage as wp, heightPercentage as hp} from '../util';

module.exports = StyleSheet.create({
    rootWrapper: {
        flex: 1,
    },
    scrollWrapper: {
    },
    container: {
        marginLeft: wp(20),
        marginRight: wp(19),
    },
    content: {
        backgroundColor: '#EFEFEF',
        paddingLeft: wp(22),
        paddingRight: wp(22),
        borderRadius: hp(42),
    },
    feedBadge: {
        height: wp(17),
        width: hp(55),
        borderRadius: hp(35),
        backgroundColor: '#1C5596',
        position: 'absolute',
        left: wp(44),
        top: hp(-8.5),
    },
    btnCloseModal: {
        position: 'absolute',
        top: hp(22.5),
        right: wp(21.5)
    },
    iconClose: {
        width: hp(14),
        height: hp(14),
    },
    titleView: {
        marginTop: hp(53),
        paddingLeft: wp(8.5),
    },
    titleTxt: {
        color: "#02C8A7",
        fontSize: hp(11),
        fontFamily: "Raleway-Regular",
    },
    titleInput: {
        color: "#3D3D3D",
        fontSize: hp(14),
        fontFamily: "Raleway-Medium",
        marginTop: hp(8),
        borderRadius: hp(8),
        backgroundColor: '#FFFFFF',
        paddingLeft: wp(9),
        paddingRight: wp(9),
        paddingTop: hp(7),
        paddingBottom: hp(7),
        height: hp(33),
    },
    descInput: {
        marginTop: hp(13)
    },
    estTimeView: {
        flexDirection: 'row',
        height: hp(32),
        marginTop: hp(58),
    },
    estTimeLabel: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: wp(11),
        paddingLeft: wp(8),
        backgroundColor: '#02C8A7',
        borderBottomLeftRadius: hp(8),
        borderTopLeftRadius: hp(8),
    },
    estTimeTxt: {
        color: "#FFFFFF",
        fontSize: hp(11),
        fontFamily: "Raleway-Regular",
    },
    estTimeInput: {
        flex: 1,
        color: "#3D3D3D",
        fontSize: hp(14),
        fontFamily: "Raleway-Medium",
        height: hp(32),
        paddingLeft: wp(18),
        paddingRight: wp(3),
        paddingTop: hp(7),
        paddingBottom: hp(7),
        backgroundColor: '#FFFFFF',
    },
    daysLabel: {
        height: hp(32),
        borderTopRightRadius: hp(8),
        borderBottomRightRadius: hp(8),
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: wp(11),
        paddingLeft: wp(3),
        backgroundColor: '#FFFFFF',
    },
    daysTxt: {
        color: "#3D3D3D",
        fontSize: hp(9),
        fontFamily: "Raleway-Regular",
    },
    estDateView: {
        flexDirection: 'row',
        marginTop: hp(14),
        height: hp(32),
    },
    estDateLabel: {
        backgroundColor: '#02C8A7',
        borderTopLeftRadius: hp(8),
        borderBottomLeftRadius: hp(8),
        paddingLeft: wp(12),
        paddingRight: wp(8),
        alignItems: 'center',
        justifyContent: 'center',
    },
    estDateTxt: {
        color: "#FFFFFF",
        fontSize: hp(11),
        fontFamily: "Raleway-Regular",
    },
    estDateInputView: {
        flex: 1,
        borderTopRightRadius: hp(8),
        borderBottomRightRadius: hp(8),
        paddingLeft: wp(7),
        paddingRight: wp(7),
        paddingTop: hp(7),
        paddingBottom: hp(7),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
    },
    estDateInput: {
        color: "#3D3D3D",
        fontSize: hp(14),
        fontFamily: "Raleway-Medium",
    },
    btnSellShare: {
        width: wp(143),
        height: hp(42),
        backgroundColor: '#1C5596',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: hp(21),
        marginTop: hp(56),
        alignSelf: 'flex-end',
        marginBottom: hp(12),
    },
    sellShareTxt: {
        color: "#FFFFFF",
        fontSize: hp(18),
        fontFamily: "Raleway-Bold",
    }
});
