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

  startBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },

  logoBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(22),
    flexDirection: 'row',
  },

  welcomeText: {
    fontWeight: "400",
    fontFamily: "Raleway-Bold",
    fontSize: wp(32),
    color: "#ffffff",
    textAlign: "center",
    marginLeft: wp(6),
    marginRight: wp(20),
  },

  logoCotainer: {
    alignSelf: "center",
  },

  logoimage: {
    alignSelf: "flex-start",
    width: hp(60),
    height: hp(60),
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
