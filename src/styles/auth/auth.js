import {StyleSheet} from 'react-native';
import {widthPercentage as wp} from '../../util';


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

    swiperWrapper: {
    },

    swiperSlide: {
        flex: 1,
    },

    authFormWrapper: {
        flex: 1,
        backgroundColor: '#02C8A7',
        marginTop: wp(30),
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
        marginBottom: wp(17),
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
        height: wp(33),
        borderTopLeftRadius: wp(8),
        borderBottomLeftRadius: wp(8),
        backgroundColor: "#f1f1f1",
    },

    inputAddOnIcon: {
        alignSelf: "center",
    },

    iconMail: {
        marginTop: wp(9),
        height: wp(15),
        width: wp(21),
    },

    iconPhone: {
        marginTop: wp(8),
        height: wp(16),
        width: wp(16),
    },

    iconClosedLock: {
        marginTop: wp(7),
        height: wp(18),
        width: wp(12),
    },

    textInput: {
        flex: 1,
        padding: wp(7),
        fontSize: wp(14),
        height: wp(33),
        fontFamily: "Raleway-Regular",
        color: "#3D3D3D",
        backgroundColor: "#ffffff",
        borderTopRightRadius: wp(8),
        borderBottomRightRadius: wp(8),
    },

    forgotText: {
        fontWeight: "400",
        fontSize: wp(14),
        fontFamily: "Raleway-Bold",
        marginTop: wp(-6),
        color: "#ffffff",
        textAlign: "right"
    },

    loginBtnWrapper: {
        marginTop: wp(107),
        color: "#ffffff",
    },

    loginBtn: {
        color: "#ffffff",
    },

    thirdLoginWrapper: {
        marginTop: wp(97),
        marginBottom: wp(46)
    },

    thirdLoginContainer: {
        flex: 1,
        alignSelf: "center",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: wp(16),
    },

    generalText: {
        fontSize: wp(14),
        fontFamily: "Raleway-Regular",
        color: "#ffffff",
    },

    socialButton: {
        marginLeft: wp(8),
        marginRight: wp(8),
    },

    socialButtonIcon: {
        height: wp(38),
        width: wp(38),
    },

    registerTextInputBox: {
        borderWidth: 0,
        marginBottom: wp(17),
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
        height: wp(33),
        borderTopLeftRadius: wp(8),
        borderBottomLeftRadius: wp(8),
        backgroundColor: "#F1F1F1",
        justifyContent: 'center',
        alignItems: 'center',
    },

    registerAddOnTxt: {
        alignSelf: "center",
        textAlign: "center",
        fontFamily: "Raleway-Regular",
        color: "#02C8A7",
        fontSize: wp(11),
    },


    registerTextInput: {
        flex: 1,
        padding: wp(7),
        paddingLeft: wp(14),
        fontSize: wp(14),
        height: wp(33),
        fontFamily: "Raleway-Medium",
        color: "#3D3D3D",
        backgroundColor: "#ffffff",
        borderTopRightRadius: wp(8),
        borderBottomRightRadius: wp(8),
    },

    selectInput: {
        flex: 1,
        padding: wp(7),
        paddingLeft: wp(14),
        height: wp(33),
        backgroundColor: "#ffffff",
        borderTopRightRadius: wp(8),
        borderBottomRightRadius: wp(8),
        justifyContent: 'center',
        position: 'relative'
    },

    selectInputTxt: {
        fontSize: wp(14),
        fontFamily: "Raleway-Medium",
        color: "#3D3D3D",
    },

    downChevron: {
        width: wp(9),
        height: wp(6),
        position: 'absolute',
        top: wp(14),
        right: wp(10)
    },

    registerBtnWrapper: {
        flex: 1,
        marginTop: wp(15),
        color: "#ffffff",
        marginBottom: wp(56),
    },
    nextStepBtn: {
        color: "#ffffff",
    },

    registerBtn: {
        color: "#ffffff",
    },

    textAreaBox: {
        borderWidth: 0,
        marginBottom: wp(16),
        padding: 0,
    },

    textAreaContainer: {
    },

    textArea: {
        fontFamily: "Raleway-Regular",
        color: "#3D3D3D",
        fontSize: wp(11),
        textAlignVertical: 'top',
        backgroundColor: "#ffffff",
        paddingTop: wp(10),
        paddingBottom: wp(10),
        paddingLeft: wp(18),
        paddingRight: wp(18),
        height: wp(90),
        borderRadius: wp(8),
    },

    groupAccessCodeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    groupAccessCode: {
        width: wp(107),
        padding: wp(7),
        paddingLeft: wp(15),
        fontSize: wp(14),
        height: wp(33),
        fontFamily: "Roboto-Regular",
        color: "#3D3D3D",
        backgroundColor: "#ffffff",
        borderTopRightRadius: wp(8),
        borderBottomRightRadius: wp(8),
        letterSpacing: wp(6),
    },

    groupCodeAddonHelpTxt: {
        fontFamily: "Raleway-Bold",
        fontSize: wp(15),
        color: "#3D3D3D",
        width: wp(20),
        height: wp(20),
        borderRadius: wp(10),
        backgroundColor: '#ffffff',
        textAlign: 'center',
        marginLeft: wp(20)
    },

    joinTextInputBox: {
        borderWidth: 0,
        marginBottom: wp(16),
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
        height: wp(33),
        borderTopRightRadius: wp(8),
        borderBottomRightRadius: wp(8),
        backgroundColor: "#F1F1F1",
        justifyContent: 'center',
        alignItems: 'center',
    },

    joinAddOnTxt: {
        alignSelf: "center",
        fontFamily: "Raleway-Regular",
        color: "#02C8A7",
        fontSize: wp(11),
    },


    joinGroupTitle: {
        flex: 1,
        padding: wp(7),
        paddingLeft: wp(19),
        height: wp(33),
        justifyContent: 'center',
        backgroundColor: "#ffffff",
        borderTopLeftRadius: wp(8),
        borderBottomLeftRadius: wp(8),
    },

    groupTitleTxt: {
        fontSize: wp(14),
        fontFamily: "Raleway-Medium",
        color: "#3D3D3D",
    },

    emptySpace: {
        height: wp(35),
        flex: 1,
    },
});
