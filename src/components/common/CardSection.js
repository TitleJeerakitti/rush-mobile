import React from 'react';
import { View } from 'react-native';

const CardSection = ({ children }) => {
    return (
        <View style={{ marginHorizontal: 10 }}>
            {children}
        </View>
    );
};

export { CardSection };
