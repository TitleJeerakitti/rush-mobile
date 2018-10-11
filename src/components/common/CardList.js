import React from 'react';
import { View } from 'react-native';

const Card = ({ children }) => {
    return (
        <View style={{ flexDirection: 'column' }}>
            {children}
        </View>
    );
};

export { Card };
