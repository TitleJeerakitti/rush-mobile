import React from 'react';
import { View, Text } from 'react-native';

class ShopStatus extends React.Component {
    renderSelect() {
        const { isOpen } = this.props;
        if (isOpen) {
            return (
                <View style={{ ...styles.container, ...styles.open }}>
                    <Text style={{ fontSize: 12, color: 'white' }}>Open Now</Text>
                </View>
            );
        }
        return (
            <View style={{ ...styles.container, ...styles.close }}>
                <Text style={{ fontSize: 12, color: 'white' }}>Close Now</Text>
            </View>
        );
    }

    render() {
        return (
            <View>
                {this.renderSelect()}
            </View>
        );
    }
}

const styles = {
    container: {
        paddingVertical: 5,
        width: 75,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    open: {
        backgroundColor: 'green',
    },
    close: {
        backgroundColor: 'red',
    }
};

export { ShopStatus };
