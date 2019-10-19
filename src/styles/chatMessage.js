import {StyleSheet} from 'react-native';
import {widthPercentage as wp, heightPercentage as hp} from '../util';

module.exports = StyleSheet.create({
    contentWrapper: {
        marginTop: hp(5),
        width: wp(229),
    },
    flexStart: {
        alignSelf: 'flex-start',
    },
    flexEnd: {
        alignSelf: 'flex-end',
    },
    chatContent: {
        flex: 1,

        paddingLeft: wp(19),
        paddingRight: wp(19),
        paddingBottom: hp(8),
        paddingTop: hp(9),
    },
    myMsg: {
        backgroundColor: '#7DDCD4',
        borderTopRightRadius: hp(22),
        borderTopLeftRadius: hp(22),
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: hp(22),
    },
    custMsg: {
        backgroundColor: '#EDEDED',
        borderTopRightRadius: hp(22),
        borderTopLeftRadius: hp(22),
        borderBottomRightRadius: hp(22),
        borderBottomLeftRadius: hp(0),
    },
    chatMessage: {
        color: "#3D3D3D",
        fontSize: hp(12),
        fontFamily: "Raleway-SemiBold",
    },
    dateView: {
        marginTop: hp(3),
    },
    dateTxt: {
        color: "#3D3D3D",
        fontSize: hp(7),
        fontFamily: "Raleway-Regular",
        opacity: 0.3,
    }
});
