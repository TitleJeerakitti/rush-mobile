import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Row, FontText } from '../../common';
import { ORANGE, GREEN } from '../../../../config';

const DiscountCode = ({ onChangeText, value, editable, onPress }) => {
    const { container, inputText, buttonStyle, } = styles;

    return (
        <View style={container}>
            <Row>
                <TextInput 
                    value={value}
                    onChangeText={onChangeText}
                    placeholder='กรอกโค้ดส่วนลด...'
                    autoCapitalize='characters'
                    autoCorrect={false}
                    underlineColorAndroid='transparent'
                    style={{ 
                        ...inputText, 
                        color: editable ? 'black' : GREEN, 
                        borderColor: editable ? '#F0F0F0' : GREEN,
                        backgroundColor: editable ? '#F0F0F0' : '#FFF',
                    }} 
                    editable={editable}
                />
                <TouchableOpacity onPress={onPress} style={buttonStyle}>
                    <FontText color={'white'}>Check</FontText>
                </TouchableOpacity>
            </Row>
        </View>
    );
};

const styles = {
    container: {
        marginBottom: 10,
    },
    inputText: {
        paddingVertical: 5, 
        paddingHorizontal: 10,
        borderRadius: 13.5, 
        flex: 1, 
        marginRight: 10,
        backgroundColor: '#F0F0F0',
        fontFamily: 'thaisans',
        fontSize: 20,
        textAlign: 'center',
        borderWidth: 1,
    },
    buttonStyle: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: ORANGE,
        borderRadius: 13
    }
};

export { DiscountCode };
