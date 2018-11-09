import React from 'react';
import { View } from 'react-native';

const Row = ({ children, style }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', ...style }}>
            {children}
        </View>
    );
};

export { Row };
