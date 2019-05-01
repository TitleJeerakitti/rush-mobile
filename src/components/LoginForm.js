import React from 'react';
import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    Dimensions,
    LayoutAnimation,
    Platform,
    UIManager,
    AsyncStorage,
    Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Facebook } from 'expo';
import { 
    InputIcon, 
    AuthButton, 
    TextLine, 
    Spinner,
    AuthBg,
} from './common';
import { 
    YELLOW, 
    LIGHT_RED, 
    SERVER, 
    CLIENT_ID,
    CLIENT_SECRET, 
    LOGIN_APP, 
    LOGIN_FACEBOOK 
} from '../../config';
import { authLoginSuccess, } from '../actions';

const responsesiveLogo = () => {
    const { appName } = styles;
    const { width } = Dimensions.get('window');
    if (width > 375) {
        return ({ 
            logoSize: { width: 132, height: 185 }, 
            headerName: appName  
        });
    } else if (width > 320) {
        return ({ 
            logoSize: { width: 105.6, height: 148 }, 
            headerName: { ...appName, fontSize: 32 } 
        });
    }
    return ({ 
        logoSize: { width: 88, height: 123.33 }, 
        headerName: { ...appName, fontSize: 27 } 
    });
};

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secureTextEntry: true,
            email: '',
            password: '',
            error: '',
            loading: false,
            ...responsesiveLogo(),
        };
    }

    async onChangeState(key, data) {
        await this.setState({ error: '', [key]: data });
    }

    async getAPI(content, data) {
        try {
            this.onChangeState('loading', true);
            const response = await fetch(`${SERVER}${content}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            this.onChangeState('loading', false);
            return responseData;
        } catch (error) {
            this.onChangeState('loading', false);
            Alert.alert('Connect lost try again!');
        }
    }

    async getAccessTokenFacebook(token) {
        const data = {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: 'convert_token',
            backend: 'facebook',
            token,
        };
        const response = await this.getAPI(LOGIN_FACEBOOK, data);
        this.isCustomer(response);
    }

    async getAccessTokenApp() {
        const data = {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: 'password',
            username: this.state.email,
            password: this.state.password,
        };
        const response = await this.getAPI(LOGIN_APP, data);
        this.isCustomer(response);
    }

    async logInFB() {
        try {
            const {
                type,
                token,
                // expires,
                // permissions,
                // declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync('322995281815548', {
                behavior: 'native',
                permissions: ['public_profile', 'user_birthday', 'user_gender', 'email'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,birthday,gender,picture.type(large)`);
                // const responseJson = await response.json();
                this.getAccessTokenFacebook(token);
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            Alert.alert(`Facebook Login Error: ${message}`);
        }
    }

    isCustomer(response) {
        if (response.role === 'customer') {
            this.storeData(response.token);
            this.props.authLoginSuccess(response);
            Actions.app();
        } else {
            this.onChangeState('error', 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
        }
    }

    async storeData(token) {
        try {
          await AsyncStorage.setItem('token', JSON.stringify(token));
        } catch (error) {
          // Error saving data
          Alert.alert('Cannot save your login history, you should try to loging out and log in again!');
        }
    }
    
    renderLoginButton() {
        const { loading, error } = this.state;
        const { maxWidth, errorText, marginTop10 } = styles;

        if (loading) {
            return <Spinner />;
        }
        return (
            <View style={maxWidth}>
                <Text style={errorText}>{error}</Text>
                <AuthButton 
                    color={YELLOW}
                    onPress={() => this.getAccessTokenApp()}
                >
                    เข้าสู่ระบบ
                </AuthButton>
                <AuthButton 
                    color={'#3b5998'}
                    onPress={this.logInFB.bind(this)}
                    style={marginTop10}
                    facebook
                >
                    เข้าสู่ระบบด้วย Facebook
                </AuthButton>
                <TextLine title='or' />
                <AuthButton 
                    color={LIGHT_RED}
                    onPress={() => Actions.register()}
                >
                    สมัครสมาชิก
                </AuthButton>
            </View>
        );
    }


    render() {
        const { linkRight, height10, height20, white, } = styles;
        const { secureTextEntry, logoSize, headerName, email, password, } = this.state;
        LayoutAnimation.easeInEaseOut();
        if (Platform.OS === 'android') {
            // UIManager.setLayoutAnimationEnabledExperimental && 
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        
        return (
            <AuthBg>

                {/* -- Logo Section -- */}
                <Image 
                    style={logoSize}
                    source={require('../images/r-logo.png')}
                />
                <View>
                    <Text style={headerName}>
                        R U S H
                    </Text>
                </View>

                <Divider style={height10} />
                
                {/* -- Input Section -- */}
                <InputIcon 
                    value={email}
                    placeholder='E-mail'
                    iconName='user'
                    type='evilicon'
                    onChangeText={(text) => this.onChangeState('email', text)}
                />
                <InputIcon
                    placeholder='Password'
                    iconName='lock'
                    type='evilicon'
                    secureTextEntry={secureTextEntry}
                    password
                    value={password}
                    onChangeText={(text) => this.onChangeState('password', text)}
                    onPress={() => this.onChangeState('secureTextEntry', !secureTextEntry)}
                />
                <TouchableOpacity 
                    style={linkRight} 
                    onPress={() => Actions.forget()}
                >
                    <Text style={white}>
                        forget password?
                    </Text>
                </TouchableOpacity>

                <Divider style={height20} />

                {/* -- AuthButton Section -- */}
                {this.renderLoginButton()}

            </AuthBg>
        );
    }
}

const styles = {
    appName: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
    },
    linkRight: {
        alignSelf: 'flex-end',
        marginHorizontal: 30,
        marginTop: 5,
    },
    errorText: {
        alignSelf: 'center', 
        paddingBottom: 10, 
        color: LIGHT_RED, 
        shadowColor: 'black', 
        shadowOpacity: 0.5, 
        shadowOffset: { width: 1, height: 1 }, 
        textAlign: 'center',
    },
    maxWidth: {
        width: '100%',
    },
    marginTop10: {
        marginTop: 10,
    },
    height10: {
        height: 10,
    },
    height20: {
        height: 20,
    },
    white: {
        color: 'white',
    },
};

export default connect(null, { authLoginSuccess, })(LoginForm);
