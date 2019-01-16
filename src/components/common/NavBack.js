import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { NavCard, NavContainer, NavTitle } from '../common';

class NavBackComponent extends React.Component {

    renderIcon() {
        const { onRight } = this.props;
        if (onRight) {
            return (
                <TouchableWithoutFeedback onPress={onRight}>
                    <Icon 
                        name='food'
                        type='material-community'
                        color='white'
                        size={30}
                    />
                </TouchableWithoutFeedback>
            );
        }
    }

    renderTitle() {
        const { reduxTitle, title } = this.props;
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
                    <TouchableWithoutFeedback onPress={() => Actions.pop()}>
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
    const { currentRestaurant } = restaurant;
    return { currentRestaurant };
};

const NavBack = connect(mapStateToProps)(NavBackComponent);

export { NavBack };
