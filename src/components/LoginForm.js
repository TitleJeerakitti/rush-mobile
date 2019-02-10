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
} from 'react-native';
import { connect } from 'react-redux';
import { Divider } from 'react-native-elements';
import Expo from 'expo';
import { 
    InputIcon, 
    AuthButton, 
    TextLine, 
    Spinner,
    AuthBg,
} from './common';
import { YELLOW, LIGHT_RED } from './common/config';
import { 
    authEmailChange,
    authPasswordChange,
    authLogin,
    authToRegister,
    authForgetPassword,
    authFacebookLogin,
} from '../actions';

class LoginForm extends React.Component {
    state = {
        secureTextEntry: true,
    }

    componentWillMount() {
        const { appName } = styles;
        const { width } = Dimensions.get('window');

        // Responsive Condition
        if (width > 375) {
            this.setState({ 
                ...this.state, 
                logoSize: { width: 132, height: 185 }, 
                headerName: appName  
            });
        } else if (width > 320) {
            this.setState({ 
                ...this.state, 
                logoSize: { width: 105.6, height: 148 }, 
                headerName: { ...appName, fontSize: 32 } 
            });
        } else {
            this.setState({ 
                ...this.state, 
                logoSize: { width: 88, height: 123.33 }, 
                headerName: { ...appName, fontSize: 27 } 
            });
        }
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
        const { email, password } = this.props;
        this.props.authLogin(email, password);
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
            // console.log(token);
            console.log(responseJson);
            // console.log('success with ', `Hi ${responseJson.name}!`);
            this.props.authFacebookLogin(token, responseJson);
            // Actions.app();
          } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
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
})(LoginForm);
