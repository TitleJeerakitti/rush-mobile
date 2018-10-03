import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size }) => (
        <View style={styles.spinnerStyle}>
            <ActivityIndicator animating size={size || 'large'} />
        </View>
);

const styles = {
    spinnerStyle: {
        alignSelf: 'center',
    }
};

export { Spinner };
