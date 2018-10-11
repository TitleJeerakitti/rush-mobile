import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Constants, } from 'expo';
import { ifIphoneX, getBottomSpace } from 'react-native-iphone-x-helper';
import { CardSection } from './common';
import { authLogout } from '../actions';
import { YELLOW } from './common/colors';

class SideMenu extends React.Component {

    componentWillMount() {
        const { width } = Dimensions.get('window');

        // Responsive Condition
        if (width > 375) {
            this.setState({ 
                ...this.state, 
                cardStyle: {
                    paddingHorizontal: 20,
                    paddingVertical: 15,
                }, 
                textListStyle: {
                    flex: 1,
                    marginLeft: '10%', 
                    justifyContent: 'center',
                }, 
                iconSize: 40,
                textSize: {
                    fontSize: 18,
                }
            });
        } else if (width > 320) {
            this.setState({ 
                ...this.state, 
                cardStyle: {
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                }, 
                textListStyle: {
                    flex: 1,
                    marginLeft: '5%', 
                    justifyContent: 'center',
                }, 
                iconSize: 35,
                textSize: {
                    fontSize: 16,
                }
            });
        } else {
            this.setState({ 
                ...this.state, 
                cardStyle: {
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                }, 
                textListStyle: {
                    flex: 1,
                    marginLeft: '5%', 
                    justifyContent: 'center',
                }, 
                iconSize: 30,
                textSize: {
                    fontSize: 16,
                }
            });
        }
    }

    render() {
        const { 
            container, 
            profileContainer, 
            menuContainer,
            signoutContainer,
            signoutText,
        } = styles;
        const { cardStyle, textListStyle, iconSize, textSize } = this.state;

        return (
            <View style={container}>
                <View style={profileContainer}>
                    <View style={{ alignItems: 'flex-end' }}>
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
                            containerStyle={{ 
                                borderWidth: 2, 
                                borderColor: 'white', 
                                shadowOpacity: 0.2, 
                                shadowColor: 'black', 
                                shadowOffset: { width: 0, height: 1 }, 
                            }}
                        />
                        <View style={{ marginLeft: '5%', justifyContent: 'center', flex: 1 }}>
                            <Text style={{ color: 'white', fontSize: 20, }} numberOfLines={1}>Title Jeerakitti</Text>
                            <Text style={{ color: 'white' }}>081-234-5678</Text>
                        </View>
                    </CardSection>
                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={() => Actions.profile()}>
                            <Icon name='gear' type='evilicon' color='white' />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={menuContainer}>
                    <TouchableOpacity onPress={() => Actions.currentScene === 'home_homepage' ? Actions.drawerClose() : Actions.homepage()} >
                        <View style={cardStyle}>
                            <CardSection>
                                <Icon name='home' type='material-community' size={iconSize} />
                                <View style={textListStyle}>
                                    <Text style={textSize}>หน้าหลัก</Text>
                                </View>
                            </CardSection>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Actions.currentScene === 'home_history' ? Actions.drawerClose() : Actions.history()} >
                        <View style={cardStyle}>
                            <CardSection>
                                <Icon name='history' type='material-community' size={iconSize} />
                                <View style={textListStyle}>
                                    <Text style={textSize}>ประวัติการสั่งอาหาร</Text>
                                </View>
                            </CardSection>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Actions.currentScene === 'home_queue' ? Actions.drawerClose() : Actions.queue()} >
                        <View style={cardStyle}>
                            <CardSection>
                                <Icon name='account-multiple' type='material-community' size={iconSize} />
                                <View style={textListStyle}>
                                    <Text style={textSize}>กำลังดำเนินการ</Text>
                                </View>
                            </CardSection>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Actions.currentScene === 'home_sale' ? Actions.drawerClose() : Actions.sale()} >
                        <View style={cardStyle}>
                            <CardSection>
                                <Icon name='sale' type='material-community' size={iconSize} />
                                <View style={textListStyle}>
                                    <Text style={textSize}>โปรโมชั่น</Text>
                                </View>
                            </CardSection>
                        </View>
                    </TouchableOpacity>
                </View>
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
        backgroundColor: '#eee',
    },
    profileContainer: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: YELLOW,
        padding: 15,
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
    cardStyle: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    textListStyle: {
        marginLeft: '10%', 
        justifyContent: 'center',
    }
};

export default connect(null, { authLogout })(SideMenu);
