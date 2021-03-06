import React from 'react';
import { AsyncStorage, Alert } from 'react-native';
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
import { fontLoader, resetRestaurant, authLoginSuccess, authTokenLogin, } from '../actions';
import Receipt from './Receipt';
import Review from './Review';
import History from './History';
import Promotion from './Promotion';
import EditProfile from './EditProfile';
import { SERVER, CHECK_TOKEN, CLIENT_ID, CLIENT_SECRET, LOGIN_APP, } from '../../config';
import SearchCategory from './SearchCategory';

class RouterComponent extends React.Component {
    constructor(props) {
        super(props);
        ScreenOrientation.allow('PORTRAIT');
        this.checkToken();
    }

    async componentDidMount() {
        await Font.loadAsync({
          thaisans: require('../../assets/ThaiSansNeue-Regular.ttf'),
          thaisansItalic: require('../../assets/ThaiSansNeue-Italic.ttf')
        });

        this.props.fontLoader();
    }

    async getUserInfo(token) {
        try {
            const { access_token, refresh_token, token_type } = token;
            const response = await fetch(`${SERVER}${CHECK_TOKEN}`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `${token_type} ${access_token}`
                },
            });
            if (response.status === 200) {
                this.userLoginSuccess(response, token);
            } else {
                this.refreshToken(refresh_token);
            }
        } catch (error) {
            Alert.alert('Connect lost try again!');
        }
    }

    async refreshToken(token) {
        try {
            const response = await fetch(`${SERVER}${LOGIN_APP}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    grant_type: 'refresh_token',
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    refresh_token: token,
                }),
            });
            if (response.status === 200) {
                this.userLoginSuccess(response);
            }
        } catch (error) {
            Alert.alert('Connect lost try again!');
        }
    }

    async userLoginSuccess(response, token = null) {
        const responseData = await response.json();
        if (!token) {
            this.storeData(responseData.token);
            this.props.authLoginSuccess(responseData);
        } else {
            this.props.authTokenLogin(responseData, token);
        }
        Actions.app();
    }

    async checkToken() {
        try {
            const storageToken = await AsyncStorage.getItem('token');
            const token = JSON.parse(storageToken);
            if (token !== null) {
                this.getUserInfo(token);
            }
        } catch (error) {
            Alert.alert('Cannot load your local data');
        }
    }

    async storeData(token) {
        try {
            await AsyncStorage.setItem('token', JSON.stringify(token));
        } catch (error) {
            Alert.alert('Cannot save authentication to your local data');
        }
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
                        initial
                    >
                        <Scene key='login' component={LoginForm} hideNavBar initial />
                        <Scene key='register' component={Register} title='สมัครสมาชิก' onLeft />
                        <Scene key='forget' component={ForgetPassword} title='ลืมรหัสผ่าน' onLeft />
                    </Scene>

                    <Scene key='profile' >
                        <Scene 
                            key='edit_profile' 
                            component={EditProfile} 
                            navBar={NavBack} 
                            title='แก้ไขโปรไฟล์' 
                            onLeft={() => Actions.pop()}
                        />
                    </Scene>

                    <Scene key='review'>
                        <Scene 
                            key='review_page' 
                            component={Review} 
                            navBar={NavBack} 
                            title='รีวิวร้านอาหาร'
                            onLeft={() => Actions.pop()}
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
                                        onLeft={() => Actions.pop()}
                                        // initial
                                    />
                                    <Scene 
                                        key='search_nearby'
                                        component={SearchNearby}
                                        title='ค้นหาร้านอาหารใกล้คุณ'
                                        navBar={NavBack}
                                        onLeft={() => Actions.pop()}
                                        // initial
                                    />
                                    <Scene
                                        key='search_category'
                                        component={SearchCategory}
                                        title='ค้นหาร้านอาหาร'
                                        navBar={NavBack}
                                        onLeft={() => Actions.pop()}
                                        // initial
                                    />
                                    <Scene 
                                        key='restaurant_menu'
                                        component={RestaurantMenu}
                                        reduxTitle
                                        navBar={NavBack}
                                        onRight={() => Actions.menu_remaining()}
                                        onLeft={() => this.props.resetRestaurant()}
                                    />
                                    <Scene 
                                        key='menu_remaining'
                                        component={MenuRemain}
                                        navBar={NavBack}
                                        title='รายการอาหารของคุณ'
                                        onLeft={() => Actions.pop()}
                                    />
                                </Scene>
                                <Scene key='history' icon={IconTab} iconName='history'>
                                    <Scene 
                                        key='home_history' 
                                        component={History} 
                                        title='H I S T O R Y' 
                                        navBar={NavHamberger}
                                        onEnter={() => Actions.refresh({ canLoad: true })}
                                        initial
                                    />
                                </Scene>
                                <Scene key='queue' icon={IconTab} iconName='account-multiple'>
                                    <Scene 
                                        key='home_queue' 
                                        component={Queue} 
                                        title='Q U E U E' 
                                        navBar={NavHamberger}
                                        initial
                                        onEnter={() => Actions.refresh({ canLoad: true })}
                                    />
                                    <Scene 
                                        key='receipt' 
                                        component={Receipt} 
                                        title='รายการอาหารของคุณ' 
                                        navBar={NavBack}
                                        onLeft={() => Actions.pop()}
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
    resetRestaurant,
    authLoginSuccess,
    authTokenLogin,
})(RouterComponent);
