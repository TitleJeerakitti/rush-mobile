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
import DateTimePicker from 'react-native-modal-datetime-picker';
import { 
    InputIcon, 
    AuthButton, 
    Spinner, 
    AuthBg, 
    AuthCard 
} from './common';
import { LIGHT_RED, SERVER, REGISTER } from './common/config';
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
            birthday: '',
            loading: false,
            error: '',
            isDateTimePickerVisible: false,
        };
    }

    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

    onChangeState(key, data) {
        this.setState({ [key]: data });
    }

    async onRegister() {
        const { name, surname, phone, email, password, birthday } = this.state;
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
                    tel_number: phone,
                    birthday,
                }),
            });
            const responseData = await response.json();
            
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }

    showDateTimePicker() {
        this.onChangeState('isDateTimePickerVisible', true);
    }

    hideDateTimePicker() {
        this.onChangeState('isDateTimePickerVisible', false);
    }

    handleDatePicked = (date) => {
        console.log(date.getFullYear(), date.getMonth() + 1, date.getDate());
        this.hideDateTimePicker();
        this.onChangeState('birthday', `${date.toDateString()}`);
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
                    // onPress={this.onCreateUser.bind(this)}
                >
                    ลงทะเบียน
                </AuthButton>
            </View>
        );
    }

    render() {
        const { headerStyle } = styles;
        const { secureTextEntry, name, phone, email, password, surname } = this.state;
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
                        addStyle={{ marginHorizontal: '10%' }}
                        onChangeText={() => this.onChangeState('name', name)}
                        value={name}
                    />
                    <InputIcon
                        placeholder='นามสกุล'
                        iconName='account-circle'
                        type='meterial-community'
                        addStyle={{ marginHorizontal: 30 }}
                        onChangeText={() => this.onChangeState('surname', surname)}
                        value={surname}
                    />
                    <InputIcon
                        placeholder='เบอร์โทรศัพท์'
                        iconName='phone'
                        type='meterial-community'
                        addStyle={{ marginHorizontal: 30 }}
                        onChangeText={() => this.onChangeState('phone', phone)}
                        value={phone}
                    />
                    <InputIcon
                        placeholder='อีเมล'
                        iconName='mail'
                        type='meterial-community'
                        addStyle={{ marginHorizontal: 30 }}
                        onChangeText={() => this.onChangeState('email', email)}
                        value={email}
                    />
                    <InputIcon
                        placeholder='รหัสผ่าน'
                        iconName='lock'
                        type='meterial-community'
                        addStyle={{ marginHorizontal: 30 }}
                        secureTextEntry={secureTextEntry}
                        password
                        onChangeText={() => this.onChangeState('password', password)}
                        onPress={() => this.onChangeState('secureTextEntry', !secureTextEntry)}
                        value={password}
                    />
                    <InputIcon
                        onPress={() => this.setState({ isDateTimePickerVisible: true })}
                    >
                        {this.state.birthday ? this.state.birthday : 'กรุณากรอกวันเกิดของคุณ'}
                    </InputIcon>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
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
