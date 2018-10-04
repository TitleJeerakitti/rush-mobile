import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
// import { Icon } from 'react-native-elements';

import LoginForm from './LoginForm';
import HomeScreen from './HomeScreen';
import Register from './Register';
// import { Header } from './common';

// class TabIcon extends React.Component {
//     render() {
//         return (
//             <Icon name='camera' size={30} />
//         );
//     }
// }

class RouterComponent extends React.Component {

    render() {
        return (
            <Router>
                <Scene key='root' hideNavBar>
                    {/* <Scene 
                        key='tabbar' 
                        tabs 
                        tabBarStyle={{ backgroundColor: '#FFF' }}
                        showLabel={false} > 
                    */}
                    <Scene 
                        key='auth' 
                        initial 
                        titleStyle={{ color: 'white' }}
                        navBarButtonColor='white'
                        navigationBarStyle={{ backgroundColor: 'black', borderBottomWidth: 0 }}
                        // icon={TabIcon} 
                        // navBar={Header} 
                    >
                        <Scene key='login' component={LoginForm} hideNavBar initial />
                        <Scene key='register' component={Register} title='สมัครสมาชิก' />
                    </Scene>
                    {/* </Scene> */}
                    <Scene key='app'>
                        <Scene key='home' component={HomeScreen} title='Home' initial />
                    </Scene>
                </Scene>
            </Router>
        );
    }
}

export default RouterComponent;
