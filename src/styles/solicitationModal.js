import {StyleSheet} from 'react-native';
import { Dimensions, PixelRatio } from 'react-native';
let screenHeight = Dimensions.get('window').height;
import {widthPercentage as wp} from '../util';

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
        borderRadius: wp(42),
    },
    feedBadge: {
        height: wp(17),
        width: wp(55),
        borderRadius: wp(35),
        backgroundColor: '#1C5596',
        position: 'absolute',
        left: wp(44),
        top: wp(-8.5),
    },
    btnCloseModal: {
        position: 'absolute',
        top: wp(22.5),
        right: wp(21.5)
    },
    iconClose: {
        width: wp(14),
        height: wp(14),
    },
    titleView: {
        marginTop: wp(53),
        paddingLeft: wp(8.5),
    },
    titleTxt: {
        color: "#02C8A7",
        fontSize: wp(11),
        fontFamily: "Raleway-Regular",
    },
    titleInput: {
        color: "#3D3D3D",
        fontSize: wp(14),
        fontFamily: "Raleway-Medium",
        marginTop: wp(8),
        borderRadius: wp(8),
        backgroundColor: '#FFFFFF',
        paddingLeft: wp(9),
        paddingRight: wp(9),
        paddingTop: wp(7),
        paddingBottom: wp(7),
        height: wp(33),
    },
    descInput: {
        marginTop: wp(13)
    },
    estTimeView: {
        flexDirection: 'row',
        height: wp(32),
        marginTop: wp(58),
    },
    estTimeLabel: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: wp(11),
        paddingLeft: wp(8),
        backgroundColor: '#02C8A7',
        borderBottomLeftRadius: wp(8),
        borderTopLeftRadius: wp(8),
    },
    estTimeTxt: {
        color: "#FFFFFF",
        fontSize: wp(11),
        fontFamily: "Raleway-Regular",
    },
    estTimeInput: {
        flex: 1,
        color: "#3D3D3D",
        fontSize: wp(14),
        fontFamily: "Raleway-Medium",
        height: wp(32),
        paddingLeft: wp(18),
        paddingRight: wp(3),
        paddingTop: wp(7),
        paddingBottom: wp(7),
        backgroundColor: '#FFFFFF',
    },
    daysLabel: {
        height: wp(32),
        borderTopRightRadius: wp(8),
        borderBottomRightRadius: wp(8),
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: wp(11),
        paddingLeft: wp(3),
        backgroundColor: '#FFFFFF',
    },
    daysTxt: {
        color: "#3D3D3D",
        fontSize: wp(9),
        fontFamily: "Raleway-Regular",
    },
    estDateView: {
        flexDirection: 'row',
        marginTop: wp(14),
        height: wp(32),
    },
    estDateLabel: {
        backgroundColor: '#02C8A7',
        borderTopLeftRadius: wp(8),
        borderBottomLeftRadius: wp(8),
        paddingLeft: wp(12),
        paddingRight: wp(8),
        alignItems: 'center',
        justifyContent: 'center',
    },
    estDateTxt: {
        color: "#FFFFFF",
        fontSize: wp(11),
        fontFamily: "Raleway-Regular",
    },
    estDateInputView: {
        flex: 1,
        borderTopRightRadius: wp(8),
        borderBottomRightRadius: wp(8),
        paddingLeft: wp(7),
        paddingRight: wp(7),
        paddingTop: wp(7),
        paddingBottom: wp(7),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
    },
    estDateInput: {
        color: "#3D3D3D",
        fontSize: wp(14),
        fontFamily: "Raleway-Medium",
    },
    btnSellShare: {
        width: wp(143),
        height: wp(42),
        backgroundColor: '#1C5596',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(21),
        marginTop: wp(56),
        alignSelf: 'flex-end',
        marginBottom: wp(12),
    },
    sellShareTxt: {
        color: "#FFFFFF",
        fontSize: wp(18),
        fontFamily: "Raleway-Bold",
    }
});
