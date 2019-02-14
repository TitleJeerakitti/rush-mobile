import React from 'react';
import { Image } from 'react-native';

const ImageRound = ({ source, small, style }) => {
    const { container } = styles;

    return (
        <Image 
            style={[container, { 
                borderRadius: small ? 30 : 15,
                width: small ? 60 : 80,
                height: small ? 60 : 80,
                ...style
            }]}
            source={source}
        />
    );
};

const styles = {
    container: {
        marginRight: 20,
    },
};

export { ImageRound };
