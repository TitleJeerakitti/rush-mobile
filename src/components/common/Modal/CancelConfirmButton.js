import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Row, FontText } from '../../common';
import { DARK_RED, GREEN } from '../../../../config';

const CancelConfirmButton = ({ onCancel, onConfirm }) => {
    return (
        <Row>
            <TouchableOpacity 
                onPress={onCancel} 
                style={[
                    styles.btn, 
                    { 
                        borderColor: DARK_RED 
                    }
                ]}
            >
                <FontText color={DARK_RED}>ยกเลิก</FontText>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <TouchableOpacity 
                onPress={onConfirm} 
                style={[
                    styles.btn, 
                    { 
                        borderColor: GREEN, 
                        backgroundColor: GREEN 
                    }
                ]} 
            >
                <FontText color='white'>ยืนยัน</FontText>
            </TouchableOpacity>
        </Row>
    );
};

const styles = {
    btn: {
        flex: 5,
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 5,
        borderRadius: 19,
        borderWidth: 1,
    }
};

export { CancelConfirmButton };
