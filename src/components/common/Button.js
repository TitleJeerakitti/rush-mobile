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
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        marginHorizontal: '12%',
    },
    textStyle: {
        color: 'white',
        flex: 1,
        textAlign: 'center',
    }
};

export { Button };
