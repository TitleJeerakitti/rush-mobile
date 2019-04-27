import React from 'react';
import { Modal, View, Alert, TextInput, TouchableOpacity } from 'react-native';
import { FontText, } from '../../common';
import { GRAY, ORANGE } from '../../../../config';

class PhoneInput extends React.Component {
    render() {
        const { visible, } = this.props;
        return (
            <Modal
                visible={visible}
                transparent
                animationType='slide'
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}
            >
                <View style={styles.container}>
                    <View style={styles.containerChild}>
                        <View style={{ padding: 10, }}>
                            <FontText size={20} style={{ alignSelf: 'center' }}>
                                กรอกเบอร์โทรศัพท์ของคุณก่อนเริ่มใช้
                            </FontText>
                            <TextInput 
                                value={this.props.value}
                                onChangeText={this.props.onChangeText}
                                placeholder='ex. 0812345678'
                                style={styles.textInputStyle}
                                maxLength={10}
                                autoCapitalize='none'
                                autoCorrect={false}
                            />
                        </View>
                        <View style={styles.buttonContainerStyle}>
                            <TouchableOpacity 
                                style={styles.buttonStyle} 
                                onPress={this.props.onCancel}
                            >
                                <FontText style={{ color: GRAY }}>ยกเลิก</FontText>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={{ backgroundColor: ORANGE, ...styles.buttonStyle }}
                                onPress={this.props.onConfirm}
                            >
                                <FontText style={{ color: 'white' }}>บันทึก</FontText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = {
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginBottom: 40
    },
    containerChild: {
        width: 300,
        backgroundColor: '#FFF',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 20,
        elevation: 10,
    },
    buttonContainerStyle: { 
        backgroundColor: '#F0F0F0', 
        padding: 10, 
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 10, 
        justifyContent: 'flex-end', 
        flexDirection: 'row' 
    },
    buttonStyle: {
        paddingVertical: 2, 
        paddingHorizontal: 10, 
        borderRadius: 5,
    },
    textInputStyle: {
        fontFamily: 'thaisans',
        fontSize: 20,
        alignSelf: 'center',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: GRAY,
        marginTop: 10,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: 200,
    }
};

export { PhoneInput };
