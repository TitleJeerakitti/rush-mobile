import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontText } from '..';

const MainCategoryItem = ({ onPress, children, selected }) => {
    const { container, whiteBg, yellowBg } = styles;
    return (
        <TouchableOpacity 
            style={[container, selected ? whiteBg : yellowBg]} 
            onPress={onPress}
            activeOpacity={1}
        >
            <FontText style={{ color: selected ? '#000' : '#FFF' }}>
                {children}
            </FontText>
        </TouchableOpacity>
    );
};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowOffset: { width: 5, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 10
    },
    whiteBg: {
        backgroundColor: '#FFF',
    },
    yellowBg: {
        backgroundColor: '#FFA80D',
    },
};

export { MainCategoryItem };
