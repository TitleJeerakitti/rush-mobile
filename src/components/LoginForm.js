import React from 'react';
import { View, Text, KeyboardAvoidingView, Image } from 'react-native';
import { Card, InputIcon } from './common';

class LoginForm extends React.Component {
    render() {
        const { container, appName } = styles;
        return (
            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView style={container}>
                    <Image 
                        style={{ width: 132, height: 185 }}
                        source={require('../images/r-logo.png')}
                    />
                    <Text style={appName}>R U S H</Text>
                    <Card>
                        <InputIcon />
                    </Card>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    appName: {
        fontSize: 40,
        fontWeight: 'bold'
    }
};

export default LoginForm;
