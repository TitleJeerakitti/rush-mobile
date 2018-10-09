import React from 'react';
import { Router, Scene, Actions, Drawer, Tabs } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';

import LoginForm from './LoginForm';
import HomeScreen from './HomeScreen';
import Register from './Register';
import ForgetPassword from './ForgetPassword';
import { NavHamberger } from './common';

class RouterComponent extends React.Component {

    homeIcon() {
        return (
            <Icon name='home' type='material-community' size={30} />
        );
    }

    historyIcon() {
        return (
            <Icon name='history' type='material-community' size={30} />
        );
    }

    queueIcon() {
        return (
            <Icon name='account-multiple' type='material-community' size={30} />
        );
    }

    promotionIcon() {
        return (
            <Icon name='sale' type='material-community' size={30} />
        );
    }

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
                    >
                        <Scene key='login' component={LoginForm} hideNavBar initial />
                        <Scene key='register' component={Register} title='สมัครสมาชิก' onLeft />
                        <Scene key='forget' component={ForgetPassword} title='ลืมรหัสผ่าน' onLeft />
                    </Scene>
                    
                    <Drawer key='app' contentComponent={HomeScreen} initial>
                        <Scene key='container' hideNavBar>
                            <Tabs key='tabber' tabBarStyle={tabBarStyle} showLabel={false}>
                                <Scene key='homepage' icon={this.homeIcon.bind('eiei')} initial>
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
                                <Scene key='history' icon={this.historyIcon}>
                                    <Scene 
                                        key='home' 
                                        component={HomeScreen} 
                                        title='H I S T O R Y' 
                                        navBar={NavHamberger}
                                        onLeft={() => Actions.drawerOpen()}
                                        initial
                                    />
                                    <Scene 
                                        key='home2' 
                                        component={LoginForm} 
                                        title='page2' 
                                        navBar={NavHamberger}
                                        onLeft={() => Actions.drawerOpen()}
                                        onRight={() => Actions.pop()}
                                    />
                                </Scene>
                                <Scene key='queue' icon={this.queueIcon}>
                                    <Scene 
                                        key='home' 
                                        component={HomeScreen} 
                                        title='Q U E U E' 
                                        navBar={NavHamberger}
                                        onLeft={() => Actions.drawerOpen()}
                                        initial
                                    />
                                </Scene>
                                <Scene key='sale' icon={this.promotionIcon}>
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
        backgroundColor: '#FFF',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: '#000',
        paddingHorizontal: '5%',
    }
};

export default RouterComponent;
