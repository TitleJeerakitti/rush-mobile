import React from 'react';
import { View } from 'react-native';

const CardSection = ({ children }) => {
    return (
        <View style={{ flexDirection: 'row', }}>
            {children}
        </View>
    );
};

export { CardSection };
