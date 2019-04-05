import React from 'react';
import { View, Text, UIManager, LayoutAnimation, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AuthButton, InputIcon, Spinner, AuthBg, AuthCard, } from './common';
import { LIGHT_RED, SERVER, FORGET_PASSWORD, DARK_RED } from '../../config';

class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error: '',
            loading: false,
        };
    }

    async onChangeState(key, data) {
        await this.setState({ error: '', [key]: data });
    }

    async forgetPassword() {
        try {
            this.onChangeState('loading', true);
            const response = await fetch(`${SERVER}${FORGET_PASSWORD}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email,
                }),
            });
            if (response.status === 200) {
                Actions.pop();
            } else {
                this.onChangeState('loading', false);
                this.onChangeState('error', 'ไม่มีอีเมลนี้ในระบบ');
            }
        } catch (err) {
            this.onChangeState('loading', false);
            console.log(err);
        }
    }

    renderButton() {
        const { loading, error, } = this.state;
        if (loading) {
            return <Spinner style={{ marginTop: 10, }} />;
        }
        return (
            <View style={{ width: '100%' }}>
                <Text style={styles.errorText}>{error}</Text>
                <AuthButton 
                    color={LIGHT_RED}
                    onPress={() => this.forgetPassword()}
                >
                    Reset Password
                </AuthButton>
            </View>
        );
    }

    render() {
        if (Platform.OS === 'android') {
            // UIManager.setLayoutAnimationEnabledExperimental && 
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        LayoutAnimation.easeInEaseOut();
        const { headerStyle } = styles;
        return (
            <AuthBg>
                <AuthCard>
                    <Text style={headerStyle}>กรอก E-mail ของคุณ</Text>
                    <Text style={headerStyle}>ที่กล่องข้อความด้านล่าง</Text>
                    <Text style={headerStyle}>เพื่อทำการ Reset Password</Text>
                    <InputIcon
                        placeholder='อีเมล'
                        iconName='account-circle'
                        type='meterial-community'
                        addStyle={{ marginHorizontal: 30 }}
                        onChangeText={(text) => this.onChangeState('email', text)}
                        value={this.state.email}
                    />
                    {this.renderButton()}
                </AuthCard>
            </AuthBg>
        );
    }
}

const styles = {
    headerStyle: {
        fontSize: 16,
        color: 'white',
    },
    errorText: {
        color: DARK_RED,
        textAlign: 'center',
        padding: 10,
    }
};

export default ForgetPassword;
