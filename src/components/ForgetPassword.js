import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { 
    authForgetRequest,
    authEmailChange,
} from '../actions';
import { 
    Button,
    InputIcon,
    Spinner,
    AuthBg,
    AuthCard,
} from './common';

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
                    Reset Password
                </Button>
            </View>
        );
    }

    render() {
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
                        addStyle={{ marginHorizontal: '10%' }}
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                    <Divider style={{ height: 10 }} />
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
};

const mapStateToProps = ({ auth }) => {
    const { error, loading, email } = auth;
    return { error, loading, email };
};

export default connect(mapStateToProps, {
    authForgetRequest,
    authEmailChange,
})(ForgetPassword);
