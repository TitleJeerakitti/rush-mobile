import React from 'react';
import { Card } from '../../common';

const ButtonBottomCard = ({ children, style }) => {
    return (
        <Card style={{ ...styles.buttonContainer, ...style }}>
            {children}
        </Card>
    );
};

const styles = {
    buttonContainer: {
        marginHorizontal: -10, 
        marginBottom: -10, 
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 10,
    },
};

export { ButtonBottomCard };
