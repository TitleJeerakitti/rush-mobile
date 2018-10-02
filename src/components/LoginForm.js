import React from 'react';
import { 
    View, 
    Text, 
    KeyboardAvoidingView, 
    Image, 
    StyleSheet, 
    StatusBar,
    TouchableOpacity
} from 'react-native';
import { BlurView } from 'expo';
import { Divider } from 'react-native-elements';
import { InputIcon, Button, TextLine } from './common';

class LoginForm extends React.Component {
    render() {
        const { container, appName, linkRight } = styles;
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
                            style={{ width: 132, height: 185 }}
                            source={require('../images/r-logo.png')}
                        />
                        <Text style={appName}>
                            R U S H
                        </Text>

                        <Divider style={{ height: 10 }} />
                        
                        {/* -- Input Section -- */}
                        <InputIcon placeholder='E-mail' iconName='user' />
                        <InputIcon placeholder='Password' iconName='lock' />
                        <TouchableOpacity style={linkRight}>
                            <Text style={{ color: 'white' }}>
                                forget password?
                            </Text>
                        </TouchableOpacity>

                        <Divider style={{ height: 20 }} />

                        {/* -- Button Section -- */}
                        <Button color='#FFA80D'>
                            เข้าสู่ระบบ
                        </Button>
                        <TextLine title='or' />
                        <Button color='#EF4036'>
                            สมัครสมาชิก
                        </Button>

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
};

export default LoginForm;
