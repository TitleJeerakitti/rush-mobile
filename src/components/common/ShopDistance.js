import React from 'react';
import { Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { Row } from '../common';

const ShopDistance = ({ children }) => {
    return (
        <Row style={styles.container}>
            <Icon name='location-pin' type='entypo' color='red' size={18} />
            <Text style={{ fontSize: 12 }}>{children}</Text>
        </Row>
    );
};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
};

export { ShopDistance };
