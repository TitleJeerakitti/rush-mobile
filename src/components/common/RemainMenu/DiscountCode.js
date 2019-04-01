import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Row, FontText } from '../../common';
import { ORANGE } from '../config';

const DiscountCode = ({ onChangeText, value }) => {
    const { container, inputText, } = styles;

    return (
        <View style={container}>
            <Row>
                <FontText style={{ color: ORANGE }}>Code ส่วนลด</FontText>
                <TextInput 
                    value={value}
                    onChangeText={onChangeText}
                    placeholder='กรอกโค้ดส่วนลด...'
                    autoCapitalize='characters'
                    autoCorrect={false}
                    underlineColorAndroid='transparent'
                    style={inputText} 
                />
                {/* <TouchableOpacity onPress={onPress}>
                    <FontText color={ORANGE}>ยืนยัน</FontText>
                </TouchableOpacity> */}
            </Row>
        </View>
    );
};

const styles = {
    container: {
        marginBottom: 10,
        // backgroundColor: 'white',
        // padding: 10,
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.2,
        // shadowRadius: 10,
    },
    inputText: {
        paddingVertical: 5, 
        paddingHorizontal: 10,
        borderRadius: 13.5, 
        flex: 1, 
        marginLeft: 10,
        backgroundColor: '#F0F0F0',
        // borderWidth: 0.5,
        fontFamily: 'thaisans',
        fontSize: 20
    }
};

export { DiscountCode };
