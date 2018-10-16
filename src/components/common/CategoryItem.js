import React from 'react';
import ImageOverlay from 'react-native-image-overlay';
import { FontText } from '../common';

const CategoryItem = ({ source, title, overlayAlpha }) => {
    return (
        <ImageOverlay 
            source={source}
            contentPosition='center'
            containerStyle={{ 
                margin: 15, 
                width: 100, 
                height: 100,
                shadowColor: 'black',
                shadowOpacity: 0.5,
                shadowOffset: { width: 0, height: 3 },
                elevation: 1
            }}
            rounded={50}
            overlayAlpha={overlayAlpha}
        >
            <FontText size={30} color='white'>{title}</FontText>
        </ImageOverlay>
    );
};

export { CategoryItem };
