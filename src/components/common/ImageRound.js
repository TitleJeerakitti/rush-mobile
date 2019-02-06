import React from 'react';
import { Image } from 'react-native';

const ImageRound = ({ source, rounded }) => {
    const { container } = styles;

    return (
        <Image 
            style={[container, { borderRadius: rounded !== undefined ? 40 : 15 }]}
            source={source}
        />
    );
};

const styles = {
    container: {
        width: 80,
        height: 80,
        marginRight: 20,
    },
};

export { ImageRound };
