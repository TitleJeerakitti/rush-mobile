import React from 'react';
import {
    View,
} from 'react-native';
import { YELLOW } from './colors';

const AuthCard = ({ children }) => {
    const { cardStyle } = styles;
    return (
        <View style={cardStyle}>
            {children}
        </View>
    );
};

const styles = {
    cardStyle: {
        width: '80%',
        backgroundColor: YELLOW,
        paddingVertical: 20,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: 'black', 
        shadowOpacity: 0.2, 
        shadowOffset: { width: 1, height: 1 }, 
    },
};

export { AuthCard };
