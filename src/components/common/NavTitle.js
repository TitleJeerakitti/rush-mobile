import React from 'react';
import { FontText } from '../common';

const NavTitle = ({ children }) => {
    return (
        <FontText style={styles.textStyle}>
            {children}
        </FontText>
    );
};

const styles = {
    textStyle: {
        color: 'white',
        fontSize: 26,
        flex: 1,
        textAlign: 'center',
        alignSelf: 'center',
    }
};

export { NavTitle };
