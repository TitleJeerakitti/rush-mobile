import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({ children, color, onPress }) => {
    return (
        <TouchableOpacity 
            style={[styles.containerStyle, { backgroundColor: color }]}
            onPress={onPress}
        >
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
        shadowColor: 'black', 
        shadowOpacity: 0.2, 
        shadowOffset: { width: 1, height: 1 }, 
    },
    textStyle: {
        color: 'white',
        flex: 1,
        textAlign: 'center',
    }
};

export { Button };
