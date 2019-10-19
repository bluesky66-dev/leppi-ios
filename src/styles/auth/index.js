import { StyleSheet } from 'react-native';
import {widthPercentage as wp, heightPercentage as hp } from '../../util';

module.exports = StyleSheet.create({

  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#02C8A7",
  },

  containerScroll: {
    flex: 1,
  },

  welcomeText: {
    marginTop: hp(154),
    fontWeight: "400",
    fontFamily: "Raleway-Bold",
    fontSize: hp(46),
    marginBottom: hp(68),
    color: "#ffffff",
    textAlign: "center"
  },

  logoCotainer: {
    alignSelf: "center",
    width: wp(312),
    height: hp(282),
    marginBottom: hp(83),
  },

  logoimage: {
    alignSelf: "flex-start",
    width: wp(282),
    height: hp(282),
  },

  btnContainer: {
    borderRadius: 14,
    marginTop: hp(10),
  },

  button: {
    height: hp(36),
    width: wp(162),
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 39,
    borderTopRightRadius: 39,
    borderBottomRightRadius: 12
  },

  buttonText: {
    fontFamily: "Raleway-Bold",
    fontSize: hp(18),
    color: "#02C8A7",
  },

  bordered: {
    borderWidth: 3,
    color: "#fff",
    borderColor: "#FFFFFF",
    backgroundColor: "#02C8A7",
  },

  mainColor: {
    color: "#FFFFFF",
  },

  btnLogin: {
    marginTop: hp(85)
  },

  btnRegister: {
    marginTop: hp(10),
  },

  loginButtonText: {
    fontFamily: "Raleway-Bold",
    fontSize: hp(18),
    color: "#3D3D3D",
  },

  registerButtonText: {
    fontFamily: "Raleway-Bold",
    fontSize: hp(18),
    color: "#02C8A7",
  },
});
