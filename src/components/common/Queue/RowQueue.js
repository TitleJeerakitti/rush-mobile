import React from 'react';
import { View, Text } from 'react-native';
import { Card, Row, FontText } from '../../common';
import { ORANGE } from '../colors';

const RowQueue = ({ amount, queue, color }) => {
    const { amountContainer, queueContainer, queueText } = styles;
    return (
        <Card>
            <Row>
                <View style={amountContainer} >
                    <FontText 
                        size={24} 
                        style={{ lineHeight: 29 }} 
                    >
                        {amount.toFixed(2)} บาท
                    </FontText>
                </View>
                <View style={[queueContainer, { backgroundColor: color || ORANGE }]} >
                    <Text style={queueText}>{queue}</Text>
                </View>
            </Row>
        </Card>
    );
};

const styles = {
    amountContainer: {
        flex: 3, 
        alignItems: 'center', 
        backgroundColor: '#FFF', 
        marginLeft: -10, 
        paddingVertical: 10, 
        shadowOpacity: 0.1,
        shadowOffset: { width: -5, height: 0 },
        shadowRadius: 10,
        elevation: 2
    },
    queueContainer: {
        flex: 2,
        marginRight: -10, 
        paddingVertical: 10, 
        alignItems: 'center', 
        shadowOpacity: 0.1,
        shadowOffset: { width: -5, height: 0 },
        shadowRadius: 10,
        elevation: 2
    },
    queueText: {
        fontWeight: 'bold', 
        color: '#FFF', 
        fontSize: 24
    }
};

export { RowQueue };
