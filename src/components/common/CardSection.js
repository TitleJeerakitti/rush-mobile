import React from 'react';
import { View } from 'react-native';

const CardSection = ({ children, style }) => {
    return (
        <View style={{ marginHorizontal: 10, ...style }}>
            {children}
        </View>
    );
};

export { CardSection };
