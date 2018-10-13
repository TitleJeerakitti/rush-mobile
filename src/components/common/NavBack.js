import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { NavCard, NavContainer, NavTitle } from '../common';

class NavBack extends React.Component {
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
                    <Icon 
                        name='food'
                        type='material-community'
                        color='white'
                        size={30}
                    />
                </NavCard>
            </NavContainer>
        );
    }
}

export { NavBack };
