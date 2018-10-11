import React from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Constants, } from 'expo';
import { ifIphoneX, getBottomSpace } from 'react-native-iphone-x-helper';
import { CardSection, ButtonSideList } from './common';
import { authLogout } from '../actions';
import { YELLOW } from './common/colors';

class SideMenu extends React.Component {

    render() {
        const { 
            container, 
            profileContainer,
            signoutContainer,
            signoutText,
            avatarStyle,
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
                    <CardSection>
                        <Avatar 
                            large
                            rounded
                            title='TJ'
                            activeOpacity={1}
                            containerStyle={avatarStyle}
                        />
                        <View style={nameContainer}>
                            <Text 
                                style={{ color: 'white', fontSize: 20, }} 
                                numberOfLines={1}
                            >
                                Title Jeerakitti
                            </Text>
                            <Text style={{ color: 'white' }}>081-234-5678</Text>
                        </View>
                    </CardSection>
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
                    <TouchableOpacity onPress={() => this.props.authLogout()} >
                        <Text style={signoutText}>ออกจากระบบ</Text>
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
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 14,
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

export default connect(null, { authLogout })(SideMenu);
