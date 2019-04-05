import React from 'react';
import { View, Text, TouchableOpacity, AsyncStorage, } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Constants, } from 'expo';
import { ifIphoneX, getBottomSpace } from 'react-native-iphone-x-helper';
import { Row, ButtonSideList, FontText } from './common';
import { authLogOut } from '../actions';
import { YELLOW, SERVER, LOGOUT, CLIENT_ID, CLIENT_SECRET } from '../../config';

class SideMenu extends React.Component {
    async onLogOut() {
        try {
            const { token_type, access_token } = this.props.token;
            const response = await fetch(`${SERVER}${LOGOUT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token_type} ${access_token}`
                },
                body: JSON.stringify({
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    token: access_token,
                }),
            });
            if (response.status === 200) {
                this.removeToken();
                Actions.reset('auth');
                this.props.authLogOut();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async removeToken() {
        try {
          await AsyncStorage.removeItem('token');
        } catch (error) {
          // Error saving data
          console.log(error);
        }
    }

    renderPicture() {
        const { userInfo } = this.props;
        const { avatarStyle } = styles;
        return (
            <Avatar 
                large
                rounded
                source={{ 
                    uri: userInfo.picture.data !== undefined ? 
                    userInfo.picture.data.url : userInfo.picture 
                }}
                activeOpacity={1}
                containerStyle={avatarStyle}
            />
        );
    }

    renderPhone() {
        const { userInfo } = this.props;
        return (
            <Text style={{ color: 'white' }}>
                {userInfo.tel_number !== undefined ? userInfo.tel_number : ''}
            </Text>
        );
    }

    render() {
        const { 
            container, 
            profileContainer,
            signoutContainer,
            signoutText,
            flexEnd,
            nameContainer,
        } = styles;

        return (
            <View style={container}>

                {/* Top Profile Section */}
                <View style={profileContainer}>
                    <View style={flexEnd}>
                        <TouchableOpacity onPress={() => Actions.drawerClose()}>
                            <Icon name='close' type='evilicon' color='white' />
                        </TouchableOpacity>
                    </View>
                    <Row>
                        {this.renderPicture()}
                        <View style={nameContainer}>
                            <Text 
                                style={{ color: 'white', fontSize: 20, }} 
                                numberOfLines={1}
                            >
                                {this.props.userInfo ? this.props.userInfo.name : 'Guest'}
                            </Text>
                            {this.renderPhone()}
                        </View>
                    </Row>
                    <View style={flexEnd}>
                        <TouchableOpacity onPress={() => Actions.profile()}>
                            <Icon name='gear' type='evilicon' color='white' />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* List of actions */}
                <View style={container}>
                    <ButtonSideList title='เมนูหลัก' iconName='home' type='homepage' />
                    <ButtonSideList title='ประวัติการสั่งอาหาร' iconName='history' type='history' />
                    <ButtonSideList 
                        title='กำลังดำเนินการ' 
                        iconName='account-multiple' 
                        type='queue' 
                    />
                    <ButtonSideList title='โปรโมชั่น' iconName='sale' type='sale' />
                </View>

                {/* Buttom Sign Out Section */}
                <View style={signoutContainer}>
                    <TouchableOpacity onPress={() => this.onLogOut()} >
                        <FontText style={signoutText}>ออกจากระบบ</FontText>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
    },
    profileContainer: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: YELLOW,
        padding: 15,
    },
    signoutContainer: {
        backgroundColor: YELLOW,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        ...ifIphoneX({
            paddingBottom: getBottomSpace()
        }),
    },
    signoutText: {
        color: 'white',
        // paddingVertical: 5,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 15,
    },
    avatarStyle: {
        borderWidth: 2, 
        borderColor: 'white', 
        shadowOpacity: 0.2, 
        shadowColor: 'black', 
        shadowOffset: { width: 0, height: 1 }, 
    },
    flexEnd: {
        alignItems: 'flex-end',
    },
    nameContainer: {
        marginLeft: '5%',
        justifyContent: 'center',
        flex: 1,
    }
};

const mapStateToProp = ({ auth }) => {
    const { userInfo, token } = auth;
    return { userInfo, token };
};

export default connect(mapStateToProp, { authLogOut })(SideMenu);
