import {PixelRatio, StyleSheet} from 'react-native';
import {widthPercentage as wp} from '../util';

module.exports = StyleSheet.create({
    container: {
        flex: 1,
    },

    textInputContainer: {
        backgroundColor: "#ffffff",
        height: wp(33),
        flexDirection: 'row',
        borderTopLeftRadius: wp(8),
        borderBottomLeftRadius: wp(8),
        borderTopRightRadius: wp(8),
        borderBottomRightRadius: wp(8),
    },

    textInput: {
        flex: 1,
        padding: wp(7),
        paddingLeft: wp(14),
        fontSize: wp(14),
        height: wp(33),
        fontFamily: "Raleway-Medium",
        color: "#3D3D3D",
    },

    powered: {},

    listView: {
        backgroundColor: "#ffffff",
    },

    rowWrapper: {
        width: wp(373),
        height: wp(44),
        zIndex: 8,
    },

    row: {
        padding: wp(13),
        height: wp(44),
        flexDirection: 'row',
    },

    separator: {
        height: 2,
        backgroundColor: '#c8c7cc',
    },

    description: {},

    loader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: wp(20),
    },

    androidLoader: {
        marginRight: wp(-15),
    },
});
