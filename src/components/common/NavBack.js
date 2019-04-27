import React from 'react';
import { TouchableOpacity, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { NavCard, NavContainer, NavTitle, } from '../common';

class NavBackComponent extends React.Component {

    renderIcon() {
        const { onRight } = this.props;
        if (onRight) {
            return (
                <TouchableOpacity 
                    onPress={onRight}
                    activeOpacity={1}
                >
                    <Icon 
                        name='food'
                        type='material-community'
                        color='white'
                        size={30}
                    />
                    {this.renderNotify()}
                </TouchableOpacity>
            );
        }
    }

    renderNotify() {
        const { menuData } = this.props;
        if (menuData.main_categories !== undefined) {
            const total = menuData.main_categories.reduce((amount, mainCategory) => {
                mainCategory.sub_categories.forEach(subCategory => {
                    subCategory.menus.forEach(menu => {
                        amount += menu.quantity;
                    });
                });
                return amount;
            }, 0);
            if (total > 99) {
                return (
                    <View style={styles.notifyBox} >
                        <Text style={{ color: 'white' }}>
                            99+
                        </Text>
                    </View>
                );
            } else if (total > 0) {
                return (
                    <View style={styles.notifyBox} >
                        <Text style={{ color: 'white' }}>
                            {total}
                        </Text>
                    </View>
                );
            }
        }
    }

    renderTitle() {
        const { reduxTitle, title, } = this.props;
        if (reduxTitle) {
            return (
                <NavTitle>{this.props.currentRestaurant}</NavTitle>
                // <NavTitle>{restaurantTitle}</NavTitle>
            );
        }
        return (<NavTitle>{title}</NavTitle>);
    }

    render() {
        return (
            <NavContainer>
                <NavCard>
                    <TouchableWithoutFeedback 
                        onPress={this.props.onLeft}
                    >
                        <Icon 
                            name='chevron-left'
                            type='evilicon'
                            color='white'
                            size={40}
                        />
                    </TouchableWithoutFeedback>
                </NavCard>
                {this.renderTitle()}
                <NavCard>
                    {this.renderIcon()}
                </NavCard>
            </NavContainer>
        );
    }
}

const mapStateToProps = ({ restaurant }) => {
    const { currentRestaurant, menuData } = restaurant;
    return { currentRestaurant, menuData };
};

const styles = {
    notifyBox: {
        minWidth: 22,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', 
        right: '-10%', 
        top: '-10%', 
        backgroundColor: 'red',
        borderRadius: 11,
        paddingHorizontal: 5,
    }
};

const NavBack = connect(mapStateToProps)(NavBackComponent);
export { NavBack };
