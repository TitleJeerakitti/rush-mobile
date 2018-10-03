import React from 'react';
import { 
    View, 
    Text, 
    KeyboardAvoidingView, 
    Image, 
    StyleSheet, 
    StatusBar,
    TouchableOpacity, 
    Dimensions,
    LayoutAnimation,
} from 'react-native';
import { connect } from 'react-redux';
import { BlurView } from 'expo';
import { Divider } from 'react-native-elements';
import { InputIcon, Button, TextLine, Spinner } from './common';
import { 
    authEmailChange,
    authPasswordChange,
    authLogin,
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

    renderLoginButton() {
        const { loading, error } = this.props;

        if (loading) {
            return (
                <Spinner />
            );
        }
        return (
            <View style={{ width: '100%' }}>
                <Text style={styles.errorText}>{error}</Text>
                <Button 
                    color='#FFA80D'
                    onPress={this.onUserLogin.bind(this)}
                >
                    เข้าสู่ระบบ
                </Button>
                <TextLine title='or' />
                <Button color='#EF4036'>
                    สมัครสมาชิก
                </Button>
            </View>
        );
    }

    render() {
        const { container, linkRight } = styles;
        const { secureTextEntry, logoSize, headerName } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" />
                <Image
                    resizeMode='cover'
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    source={require('../images/bg_free.png')} 
                />
                <BlurView tint="dark" intensity={40} style={StyleSheet.absoluteFill}>
                    <KeyboardAvoidingView style={container} behavior="padding">

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

                        <Divider style={{ height: 10 }} />
                        
                        {/* -- Input Section -- */}
                        <InputIcon 
                            value={this.props.email}
                            placeholder='E-mail'
                            iconName='user'
                            onChangeText={this.onEmailChange.bind(this)}
                        />
                        <InputIcon
                            placeholder='Password'
                            iconName='lock' 
                            secureTextEntry={secureTextEntry}
                            password
                            value={this.props.password}
                            onChangeText={this.onPasswordChange.bind(this)}
                            onPress={() => this.setState({ secureTextEntry: !secureTextEntry })}
                        />
                        <TouchableOpacity style={linkRight}>
                            <Text style={{ color: 'white' }}>
                                forget password?
                            </Text>
                        </TouchableOpacity>

                        <Divider style={{ height: 20 }} />

                        {/* -- Button Section -- */}
                        {this.renderLoginButton()}

                    </KeyboardAvoidingView>
                </BlurView>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
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
        color: '#EF4036', 
        shadowColor: 'black', 
        shadowOpacity: 0.5, 
        shadowOffset: { width: 1, height: 1 }, 
        textAlign: 'center',
    }
};

const mapStateToProps = ({ auth }) => {
    const { email, password, user, loading, error } = auth;
    console.log(auth);
    return { email, password, user, loading, error };
};

export default connect(mapStateToProps, {
    authEmailChange,
    authPasswordChange,
    authLogin,
})(LoginForm);
