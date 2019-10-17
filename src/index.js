import React, {Component} from "react";
import {Reducer, Router, Scene} from "react-native-router-flux";
import {View} from "native-base";
import {BackHandler} from "react-native";
import SplashScreen from 'react-native-splash-screen'
import Home from "./view/Home";
import CheckAuth from "./view/start/checkAuth";
import Start from "./view/start/auth/start";
import Login from "./view/start/auth/login";
import Register from "./view/start/auth/register";
import JoinGroupPage from "./view/start/auth/joinGroupPage";
import Password from "./view/start/auth/password";
import Welcome from "./view/start/auth/welcome";
import Feed from "./view/Feed";
import Chat from "./view/Chat";
import Perfil from "./view/Perfil";
import FeedDetail from "./view/FeedDetail";
import ChatRoom from "./view/ChatRoom";
import ChatUsers from "./view/ChatUsers";
import {connect} from "react-redux";
import EditProfile from "./view/start/auth/EditProfile";

const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        return defaultReducer(state, action);
    };
};

const getSceneStyle = (props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: "#fff",
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null
    };
    return style;
};

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(' ====== splash screen hide');
        SplashScreen.hide();
        const date1 = new Date();
        const date2 = new Date('11/1/2019');
        const diffTime = date2 - date1;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 0) {
            BackHandler.exitApp();
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
                    <Scene key="root">
                        <Scene key="checkAuth" component={CheckAuth} hideNavBar={true} initial/>
                        <Scene
                            key="start"
                            component={Start}
                            title="Start"
                            panHandlers={null}
                            hideNavBar={true}
                            onBack={() => BackHandler.exitApp()}
                            back={true}/>
                        <Scene
                            key="login"
                            component={Login}
                            title="Login"
                            panHandlers={null}
                            hideNavBar={true}/>
                        <Scene
                            key="register"
                            component={Register}
                            title="Register"
                            panHandlers={null}
                            hideNavBar={true}/>
                        <Scene
                            key="joinGroupPage"
                            component={JoinGroupPage}
                            title="JoinGroupPage"
                            panHandlers={null}
                            hideNavBar={true}/>
                        <Scene
                            key="password"
                            component={Password}
                            title="Password"
                            panHandlers={null}
                            hideNavBar={true}/>
                        <Scene
                            key="welcome"
                            component={Welcome}
                            title="Welcome"
                            panHandlers={null}
                            hideNavBar={true}/>
                        <Scene
                            key="editPerfil"
                            component={EditProfile}
                            title="EditProfile"
                            panHandlers={null}
                            hideNavBar={true}/>
                        <Scene
                            key="main"
                            hideNavBar={true}>
                            <Scene
                                key="home"
                                hideNavBar={true}
                                component={Home}
                                initial/>
                            <Scene
                                key="feed"
                                component={Feed}
                                title="Feed"
                                panHandlers={null}
                                hideNavBar={true}/>
                            <Scene
                                key="feedDetail"
                                component={FeedDetail}
                                title="FeedItem"
                                panHandlers={null}
                                hideNavBar={true}/>
                            <Scene
                                key="chat"
                                component={Chat}
                                title="Chat"
                                panHandlers={null}
                                hideNavBar={true}/>
                            <Scene
                                key="chatUsers"
                                component={ChatUsers}
                                title="ChatUsers"
                                panHandlers={null}
                                hideNavBar={true}/>
                            <Scene
                                key="chatRoom"
                                component={ChatRoom}
                                title="ChatRoom"
                                panHandlers={null}
                                hideNavBar={true}/>
                            <Scene
                                key="perfil"
                                component={Perfil}
                                title="Perfil"
                                panHandlers={null}
                                hideNavBar={true}/>
                        </Scene>
                    </Scene>
                </Router>
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
    }
}

export default connect(mapStateToProps)(Main);
