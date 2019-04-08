import React from 'react';
import { TouchableOpacity } from 'react-native';
import ImageOverlay from 'react-native-image-overlay';
import { FontText } from '../common';

const CategoryItem = ({ source, title, overlayAlpha, onPress }) => {
    return (
        <TouchableOpacity 
            style={styles.buttonStyle} 
            onPress={onPress} 
            activeOpacity={1}
        >
            <ImageOverlay 
                source={source}
                contentPosition='center'
                containerStyle={styles.container}
                rounded={50}
                overlayAlpha={overlayAlpha}
            >
                <FontText 
                    size={24} 
                    color='white' 
                    numberOfLines={1}
                >
                    {title}
                </FontText>
            </ImageOverlay>
        </TouchableOpacity>
    );
};

const styles = {
    container: {
        width: 100, 
        height: 100,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 3 },
        elevation: 1
    },
    buttonStyle: {
        margin: 15,
    }
};

export { CategoryItem };
