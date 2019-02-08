import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Row, FontText } from '../../common';

const TwoButton = ({ 
    onFirstPress, 
    onSecondPress, 
    firstColor, 
    secondColor, 
    firstText, 
    secondText 
}) => {
    return (
        <Row>
            <TouchableOpacity 
                style={[styles.firstButton, { backgroundColor: firstColor, }]} 
                onPress={onFirstPress}
            >
                <FontText color={'white'}>{firstText}</FontText>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.secondButton, { backgroundColor: secondColor, }]} 
                onPress={onSecondPress}
            >
                <FontText color={'white'}>{secondText}</FontText>
            </TouchableOpacity>
        </Row>
    );
};

const styles = {
    firstButton: {
        flex: 1,
        padding: 10, 
        borderBottomLeftRadius: 10, 
        alignItems: 'center'
    },
    secondButton: {
        flex: 1,
        padding: 10, 
        borderBottomRightRadius: 10, 
        alignItems: 'center'
    },
};

export { TwoButton };
