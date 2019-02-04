import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Row } from '../../common';

const QuantityButton = ({ quantity, onLeft, onRight }) => {
    const { 
        container, 
        grayBg, 
        whiteBg, 
        redBg, 
        leftRadius, 
        rightRadius, 
        whiteText 
    } = styles;

    return (
        <Row>
            <TouchableOpacity 
                style={[
                    container, 
                    quantity === 0 ? grayBg : redBg, leftRadius
                ]}
                onPress={onLeft}
            >
                <Text style={whiteText}>-</Text>
            </TouchableOpacity>
            <View
                style={[container, whiteBg]}
            >
                <Text>{quantity}</Text>
            </View>
            <TouchableOpacity 
                style={[
                    container, 
                    quantity === 0 ? grayBg : redBg, rightRadius
                ]}
                onPress={onRight}
            >
                <Text style={whiteText}>+</Text>
            </TouchableOpacity>
        </Row>
    );
};

const styles = {
    container: {
        width: 30, 
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    grayBg: {
        backgroundColor: '#AAA', 
    },
    redBg: {
        backgroundColor: '#FF6000',
    },
    whiteBg: {
        backgroundColor: '#FFF',
    },
    whiteText: {
        color: '#FFF',
        fontSize: 20,
    },
    leftRadius: {
        borderTopLeftRadius: 5, 
        borderBottomLeftRadius: 5,
    },
    rightRadius: {
        borderTopRightRadius: 5, 
        borderBottomRightRadius: 5,
    }
};

export { QuantityButton };
