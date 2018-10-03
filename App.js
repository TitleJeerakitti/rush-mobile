import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import Router from './src/components/Router';
import reducers from './src/reducers';

export default class App extends React.Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyAaARFxV5nbEp_Q4PTVBgoaORXn_SsKLFg',
      authDomain: 'rush-72ee8.firebaseapp.com',
      databaseURL: 'https://rush-72ee8.firebaseio.com',
      projectId: 'rush-72ee8',
      storageBucket: 'rush-72ee8.appspot.com',
      messagingSenderId: '373675808496'
    };
    firebase.initializeApp(config);
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
