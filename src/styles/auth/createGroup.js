import {StyleSheet} from 'react-native';
import {widthPercentage as wp} from '../../util';


module.exports = StyleSheet.create({
    formWrapper: {
        marginTop: wp(54),
        flex: 1
    },

    formContainer: {
        paddingLeft: wp(42),
        paddingRight: wp(41)
    },

    afterGroupName: {
        marginTop: wp(-4)
    },

    afterGroupCity: {
        marginTop: wp(-9)
    },

    groupLabel: {
        paddingTop: wp(8),
        paddingBottom: wp(8),
    },

    groupLabelText: {
        color: "#3D3D3D",
        fontSize: wp(12),
        fontFamily: "Raleway-Regular",
    },

    afterGroupNeighborhood: {
        height: wp(5),
    },

    afterGroupAccessCode: {
        height: wp(140),
    }

});
