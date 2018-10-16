import React from 'react';
import { View } from 'react-native';

const Card = ({ children }) => {
    return (
        <View style={{ marginBottom: 10, }}>
            {children}
        </View>
    );
};

export { Card };
