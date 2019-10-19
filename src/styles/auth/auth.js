import {StyleSheet} from 'react-native';
import {widthPercentage as wp, heightPercentage as hp} from '../../util';

module.exports = StyleSheet.create({

    container: {
        flex: 1,
        //justifyContent: 'space-between',
        backgroundColor: '#ffffff',
    },

    rootWrapper: {
        flex: 1,
        backgroundColor: '#02C8A7'
    },

    swiperSlide: {
        flex: 1,
    },

    authFormWrapper: {
        flex: 1,
        backgroundColor: '#02C8A7',
        marginTop: hp(30),
    },

    authFormContainer: {
        padding: 0,
        paddingLeft: wp(60),
        paddingRight: wp(60),
        backgroundColor: '#02C8A7'
    },

    // errorText: {
    //   color: "red",
    //   marginBottom: 5,
    //   fontSize: 12,
    // },

    authTextInput: {
        borderWidth: 0,
        marginBottom: hp(17),
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        backgroundColor: '#02C8A7'
    },

    authInputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputAddOnWrapper: {
        width: wp(35),
        height: hp(33),
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        backgroundColor: "#f1f1f1",
    },

    inputAddOnIcon: {
        alignSelf: "center",
    },

    iconMail: {
        marginTop: hp(9),
        height: hp(15),
        width: hp(21),
    },

    iconPhone: {
        marginTop: hp(8),
        height: hp(16),
        width: hp(16),
    },

    iconClosedLock: {
        marginTop: hp(7),
        height: hp(18),
        width: hp(12),
    },

    textInput: {
        flex: 1,
        padding: 7,
        fontSize: hp(14),
        height: hp(33),
        fontFamily: "Raleway-Regular",
        color: "#3D3D3D",
        backgroundColor: "#ffffff",
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },

    forgotText: {
        fontWeight: "400",
        fontSize: hp(14),
        fontFamily: "Raleway-Bold",
        marginTop: hp(-6),
        color: "#ffffff",
        textAlign: "right"
    },

    loginBtnWrapper: {
        marginTop: hp(107),
        color: "#ffffff",
    },

    loginBtn: {
        color: "#ffffff",
    },

    thirdLoginWrapper: {
        marginTop: hp(97),
        marginBottom: hp(46)
    },

    thirdLoginContainer: {
        flex: 1,
        alignSelf: "center",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(16),
    },

    generalText: {
        fontSize: hp(14),
        fontFamily: "Raleway-Regular",
        color: "#ffffff",
    },

    socialButton: {
        marginLeft: wp(8),
        marginRight: wp(8),
    },

    socialButtonIcon: {
        height: hp(38),
        width: hp(38),
    },

    registerTextInputBox: {
        borderWidth: 0,
        marginBottom: hp(17),
        padding: 0,
        backgroundColor: '#02C8A7'
    },

    registerInputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    registerAddOn: {
        width: wp(79),
        height: hp(33),
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        backgroundColor: "#F1F1F1",
        justifyContent: 'center',
        alignItems: 'center',
    },

    registerAddOnTxt: {
        alignSelf: "center",
        textAlign: "center",
        fontFamily: "Raleway-Regular",
        color: "#02C8A7",
        fontSize: hp(11),
    },


    registerTextInput: {
        flex: 1,
        padding: 7,
        paddingLeft: wp(14),
        fontSize: hp(14),
        height: hp(33),
        fontFamily: "Raleway-Medium",
        color: "#3D3D3D",
        backgroundColor: "#ffffff",
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },

    selectInput: {
        flex: 1,
        padding: 7,
        paddingLeft: wp(14),
        height: hp(33),
        backgroundColor: "#ffffff",
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        justifyContent: 'center',
        position: 'relative'
    },

    selectInputTxt: {
        fontSize: hp(14),
        fontFamily: "Raleway-Medium",
        color: "#3D3D3D",
    },

    downChevron: {
        width: hp(9),
        height: hp(6),
        position: 'absolute',
        top: hp(14),
        right: wp(10)
    },

    registerBtnWrapper: {
        flex: 1,
        marginTop: hp(15),
        color: "#ffffff",
        marginBottom: hp(56),
    },
    nextStepBtn: {
        color: "#ffffff",
    },

    registerBtn: {
        color: "#ffffff",
    },

    textAreaBox: {
        borderWidth: 0,
        marginBottom: hp(16),
        padding: 0,
    },

    textAreaContainer: {
    },

    textArea: {
        fontFamily: "Raleway-Regular",
        color: "#3D3D3D",
        fontSize: hp(11),
        textAlignVertical: 'top',
        backgroundColor: "#ffffff",
        paddingTop: hp(10),
        paddingBottom: hp(10),
        paddingLeft: wp(18),
        paddingRight: wp(18),
        height: hp(90),
        borderRadius: 8,
    },

    groupAccessCodeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    groupAccessCode: {
        width: wp(107),
        padding: 7,
        paddingLeft: wp(15),
        fontSize: hp(14),
        height: hp(33),
        fontFamily: "Roboto-Regular",
        color: "#3D3D3D",
        backgroundColor: "#ffffff",
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        letterSpacing: wp(6),
    },

    groupCodeAddonHelpTxt: {
        fontFamily: "Raleway-Bold",
        fontSize: hp(15),
        color: "#3D3D3D",
        width: wp(20),
        height: hp(20),
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        marginLeft: wp(20)
    },

    joinTextInputBox: {
        borderWidth: 0,
        marginBottom: hp(16),
        padding: 0,
        backgroundColor: '#02C8A7'
    },

    joinInputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    joinAddOn: {
        width: wp(79),
        height: hp(33),
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: "#F1F1F1",
        justifyContent: 'center',
        alignItems: 'center',
    },

    joinAddOnTxt: {
        alignSelf: "center",
        fontFamily: "Raleway-Regular",
        color: "#02C8A7",
        fontSize: hp(11),
    },


    joinGroupTitle: {
        flex: 1,
        padding: 7,
        paddingLeft: wp(19),
        height: hp(33),
        justifyContent: 'center',
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },

    groupTitleTxt: {
        fontSize: hp(14),
        fontFamily: "Raleway-Medium",
        color: "#3D3D3D",
    },

    emptySpace: {
        height: hp(35),
        flex: 1,
    },
});
