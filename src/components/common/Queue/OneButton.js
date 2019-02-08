import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Row, FontText } from '../../common';

const OneButton = ({ onPress, color, text, }) => {
    return (
        <Row>
            <TouchableOpacity 
                style={[styles.fullDetailButton, { backgroundColor: color }]} 
                onPress={onPress}
            >
                <FontText color={'white'}>{text}</FontText>
            </TouchableOpacity>
        </Row>
    );
};

const styles = {
    fullDetailButton: {
        flex: 1,
        padding: 10, 
        borderBottomRightRadius: 10, 
        borderBottomLeftRadius: 10, 
        alignItems: 'center'
    }
};

export { OneButton };
