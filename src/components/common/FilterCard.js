import React from 'react';
import { View, Modal, } from 'react-native';
import { FontText } from '../common';

const FilterCard = ({ visible, children }) => {
    const { container, cardStyle } = styles;
    return (
        <Modal
            visible={visible}
            transparent
            animationType='fade'
        >
            <View style={container} >
                <View style={cardStyle} >
                    <FontText size={32}>จัดเรียงตาม</FontText>
                    {children}
                </View>
            </View>
        </Modal>
    );
};

const styles = {
    cardStyle: {
        width: 200,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fefefe',
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: { width: 10, height: 10 },
        borderRadius: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
};

export { FilterCard };
