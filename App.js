import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import { Notifications, Permissions, } from 'expo'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import Router from './src/components/Router';
import reducers from './src/reducers';

export default class App extends React.Component {

  // componentWillMount() {
  //   const config = {
  //     apiKey: 'AIzaSyAaARFxV5nbEp_Q4PTVBgoaORXn_SsKLFg',
  //     authDomain: 'rush-72ee8.firebaseapp.com',
  //     databaseURL: 'https://rush-72ee8.firebaseio.com',
  //     projectId: 'rush-72ee8',
  //     storageBucket: 'rush-72ee8.appspot.com',
  //     messagingSenderId: '373675808496'
  //   };
  //   firebase.initializeApp(config);
  // }

  constructor(props) {
    super(props);
    this.getNotification();
    this.listener = Notifications.addListener(this.listener);
  }

  componentWillUnmount() {
    this.listener && Notifications.removeListener(this.listener);
  }

  async getNotification() {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    const token = await Notifications.getExpoPushTokenAsync();
    console.log(status, token);
  }

  listener = ({ origin, data }) => {
    console.log('receive ', origin, data);
  }

  render() {
    const store = createStore(reducers, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
