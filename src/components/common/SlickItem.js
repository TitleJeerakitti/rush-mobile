import React from 'react';
import { Dimensions, Image } from 'react-native';

const SlickItem = ({ source }) => {
    const { width } = Dimensions.get('window');
    const imageHeight = Math.round((width * 5) / 9); // 1080 x 600
    return (
        <Image 
            resizeMode={'cover'}
            style={{ flex: 1, height: imageHeight }} 
            source={source} 
        />
    );
};

export { SlickItem };
