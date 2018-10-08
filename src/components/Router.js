import React from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
// import { Icon } from 'react-native-elements';

import LoginForm from './LoginForm';
import HomeScreen from './HomeScreen';
import Register from './Register';
import ForgetPassword from './ForgetPassword';
import { Header } from './common';
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
                {/* panHandlers={null} disabled to slide back */}
                <Scene key='root' hideNavBar panHandlers={null}>
                    {/* <Scene 
                        key='tabbar' 
                        tabs 
                        tabBarStyle={{ backgroundColor: '#FFF' }}
                        showLabel={false} > 
                    */}
                    <Scene 
                        key='auth'
                        titleStyle={{ color: 'white' }}
                        navBarButtonColor='white'
                        navigationBarStyle={{ backgroundColor: 'black', borderBottomWidth: 0 }}
                        initial
                        // icon={TabIcon} 
                        // navBar={Header} 
                    >
                        <Scene key='login' component={LoginForm} hideNavBar initial />
                        <Scene key='register' component={Register} title='สมัครสมาชิก' onLeft />
                        <Scene key='forget' component={ForgetPassword} title='ลืมรหัสผ่าน' onLeft />
                    </Scene>
                    {/* </Scene> */}
                    <Scene 
                        key='app'
                        drawer
                        contentComponent={LoginForm}
                        // gesturesEnabled={false}
                    >
                        <Scene
                            key='homepage'
                            initial
                        >
                            <Scene 
                                key='home' 
                                component={HomeScreen} 
                                title='R U S H' 
                                navBar={Header}
                                onLeft={() => Actions.drawerOpen()}
                                onRight={() => Actions.home2()}
                                initial
                            />
                            <Scene 
                                key='home2' 
                                component={LoginForm} 
                                title='page2' 
                                navBar={Header}
                                onLeft={() => Actions.drawerOpen()}
                                onRight={() => Actions.pop()}
                            />
                        </Scene>
                    </Scene>
                </Scene>
            </Router>
        );
    }
}

export default RouterComponent;
