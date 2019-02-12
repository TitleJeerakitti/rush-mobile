import React from 'react';
import { Router, Scene, Actions, Drawer, Tabs } from 'react-native-router-flux';
import { Font, ScreenOrientation } from 'expo';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import HomeScreen from './HomeScreen';
import Register from './Register';
import ForgetPassword from './ForgetPassword';
import SideMenu from './SideMenu';
import SearchNearby from './SearchNearby';
import SearchByName from './SearchByName';
import RestaurantMenu from './RestaurantMenu';
import MenuRemain from './MenuRemain';
import Queue from './Queue';
import { NavHamberger, IconTab, NavBack } from './common';
import { fontLoader } from '../actions';
import Receipt from './Receipt';
import Review from './Review';
import History from './History';
import Promotion from './Promotion';
import EditProfile from './EditProfile';

class RouterComponent extends React.Component {

    componentWillMount() {
        ScreenOrientation.allow('PORTRAIT');
    }

    async componentDidMount() {
        await Font.loadAsync({
          thaisans: require('../../assets/ThaiSansNeue-Regular.ttf'),
          thaisansItalic: require('../../assets/ThaiSansNeue-Italic.ttf')
        });

        this.props.fontLoader();
        // other stuff
    }

    render() {
        const { tabBarStyle } = styles;
        return (
            <Router>
                {/* panHandlers={null} disabled to slide back */}
                <Scene key='root' hideNavBar panHandlers={null}>
                    <Scene 
                        key='auth'
                        type='replace'
                        titleStyle={{ color: 'white' }}
                        navBarButtonColor='white'
                        navigationBarStyle={{ backgroundColor: 'black', borderBottomWidth: 0 }}
                        // initial
                    >
                        <Scene key='login' component={LoginForm} hideNavBar initial />
                        <Scene key='register' component={Register} title='สมัครสมาชิก' onLeft />
                        <Scene key='forget' component={ForgetPassword} title='ลืมรหัสผ่าน' onLeft />
                    </Scene>

                    <Scene key='profile' 
                    initial
                    >
                        <Scene key='edit_profile' component={EditProfile} navBar={NavBack} title='แก้ไขโปรไฟล์' />
                    </Scene>

                    <Scene key='review'>
                        <Scene 
                            key='review_page' 
                            component={Review} 
                            navBar={NavBack} 
                            title='รีวิวร้านอาหาร'
                            disabled 
                        />
                    </Scene>
                    
                    <Drawer key='app' contentComponent={SideMenu}>
                        <Scene key='container' hideNavBar>
                            <Tabs key='tabber' tabBarStyle={tabBarStyle} showLabel={false}>
                                <Scene key='homepage' icon={IconTab} iconName='home' initial>
                                    <Scene 
                                        key='home_homepage' 
                                        component={HomeScreen} 
                                        title='R U S H' 
                                        navBar={NavHamberger}
                                        onRight={() => Actions.search_name()}
                                        initial
                                    />
                                    <Scene 
                                        key='search_name' 
                                        component={SearchByName} 
                                        title='ค้นหา' 
                                        navBar={NavBack}
                                        // onRight={() => Actions.pop()}
                                        // initial
                                    />
                                    <Scene 
                                        key='search_nearby'
                                        component={SearchNearby}
                                        title='ค้นหาร้านอาหารใกล้คุณ'
                                        navBar={NavBack}
                                        // onRight={() => console.log('click')}
                                        // initial
                                    />
                                    <Scene 
                                        key='restaurant_menu'
                                        component={RestaurantMenu}
                                        reduxTitle
                                        onRight={() => Actions.menu_remaining()}
                                        // title={this.props.currentRestaurant}
                                        navBar={NavBack}
                                    />
                                    <Scene 
                                        key='menu_remaining'
                                        component={MenuRemain}
                                        navBar={NavBack}
                                        title='รายการอาหารของคุณ'
                                    />
                                </Scene>
                                <Scene key='history' icon={IconTab} iconName='history'>
                                    <Scene 
                                        key='home_history' 
                                        component={History} 
                                        title='H I S T O R Y' 
                                        navBar={NavHamberger}
                                        initial
                                    />
                                </Scene>
                                <Scene key='queue' icon={IconTab} iconName='account-multiple'>
                                    <Scene 
                                        key='home_queue' 
                                        component={Queue} 
                                        title='Q U E U E' 
                                        navBar={NavHamberger}
                                        onEnter={() => Actions.refresh({ canLoad: true })}
                                        initial
                                    />
                                    <Scene 
                                        key='receipt' 
                                        component={Receipt} 
                                        title='รายการอาหารของคุณ' 
                                        navBar={NavBack}
                                    />
                                </Scene>
                                <Scene key='sale' icon={IconTab} iconName='sale'>
                                    <Scene 
                                        key='home_sale' 
                                        component={Promotion} 
                                        title='P R O M O T I O N' 
                                        navBar={NavHamberger}
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

export default connect(null, {
    fontLoader,
})(RouterComponent);
