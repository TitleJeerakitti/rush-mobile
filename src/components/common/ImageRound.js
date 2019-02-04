import React from 'react';
import { Image } from 'react-native';

const ImageRound = ({ source }) => {
    const { container } = styles;

    return (
        <Image 
            style={container}
            source={source}
        />
    );
};

const styles = {
    container: {
        borderRadius: 15,
        width: 80,
        height: 80,
        marginRight: 20,
    },
};

export { ImageRound };
