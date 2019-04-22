import React from 'react';
import { View, Image, Dimensions, } from 'react-native';
import { FontText } from './FontText';
import LOGO from '../../images/r-logo.png';

const imageWidth = Dimensions.get('window').width * 0.5;

const Empty = ({ title }) => {
    return (
        <View style={styles.containerEmpty}>
            <Image
                style={styles.imageEmpty}
                source={LOGO}
            />
            <FontText size={24}>{title}</FontText>
        </View>    
    );
};

const styles = {
    imageEmpty: {
        width: imageWidth, 
        height: imageWidth,
        resizeMode: 'contain', 
        tintColor: 'gray'
    },
    containerEmpty: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
};

export { Empty };
