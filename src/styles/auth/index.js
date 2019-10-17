import { StyleSheet } from 'react-native';
import {widthPercentage as wp } from '../../util';

module.exports = StyleSheet.create({

  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#02C8A7",
  },

  containerScroll: {
    flex: 1,
    paddingTop: wp(154),
    height: wp(812),
  },

  welcomeText: {  
    fontWeight: "400",
    fontFamily: "Raleway-Bold",
    fontSize: wp(46),
    marginBottom: wp(68),
    color: "#ffffff",
    textAlign: "center"
  },

  logoCotainer: {
    alignSelf: "center",
    width: wp(312),
    height: wp(282),
    marginBottom: wp(83),
  },

  logoimage: {
    alignSelf: "flex-start",
    width: wp(282),
    height: wp(282),
  },

  btnContainer: {
    borderRadius: wp(14),
    marginTop: wp(10),
  },

  button: {
    height: wp(36),
    width: wp(162),
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: wp(12),
    borderBottomLeftRadius: wp(39),
    borderTopRightRadius: wp(39),
    borderBottomRightRadius: wp(12)
  },

  buttonText: {
    fontFamily: "Raleway-Bold",
    fontSize: wp(18),
    color: "#02C8A7",
  },

  bordered: {
    borderWidth: wp(3),
    color: "#fff",
    borderColor: "#FFFFFF",
    backgroundColor: "#02C8A7",
  },

  mainColor: {
    color: "#FFFFFF",
  },

  btnLogin: {
  },

  btnRegister: {
    marginBottom: wp(83),
  },

  loginButtonText: {
    fontFamily: "Raleway-Bold",
    fontSize: wp(18),
    color: "#3D3D3D",
  },

  registerButtonText: {
    fontFamily: "Raleway-Bold",
    fontSize: wp(18),
    color: "#02C8A7",
  },
});
