import React from 'react';
import { TouchableWithoutFeedback, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import { NavContainer, NavCard, NavTitle } from '../common';

class NavHamberger extends React.Component {
    renderSearch() {
        const { search, onRight } = this.props;
        if (search) {
            return (
                <TouchableWithoutFeedback onPress={onRight}>
                    <Icon 
                        name='search' 
                        type='evilicon' 
                        color='white' 
                    />
                </TouchableWithoutFeedback>
            );
        }
    }

    render() {
        const { title } = this.props;
        return (
            <NavContainer>
                <NavCard>
                    <TouchableWithoutFeedback onPress={Actions.drawerOpen}>
                        <Icon 
                            name='navicon' 
                            type='evilicon' 
                            color='white'
                        />
                    </TouchableWithoutFeedback>
                </NavCard>
                <NavTitle>{title}</NavTitle>
                <NavCard>
                    {this.renderSearch()}
                </NavCard>
            </NavContainer>
        );
    }
}

export { NavHamberger };
