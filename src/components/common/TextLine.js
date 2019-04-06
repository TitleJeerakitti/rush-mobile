import React from 'react';
import { View, Text } from 'react-native';

const TextLine = ({ title }) => {
    return (
        <View style={styles.container}>
            <View style={styles.line} />
            <Text style={styles.textCenter}>{title}</Text>
            <View style={styles.line} />
        </View>
    );
};

const styles = {
    container: {
        flexDirection: 'row',
        marginHorizontal: 30,
        marginVertical: 10,
    },
    line: {
        borderBottomWidth: 1,
        borderColor: 'white',
        flex: 1,
        height: 12,
        // paddingBottom: 10
    },
    textCenter: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 16,
        marginHorizontal: 10
    }
};

export { TextLine };
