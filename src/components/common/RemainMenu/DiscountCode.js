import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Row, FontText } from '../../common';
import { ORANGE } from '../colors';

const DiscountCode = ({ onPress }) => {
    const { container, inputText } = styles;

    return (
        <View style={container}>
            <Row>
                <FontText>Code ส่วนลด</FontText>
                <TextInput 
                    placeholder='กรอกโค้ดส่วนลด...'
                    autoCapitalize='characters'
                    autoCorrect={false}
                    underlineColorAndroid='transparent'
                    style={inputText} 
                />
                <TouchableOpacity onPress={onPress}>
                    <FontText color={ORANGE}>ยืนยัน</FontText>
                </TouchableOpacity>
            </Row>
        </View>
    );
};

const styles = {
    container: {
        backgroundColor: 'white',
        padding: 10,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    inputText: {
        paddingVertical: 5, 
        paddingHorizontal: 10,
        borderRadius: 13.5, 
        flex: 1, 
        marginHorizontal: 10,
        backgroundColor: 'white',
        borderWidth: 0.5,
        fontFamily: 'thaisans',
        fontSize: 20
    }
};

export { DiscountCode };
