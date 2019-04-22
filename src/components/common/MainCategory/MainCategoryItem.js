import React from 'react';
import { TouchableOpacity, } from 'react-native';
import { FontText, Row } from '../../common';

const MainCategoryItem = ({ onPress, children, selected }) => {
    const { container, whiteBg, yellowBg } = styles;
    return (
        <TouchableOpacity 
            style={[container, selected ? whiteBg : yellowBg]} 
            onPress={onPress}
            activeOpacity={1}
        >
            <Row>
                <FontText 
                    style={{ 
                        color: selected ? '#000' : '#FFF',
                        // textDecorationLine: selected ? 'underline' : 'none'
                    }}
                    numberOfLines={1}
                >
                    {children}
                </FontText>
            </Row>
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
        shadowRadius: 10,
        marginHorizontal: 0.2,
    },
    whiteBg: {
        backgroundColor: '#FAFAFA',
    },
    yellowBg: {
        backgroundColor: '#FFA80D',
    },
};

export { MainCategoryItem };
