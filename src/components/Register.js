import React from 'react';
import { 
    Text,
    View,
    LayoutAnimation,
    Platform,
    UIManager,
    Alert,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux'; 
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Actions } from 'react-native-router-flux';
import { 
    InputIcon, 
    AuthButton, 
    Spinner, 
    AuthBg, 
    AuthCard 
} from './common';
import { LIGHT_RED, SERVER, REGISTER } from '../../config';
import {
    authNameChange,
    authPhoneChange,
    authEmailChange,
    authPasswordChange,
    authCreateUser,
} from '../actions';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secureTextEntry: true,
            name: '',
            surname: '',
            phone: '',
            email: '',
            password: '',
            birthday: null,
            loading: false,
            error: '',
            isDateTimePickerVisible: false,
        };
    }

    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

    async onChangeState(key, data) {
        await this.setState({ error: '', [key]: data });
    }

    async onRegister() {
        const { name, surname, phone, email, password, birthday } = this.state;
        const date = birthday ? 
            `${birthday.getFullYear()}-${birthday.getMonth() + 1}-${birthday.getDate()}` : null;
        this.onChangeState('loading', true);
        try {
            const response = await fetch(`${SERVER}${REGISTER}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        username: email,
                        password,
                        first_name: name,
                        last_name: surname,
                        email,
                    },
                    tel_number: `+66${phone.slice(1)}`,
                    birthday: date,
                }),
            });
            if (response.status === 201) {
                Actions.pop();
            } else {
                this.onChangeState('loading', false);
                this.onChangeState('error', 'คุณกรอกข้อมูลไม่ถูกต้อง');
            }
        } catch (error) {
            Alert.alert('Connect lost try again!');
        }
    }

    handleDatePicked = (date) => {
        this.onChangeState('isDateTimePickerVisible', false);
        this.onChangeState('birthday', date);
    };

    renderButton() {
        const { loading, error } = this.state;
        if (loading) {
            return (
                <Spinner />
            );
        }
        return (
            <View style={{ width: '100%' }}>
                <Text style={styles.errorText}>{error}</Text>
                <AuthButton 
                    color={LIGHT_RED}
                    onPress={() => this.onRegister()}
                >
                    ลงทะเบียน
                </AuthButton>
            </View>
        );
    }

    render() {
        const { headerStyle } = styles;
        const { 
            secureTextEntry, 
            name, 
            phone, 
            email,
            password, 
            surname, 
            birthday, 
            isDateTimePickerVisible, 
        } = this.state;

        if (Platform.OS === 'android') {
            // UIManager.setLayoutAnimationEnabledExperimental && 
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }

        return (
            <AuthBg>
                <AuthCard>
                    <Text style={headerStyle}>กรุณากรอกข้อมูลด้านล่าง</Text>
                    <InputIcon
                        placeholder='ชื่อ'
                        iconName='account-circle'
                        type='meterial-community'
                        addStyle={{ marginHorizontal: 30 }}
                        onChangeText={(text) => this.onChangeState('name', text)}
                        value={name}
                    />
                    <InputIcon
                        placeholder='นามสกุล'
                        iconName='account-circle'
                        type='meterial-community'
                        addStyle={{ marginHorizontal: 30 }}
                        onChangeText={(text) => this.onChangeState('surname', text)}
                        value={surname}
                    />
                    <InputIcon
                        placeholder='เบอร์โทรศัพท์'
                        iconName='phone'
                        type='meterial-community'
                        addStyle={{ marginHorizontal: 30 }}
                        onChangeText={(text) => this.onChangeState('phone', text)}
                        value={phone}
                    />
                    <InputIcon
                        placeholder='อีเมล'
                        iconName='mail'
                        type='meterial-community'
                        addStyle={{ marginHorizontal: 30 }}
                        onChangeText={(text) => this.onChangeState('email', text)}
                        value={email}
                    />
                    <InputIcon
                        placeholder='รหัสผ่าน'
                        iconName='lock'
                        type='meterial-community'
                        addStyle={{ marginHorizontal: 30 }}
                        secureTextEntry={secureTextEntry}
                        password
                        onChangeText={(text) => this.onChangeState('password', text)}
                        onPress={() => this.onChangeState('secureTextEntry', !secureTextEntry)}
                        value={password}
                    />
                    <InputIcon
                        onPress={() => this.setState({ isDateTimePickerVisible: true })}
                    >
                        {birthday ? `${birthday.toDateString()}` : 'กรุณาเลือกวันเกิดของคุณ'}
                    </InputIcon>
                    <DateTimePicker
                        isVisible={isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked.bind(this)}
                        onCancel={() => this.onChangeState('isDateTimePickerVisible', false)}
                        maximumDate={new Date()}
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
        color: LIGHT_RED, 
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
    const { loading, error } = auth;
    return { loading, error };
};

export default connect(mapStateToProps, {
    authNameChange,
    authPhoneChange,
    authEmailChange,
    authPasswordChange,
    authCreateUser,
})(Register);
