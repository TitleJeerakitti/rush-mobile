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
} from 'react-native';
import { connect } from 'react-redux';
import { Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Expo from 'expo';
import { 
    InputIcon, 
    AuthButton, 
    TextLine, 
    Spinner,
    AuthBg,
} from './common';
import { YELLOW, LIGHT_RED, SERVER, CLIENT_ID, CLIENT_SECRET, LOGIN_APP } from '../../config';
import { 
    authEmailChange,
    authPasswordChange,
    authLogin,
    authToRegister,
    authForgetPassword,
    authFacebookLogin,
    authLoginSuccess,
    authLoginFailed,
} from '../actions';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secureTextEntry: true,
            ...this.responsesiveLogo(),
        };
    }

    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

    onEmailChange(text) {
        this.props.authEmailChange(text);
    }

    onPasswordChange(text) {
        this.props.authPasswordChange(text);
    }

    onUserLogin() {
        this.logInUser();
    }

    async getAPI(content, data) {
        try {
            const response = await fetch(`${SERVER}${content}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }

    async getAccessTokenFacebook(token) {
        try {
            const response = await fetch(`${SERVER}/auth/login-facebook/`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    grant_type: 'convert_token',
                    backend: 'facebook',
                    token,
                }),
            });
            const responseData = await response.json();
            if (responseData.role === 'customer') {
                this.props.authLoginSuccess(responseData);
                Actions.app();
            } else {
                this.props.authLoginFailed('error');
            }
        } catch (error) {
            console.log(error);
        }
        // this.refreshToken(responseData);
    }

    responsesiveLogo() {
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
    }

    async logInFB() {
        try {
          const {
            type,
            token,
            // expires,
            // permissions,
            // declinedPermissions,
          } = await Expo.Facebook.logInWithReadPermissionsAsync('322995281815548', {
            permissions: ['public_profile', 'user_birthday', 'user_gender', 'email'],
          });
          if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,birthday,gender,picture.type(large)`);
            const responseJson = await response.json();
            // console.log(response);
            // console.log(responseJson);
            // console.log('success with ', `Hi ${responseJson.name}!`);
            /* this.props.authFacebookLogin(token, responseJson); */
            // Actions.app();
            this.getAccessTokenFacebook(token);
          } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
    }

    async logInUser() {
        const data = {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: 'password',
            username: this.props.email,
            password: this.props.password,
        };
        const response = await this.getAPI(LOGIN_APP, data);
        if (response.role === 'customer') {
            console.log(response.token.access_token);
            this.storeData(response.token.access_token);
            this.props.authLoginSuccess(response);
            Actions.app();
        } else {
            this.props.authLoginFailed('error');
        }
    }

    async storeData(token) {
        try {
          await AsyncStorage.setItem('access_token', token);
        } catch (error) {
          // Error saving data
          console.log(error);
        }
      }
    
    renderLoginButton() {
        const { loading, error } = this.props;
        const { maxWidth, errorText, marginTop10 } = styles;

        if (loading) {
            return (
                <Spinner />
            );
        }
        return (
            <View style={maxWidth}>
                <Text style={errorText}>{error}</Text>
                <AuthButton 
                    color={YELLOW}
                    onPress={this.onUserLogin.bind(this)}
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
                    onPress={() => this.props.authToRegister()}
                >
                    สมัครสมาชิก
                </AuthButton>
            </View>
        );
    }


    render() {
        const { linkRight, height10, height20, white, } = styles;
        const { secureTextEntry, logoSize, headerName } = this.state;
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
                    value={this.props.email}
                    placeholder='E-mail'
                    iconName='user'
                    type='evilicon'
                    onChangeText={this.onEmailChange.bind(this)}
                />
                <InputIcon
                    placeholder='Password'
                    iconName='lock'
                    type='evilicon'
                    secureTextEntry={secureTextEntry}
                    password
                    value={this.props.password}
                    onChangeText={this.onPasswordChange.bind(this)}
                    onPress={() => this.setState({ secureTextEntry: !secureTextEntry })}
                />
                <TouchableOpacity 
                    style={linkRight} 
                    onPress={() => this.props.authForgetPassword()}
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
        marginHorizontal: '12%',
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

const mapStateToProps = ({ auth }) => {
    const { email, password, user, loading, error } = auth;
    return { email, password, user, loading, error };
};

export default connect(mapStateToProps, {
    authEmailChange,
    authPasswordChange,
    authLogin,
    authToRegister,
    authForgetPassword,
    authFacebookLogin,
    authLoginSuccess,
    authLoginFailed,
})(LoginForm);
