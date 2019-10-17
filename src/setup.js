import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './redux/store';
import Main from './index';
import * as push from './util/pushNotifications';


class Root extends Component {
  constructor(props) {
    super(props)
  }

 
  componentDidMount() {
    push.checkPermission();
    push.notificationListener();
    push.createChannel();
  }

  componentWillUnmount() {
    push.notificationListener();
  }

  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}


export default Root
