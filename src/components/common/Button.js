import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Row } from '../common';

const Button = ({ onPress, children, color }) => {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={{ ...styles.container, backgroundColor: color }}
        >
            <Row>
                {children}
            </Row>
        </TouchableOpacity>
    );
};

const styles = {
    container: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        shadowOpacity: 0.2,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        elevation: 1,
    }
};

export { Button };
