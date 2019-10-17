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
        backgroundColor: '#F63341',
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
    priceAndQtyWrapper:{
        marginTop: wp(42),
        flexDirection: 'row'
    },
    qtyBox: {
        width: wp(130),
        height: wp(32),
        marginRight: wp(22),
        flexDirection: 'row'
    },
    qtyLabelView: {
        width: wp(57),
        height: wp(32),
        borderTopLeftRadius: wp(8),
        borderBottomLeftRadius: wp(8),
        backgroundColor: '#02C8A7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    qtyLabel: {
        color: "#FFFFFF",
        fontSize: wp(11),
        fontFamily: "Raleway-Regular",
    },
    qtyInput: {
        flex: 1,
        height: wp(32),
        color: "#3D3D3D",
        fontSize: wp(14),
        fontFamily: "Raleway-Medium",
        paddingLeft: wp(12),
        paddingRight: wp(12),
        paddingTop: wp(7),
        paddingBottom: wp(7),
        borderTopRightRadius: wp(8),
        borderBottomRightRadius: wp(8),
        backgroundColor: '#ffffff'
    },
    priceBox: {
        width: wp(250),
        height: wp(32),
        flexDirection: 'row'
    },

    priceLabelView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(138),
        height: wp(32),
        borderTopLeftRadius: wp(8),
        borderBottomLeftRadius: wp(8),
        backgroundColor: '#02C8A7',
    },
    priceLabel: {
        color: "#FFFFFF",
        fontSize: wp(11),
        fontFamily: "Raleway-Regular",
    },
    priceInput: {
        flex: 1,
        height: wp(32),
        color: "#3D3D3D",
        fontSize: wp(14),
        fontFamily: "Raleway-Medium",
        paddingLeft: wp(7),
        paddingRight: wp(7),
        paddingTop: wp(7),
        paddingBottom: wp(7),
        backgroundColor: '#FFFFFF',
    },
    currencyLabelView: {
        width: wp(27),
        height: wp(32),
        borderTopRightRadius: wp(8),
        borderBottomRightRadius: wp(8),
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    currencyLabel: {
        color: "#3D3D3D",
        fontSize: wp(9),
        fontFamily: "Raleway-Regular",
    },
    imageLabel: {
        color: "#3D3D3D",
        fontSize: wp(11),
        fontFamily: "Raleway-Regular",
        marginTop: wp(55),
    },
    imageGallery: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: wp(12),
    },
    imageItem: {
        marginRight: wp(10),
        marginBottom: wp(10),
        shadowOpacity: 0.16,
        shadowRadius: wp(6),
        shadowColor: '#000000',
        shadowOffset: {height: wp(3), width: 0},
        elevation: 6,
    },
    imageView: {
        borderRadius: wp(6),
        width: wp(47),
        height: wp(47),
    },
    btnAddImage: {
        width: wp(47),
        height: wp(47),
        borderRadius: wp(5),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#02C8A7'
    },
    iconPlus: {
        width: wp(13.5),
        height: wp(13.5),
    },
    btnSellShare: {
        width: wp(143),
        height: wp(42),
        backgroundColor: '#F63341',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(21),
        marginTop: wp(26),
        alignSelf: 'flex-end',
        marginBottom: wp(12),
    },
    sellShareTxt: {
        color: "#FFFFFF",
        fontSize: wp(18),
        fontFamily: "Raleway-Bold",
    }
});
