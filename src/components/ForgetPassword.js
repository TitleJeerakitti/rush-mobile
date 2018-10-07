import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    KeyboardAvoidingView
} from 'react-native';
import { BlurView } from 'expo';
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { 
    authForgetRequest,
    authEmailChange,
} from '../actions';
import { Button, InputIcon, Spinner } from './common';

class ForgetPassword extends React.Component {
    onEmailChange(text) {
        this.props.authEmailChange(text);
    }

    renderButton() {
        const { loading, error, email } = this.props;
        if (loading) {
            return <Spinner />;
        }
        return (
            <View style={{ width: '100%' }}>
                <Text style={styles.errorText}>{error}</Text>
                <Button 
                    color='#EF4036'
                    onPress={() => this.props.authForgetRequest(email)}
                >
                    ลงทะเบียน
                </Button>
            </View>
        );
    }

    render() {
        const { container, cardStyle, headerStyle } = styles;
        return (
            <View style={{ flex: 1 }}>
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
                        <View style={cardStyle}>
                            <Text style={headerStyle}>กรอก E-mail ของคุณ</Text>
                            <Text style={headerStyle}>ที่กล่องข้อความด้านล่าง</Text>
                            <Text style={headerStyle}>เพื่อทำการ Reset Password</Text>
                            <InputIcon
                                placeholder='อีเมล'
                                iconName='account-circle'
                                type='meterial-community'
                                addStyle={{ marginHorizontal: '10%' }}
                                onChangeText={this.onEmailChange.bind(this)}
                                value={this.props.email}
                            />
                            <Divider style={{ height: 10 }} />
                            {this.renderButton()}
                        </View>
                    </KeyboardAvoidingView>
                </BlurView>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardStyle: {
        width: '80%',
        backgroundColor: '#FFA80D',
        paddingVertical: 20,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: 'black', 
        shadowOpacity: 0.2, 
        shadowOffset: { width: 1, height: 1 }, 
    },
    headerStyle: {
        fontSize: 16,
        color: 'white',
    },
};

const mapStateToProps = ({ auth }) => {
    const { error, loading, email } = auth;
    return { error, loading, email };
};

export default connect(mapStateToProps, {
    authForgetRequest,
    authEmailChange,
})(ForgetPassword);
