import React from 'react';
import { View, Text } from 'react-native';
import { Constants } from 'expo';
import { ifIphoneX, getBottomSpace } from 'react-native-iphone-x-helper';
import { YELLOW } from './common/colors';

class SideMenu extends React.Component {
    render() {
        const { 
            container, 
            profileContainer, 
            menuContainer, 
            signoutContainer, 
            signoutText 
        } = styles;

        return (
            <View style={container}>
                <View style={profileContainer}>
                    <Text>profile</Text>
                </View>
                <View style={menuContainer}>
                    <Text>list menu</Text>
                </View>
                <View style={signoutContainer}>
                    <Text style={signoutText}>ออกจากระบบ</Text>
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    profileContainer: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: YELLOW,
    },
    menuContainer: {
        flex: 1,
    },
    signoutContainer: {
        backgroundColor: YELLOW,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        ...ifIphoneX({
            paddingBottom: getBottomSpace()
        })
    },
    signoutText: {
        color: 'white',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 14,
    },
};

export default SideMenu;
