/**
 * Leppi React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {YellowBox} from 'react-native';
import 'react-native-gesture-handler'
import {listenOrientationChange as lor, removeOrientationListener as rol} from 'react-native-responsive-screen';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import NavigationService from './NavigationService';
import {Provider} from 'react-redux';
import store from "./src/redux/store";

import Home from "./src/view/Home";
import Start from "./src/view/start";
import SplashScreen from "./src/view/SplashScreen";
import Login from "./src/view/auth/login";
import Register from "./src/view/auth/register";
import JoinGroupPage from "./src/view/auth/joinGroupPage";
import Password from "./src/view/auth/password";
import Welcome from "./src/view/welcome";
import Feed from "./src/view/Feed";
import Chat from "./src/view/Chat";
import Perfil from "./src/view/Perfil";
import FeedDetail from "./src/view/FeedDetail";
import ChatRoom from "./src/view/ChatRoom";
import ChatUsers from "./src/view/ChatUsers";
import EditProfile from "./src/view/auth/EditProfile";
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';
import '@react-native-firebase/dynamic-links';
import '@react-native-firebase/messaging';
import '@react-native-firebase/storage';

console.disableYellowBox = true;
YellowBox.ignoreWarnings([
    //'Warning: Async Storage has been extracted',
    'Battery state',
    'componentWillMount',
    'componentWillUpdate',
    'componentWillReceiveProps',
    '[location] ERROR - 0',
    'Warning: DatePickerAndroid', // will be fixed with https://github.com/mmazzarolo/react-native-modal-datetime-picker/pull/262
    'RCTRootView cancelTouches', // https://github.com/kmagiera/react-native-gesture-handler/issues/746
  ]);
const ActivityProject = createStackNavigator(
    {
        Start: {screen: Start, navigationOptions: {header: null,},},
        Login: {screen: Login, navigationOptions: {header: null,},},
        Register: {screen: Register, navigationOptions: {header: null,},},
        JoinGroupPage: {screen: JoinGroupPage, navigationOptions: {header: null,},},
        Password: {screen: Password, navigationOptions: {header: null,},},
        Welcome: {screen: Welcome, navigationOptions: {header: null,},},
        EditProfile: {screen: EditProfile, navigationOptions: {header: null,},},
        Home: {screen: Home, navigationOptions: {header: null,},},
        Feed: {screen: Feed, navigationOptions: {header: null,},},
        FeedDetail: {screen: FeedDetail, navigationOptions: {header: null,},},
        Chat: {screen: Chat, navigationOptions: {header: null,},},
        ChatUsers: {screen: ChatUsers, navigationOptions: {header: null,},},
        ChatRoom: {screen: ChatRoom, navigationOptions: {header: null,},},
        Perfil: {screen: Perfil, navigationOptions: {header: null,},},
    },
    {
        initialRouteName: "Start",
    },
);

const InitialNavigator = createSwitchNavigator({
    //Splash: SplashScreen,
    App: ActivityProject
});


const AppContainer = createAppContainer(InitialNavigator);

class App extends React.Component {
    componentDidMount() {
        lor(this);
    }

    componentWillUnmount() {
        rol();
    }
    render() {
        return (
            <Provider store={store}>
                <AppContainer ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }}/>
            </Provider>
        );
    }
}

export default App;
