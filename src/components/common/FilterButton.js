import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, Row, FontText } from '../common';

const FilterButton = ({ onPress, children }) => {
    const { container, contentStyle, sortStyle } = styles;
    return (
        <Card style={container}>
            <TouchableOpacity
                style={contentStyle}
                activeOpacity={1}
                onPress={onPress}
            >
                <Row>
                    <FontText>จัดเรียงตาม</FontText>
                    <View
                        style={sortStyle}
                    >
                        <FontText style={{ color: 'white' }}>{children}</FontText>
                    </View>
                </Row>
            </TouchableOpacity>
        </Card>
    );
};

const styles = {
    container: {
        alignItems: 'flex-end',
        marginRight: 10,
    },
    contentStyle: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    sortStyle: {
        borderWidth: 1,
        paddingTop: 2,
        paddingBottom: 2,
        width: 75,
        alignItems: 'center',
        borderColor: '#FF6000',
        borderRadius: 15,
        marginLeft: 5,
        backgroundColor: '#FF6000',
    }
};

export { FilterButton };
