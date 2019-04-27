import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontText } from '../common';

const FilterItem = ({ children, onPress }) => {
    return (
        <TouchableOpacity style={styles.textButton} onPress={onPress}>
            <FontText style={{ color: '#FF6000' }}>{children}</FontText>
        </TouchableOpacity>
    );
};

const styles = {
    textButton: {
        borderWidth: 1,
        paddingTop: 2,
        paddingBottom: 2,
        marginTop: 10,
        width: 75,
        alignItems: 'center',
        borderColor: '#FF6000',
        borderRadius: 15
    },
};

export { FilterItem };
