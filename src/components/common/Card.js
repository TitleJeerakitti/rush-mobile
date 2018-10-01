import React from 'react';
import { View } from 'react-native';

const Card = ({ children }) => {
    const { containerStyle } = styles;

    return (
        <View style={containerStyle}>
            {children}
        </View>
    );
};

const styles = {
    containerStyle: {
        flexDirection: 'row',
        marginTop: 10,
    }
};

export { Card };
