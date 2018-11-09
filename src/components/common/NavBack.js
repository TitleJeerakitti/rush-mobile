import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { NavCard, NavContainer, NavTitle } from '../common';

class NavBack extends React.Component {
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

    render() {
        const { title } = this.props;
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
                <NavTitle>{title}</NavTitle>
                <NavCard>
                    {this.renderIcon()}
                </NavCard>
            </NavContainer>
        );
    }
}

export { NavBack };
