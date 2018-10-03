import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import LoginForm from './LoginForm';
import HomeScreen from './HomeScreen';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key='root' hideNavBar>
                <Scene key='auth' initial>
                    <Scene key='login' component={LoginForm} hideNavBar initial />
                </Scene>
                <Scene key='app'>
                    <Scene key='home' component={HomeScreen} title='Home' initial />
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;
