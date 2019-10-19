import {StyleSheet} from 'react-native';
import {widthPercentage as wp, heightPercentage as hp} from '../../util';


module.exports = StyleSheet.create({
    formWrapper: {
        marginTop: hp(54),
        flex: 1
    },

    formContainer: {
        paddingLeft: wp(42),
        paddingRight: wp(41)
    },

    afterGroupName: {
        marginTop: hp(-4)
    },

    afterGroupCity: {
        marginTop: hp(-9)
    },

    groupLabel: {
        paddingTop: hp(8),
        paddingBottom: hp(8),
    },

    groupLabelText: {
        color: "#3D3D3D",
        fontSize: hp(12),
        fontFamily: "Raleway-Regular",
    },

    afterGroupNeighborhood: {
        height: hp(5),
    },

    afterGroupAccessCode: {
        height: hp(140),
    }

});
