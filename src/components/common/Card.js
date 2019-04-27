import React from 'react';
import { View } from 'react-native';

const Card = ({ children, style }) => {
    return (
        <View style={{ marginTop: 10, ...style }}>
            {children}
        </View>
    );
};

export { Card };
