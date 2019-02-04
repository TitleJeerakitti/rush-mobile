import React from 'react';
import { View } from 'react-native';
import { FontText, Card, Row } from '../common';

const TextLineFont = ({ title }) => {
    return (
        <Card style={{ alignItems: 'center' }}>
            <Row>
                <View style={styles.line} />
                <FontText>{title}</FontText>
                <View style={styles.line} />
            </Row>
        </Card>
    );
};

const styles = {
    line: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: 'black',
        marginHorizontal: 10,
    }
};

export { TextLineFont };
