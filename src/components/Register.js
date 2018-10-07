import React from 'react';
import { 
    Text,
    View,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux'; 
import { 
    InputIcon, 
    Button, 
    Spinner, 
    AuthBg, 
    AuthCard 
} from './common';
import {
    authNameChange,
    authPhoneChange,
    authEmailChange,
    authPasswordChange,
    authCreateUser,
} from '../actions';

class Register extends React.Component {

    state = {
        secureTextEntry: true,
    };

    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

    onNameChange(text) {
        this.props.authNameChange(text);
    }

    onPhoneChange(text) {
        this.props.authPhoneChange(text);
    }

    onEmailChange(text) {
        this.props.authEmailChange(text);
    }

    onPasswordChange(text) {
        this.props.authPasswordChange(text);
    }

    onCreateUser() {
        const { email, password } = this.props;
        this.props.authCreateUser(email, password);
    }

    renderButton() {
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
                    color='#EF4036'
                    onPress={this.onCreateUser.bind(this)}
                >
                    ลงทะเบียน
                </Button>
            </View>
        );
    }

    render() {
        const { headerStyle } = styles;
        const { secureTextEntry } = this.state;
        if (Platform.OS === 'android') {
            // UIManager.setLayoutAnimationEnabledExperimental && 
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }

        return (
            <AuthBg>
                <AuthCard>
                    <Text style={headerStyle}>กรุณากรอกข้อมูลด้านล่าง</Text>
                    <InputIcon
                        placeholder='ชื่อ-สกุล'
                        iconName='account-circle'
                        type='meterial-community'
                        addStyle={{ marginHorizontal: '10%' }}
                        onChangeText={this.onNameChange.bind(this)}
                        value={this.props.name}
                    />
                    <InputIcon
                        placeholder='เบอร์โทรศัพท์'
                        iconName='phone'
                        type='meterial-community'
                        addStyle={{ marginHorizontal: '10%' }}
                        onChangeText={this.onPhoneChange.bind(this)}
                        value={this.props.phone}
                    />
                    <InputIcon
                        placeholder='อีเมล'
                        iconName='mail'
                        type='meterial-community'
                        addStyle={{ marginHorizontal: '10%' }}
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                    <InputIcon
                        placeholder='รหัสผ่าน'
                        iconName='lock'
                        type='meterial-community'
                        addStyle={{ marginHorizontal: '10%' }}
                        secureTextEntry={secureTextEntry}
                        password
                        onChangeText={this.onPasswordChange.bind(this)}
                        onPress={() => 
                            this.setState({ secureTextEntry: !secureTextEntry, })}
                        value={this.props.password}
                    />
                    <Divider style={{ height: 10 }} />
                    {this.renderButton()}
                </AuthCard>
            </AuthBg>
        );
    }
}

const styles = {
    errorText: {
        alignSelf: 'center', 
        paddingBottom: 10, 
        color: '#EF4036', 
        shadowColor: 'black', 
        shadowOpacity: 0.2, 
        shadowOffset: { width: 1, height: 1 }, 
        textAlign: 'center',
    },
    headerStyle: {
        fontSize: 16, 
        color: 'white',
    },
};

const mapStateToProps = ({ auth }) => {
    const { name, phone, email, password, loading, error } = auth;
    return { name, phone, email, password, loading, error };
};

export default connect(mapStateToProps, {
    authNameChange,
    authPhoneChange,
    authEmailChange,
    authPasswordChange,
    authCreateUser,
})(Register);
