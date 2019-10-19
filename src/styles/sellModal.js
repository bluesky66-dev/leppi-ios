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
        borderRadius: wp(35),
        backgroundColor: '#F63341',
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
        paddingBottom: wp(7),
        height: hp(33),
    },
    descInput: {
        marginTop: wp(13)
    },
    priceAndQtyWrapper:{
        marginTop: wp(42),
        flexDirection: 'row'
    },
    qtyBox: {
        width: wp(130),
        height: hp(32),
        marginRight: wp(22),
        flexDirection: 'row'
    },
    qtyLabelView: {
        width: wp(57),
        height: hp(32),
        borderTopLeftRadius: hp(8),
        borderBottomLeftRadius: hp(8),
        backgroundColor: '#02C8A7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    qtyLabel: {
        color: "#FFFFFF",
        fontSize: hp(11),
        fontFamily: "Raleway-Regular",
    },
    qtyInput: {
        flex: 1,
        height: hp(32),
        color: "#3D3D3D",
        fontSize: hp(14),
        fontFamily: "Raleway-Medium",
        paddingLeft: wp(12),
        paddingRight: wp(12),
        paddingTop: hp(7),
        paddingBottom: hp(7),
        borderTopRightRadius: hp(8),
        borderBottomRightRadius: hp(8),
        backgroundColor: '#ffffff'
    },
    priceBox: {
        width: wp(250),
        height: hp(32),
        flexDirection: 'row'
    },

    priceLabelView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(138),
        height: hp(32),
        borderTopLeftRadius: hp(8),
        borderBottomLeftRadius: hp(8),
        backgroundColor: '#02C8A7',
    },
    priceLabel: {
        color: "#FFFFFF",
        fontSize: hp(11),
        fontFamily: "Raleway-Regular",
    },
    priceInput: {
        flex: 1,
        height: hp(32),
        color: "#3D3D3D",
        fontSize: hp(14),
        fontFamily: "Raleway-Medium",
        paddingLeft: wp(7),
        paddingRight: wp(7),
        paddingTop: hp(7),
        paddingBottom: hp(7),
        backgroundColor: '#FFFFFF',
    },
    currencyLabelView: {
        width: wp(27),
        height: hp(32),
        borderTopRightRadius: hp(8),
        borderBottomRightRadius: hp(8),
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    currencyLabel: {
        color: "#3D3D3D",
        fontSize: hp(9),
        fontFamily: "Raleway-Regular",
    },
    imageLabel: {
        color: "#3D3D3D",
        fontSize: hp(11),
        fontFamily: "Raleway-Regular",
        marginTop: hp(55),
    },
    imageGallery: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: hp(12),
    },
    imageItem: {
        marginRight: wp(10),
        marginBottom: hp(10),
        shadowOpacity: 0.16,
        shadowRadius: wp(6),
        shadowColor: '#000000',
        shadowOffset: {height: hp(3), width: 0},
        elevation: 6,
    },
    imageView: {
        borderRadius: hp(6),
        width: hp(47),
        height: hp(47),
    },
    btnAddImage: {
        width: hp(47),
        height: hp(47),
        borderRadius: hp(5),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#02C8A7'
    },
    iconPlus: {
        width: hp(13.5),
        height: hp(13.5),
    },
    btnSellShare: {
        width: wp(143),
        height: hp(42),
        backgroundColor: '#F63341',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: hp(21),
        marginTop: hp(26),
        alignSelf: 'flex-end',
        marginBottom: hp(12),
    },
    sellShareTxt: {
        color: "#FFFFFF",
        fontSize: hp(18),
        fontFamily: "Raleway-Bold",
    }
});
