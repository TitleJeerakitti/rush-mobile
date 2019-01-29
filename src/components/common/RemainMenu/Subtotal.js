import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Row, FontText } from '../../common';
import { ORANGE } from '../colors';

const Subtotal = ({ price, time }) => {
    const { 
        container, 
        leftContainer,
        middleContainer,
        btnContainer,
    } = styles;

    return (
        <View style={container}>
            <Row>
                <View style={leftContainer}>
                    <FontText color='white' size={24}>ราคาสุทธิ</FontText>
                    <FontText color='white' style={{ top: -5 }} size={18}>เวลาโดยประมาณ</FontText>
                </View>
                <View style={middleContainer}>
                    <FontText color='white' size={24}>{price.toFixed(2)} บาท</FontText>
                    <FontText color='white' style={{ top: -5 }} size={18}>{time} นาที</FontText>
                </View>
                <TouchableOpacity onPress={() => console.log('order')} style={btnContainer}>
                    <FontText color={ORANGE} size={22}>สั่งอาหาร</FontText>
                </TouchableOpacity>
            </Row>
        </View>
    );
};

const styles = {
    container: {
        backgroundColor: ORANGE, 
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    leftContainer: {
        height: 50,
        flex: 1,
    },
    middleContainer: {
        height: 50,
        alignItems: 'flex-end',
    },
    btnContainer: {
        paddingVertical: 5, 
        paddingHorizontal: 10, 
        borderRadius: 19.35, 
        backgroundColor: 'white', 
        marginLeft: 15, 
        shadowOffset: { width: 0, height: 0 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 5,
    }
};

export { Subtotal };
