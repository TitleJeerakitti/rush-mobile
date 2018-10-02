import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({ children, color }) => {
    return (
        <TouchableOpacity style={[styles.containerStyle, { backgroundColor: color }]}>
            <Text style={styles.textStyle}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = {
    containerStyle: {
        padding: 15,
        flex: 1,
        alignItems: 'center',
        borderRadius: 15,
    },
    textStyle: {
        fontSize: 16,
        color: 'white',
    }
};

export { Button };
