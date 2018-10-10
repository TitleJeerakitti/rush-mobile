import React from 'react';
import { Router, Scene, Actions, Drawer, Tabs } from 'react-native-router-flux';

import LoginForm from './LoginForm';
import HomeScreen from './HomeScreen';
import Register from './Register';
import ForgetPassword from './ForgetPassword';
import SideMenu from './SideMenu';
import { NavHamberger, IconTab } from './common';

class RouterComponent extends React.Component {

    render() {
        const { tabBarStyle } = styles;
        return (
            <Router>
                {/* panHandlers={null} disabled to slide back */}
                <Scene key='root' hideNavBar panHandlers={null}>
                    <Scene 
                        key='auth'
                        titleStyle={{ color: 'white' }}
                        navBarButtonColor='white'
                        navigationBarStyle={{ backgroundColor: 'black', borderBottomWidth: 0 }}
                        // initial
                    >
                        <Scene key='login' component={LoginForm} hideNavBar initial />
                        <Scene key='register' component={Register} title='สมัครสมาชิก' onLeft />
                        <Scene key='forget' component={ForgetPassword} title='ลืมรหัสผ่าน' onLeft />
                    </Scene>
                    
                    <Drawer key='app' contentComponent={SideMenu} initial >
                        <Scene key='container' hideNavBar>
                            <Tabs key='tabber' tabBarStyle={tabBarStyle} showLabel={false}>
                                <Scene key='homepage' icon={IconTab} iconName='home' initial>
                                    <Scene 
                                        key='home' 
                                        component={HomeScreen} 
                                        title='R U S H' 
                                        navBar={NavHamberger}
                                        onLeft={() => Actions.drawerOpen()}
                                        onRight={() => Actions.test1()}
                                        search
                                        initial
                                    />
                                    <Scene 
                                        key='test1' 
                                        component={ForgetPassword} 
                                        title='test page' 
                                        navBar={NavHamberger}
                                        onLeft={() => Actions.drawerOpen()}
                                        onRight={() => Actions.pop()}
                                    />
                                </Scene>
                                <Scene key='history' icon={IconTab} iconName='history'>
                                    <Scene 
                                        key='home' 
                                        component={HomeScreen} 
                                        title='H I S T O R Y' 
                                        navBar={NavHamberger}
                                        onLeft={() => Actions.drawerOpen()}
                                        initial
                                    />
                                </Scene>
                                <Scene key='queue' icon={IconTab} iconName='account-multiple'>
                                    <Scene 
                                        key='home' 
                                        component={HomeScreen} 
                                        title='Q U E U E' 
                                        navBar={NavHamberger}
                                        onLeft={() => Actions.drawerOpen()}
                                        initial
                                    />
                                </Scene>
                                <Scene key='sale' icon={IconTab} iconName='sale'>
                                    <Scene 
                                        key='home' 
                                        component={HomeScreen} 
                                        title='P R O M O T I O N' 
                                        navBar={NavHamberger}
                                        onLeft={() => Actions.drawerOpen()}
                                        initial
                                    />
                                </Scene>
                            </Tabs>
                        </Scene>
                    </Drawer>
                </Scene>
            </Router>
        );
    }
}

const styles = {
    tabBarStyle: {
        backgroundColor: 'white',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'black',
    }
};

export default RouterComponent;
