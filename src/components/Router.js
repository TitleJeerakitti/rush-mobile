import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import LoginForm from './LoginForm';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key='root'>
                <Scene key='auth' hideNavBar initial>
                    <Scene key='login' component={LoginForm} hideNavBar />
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;
