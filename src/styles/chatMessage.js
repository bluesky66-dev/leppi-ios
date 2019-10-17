import {StyleSheet} from 'react-native';
import {widthPercentage as wp} from '../util';

module.exports = StyleSheet.create({
    contentWrapper: {
        marginTop: wp(5),
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
        paddingBottom: wp(8),
        paddingTop: wp(9),
    },
    myMsg: {
        backgroundColor: '#7DDCD4',
        borderTopRightRadius: wp(22),
        borderTopLeftRadius: wp(22),
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: wp(22),
    },
    custMsg: {
        backgroundColor: '#EDEDED',
        borderTopRightRadius: wp(22),
        borderTopLeftRadius: wp(22),
        borderBottomRightRadius: wp(22),
        borderBottomLeftRadius: wp(0),
    },
    chatMessage: {
        color: "#3D3D3D",
        fontSize: wp(12),
        fontFamily: "Raleway-SemiBold",
    },
    dateView: {
        marginTop: wp(3),
    },
    dateTxt: {
        color: "#3D3D3D",
        fontSize: wp(7),
        fontFamily: "Raleway-Regular",
        opacity: 0.3,
    }
});
