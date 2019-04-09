import React from 'react';
import { View, } from 'react-native';
import ImageOverlay from 'react-native-image-overlay';
import { FontText } from '../common';
import { ORANGE } from '../../../config';

const CategoryCard = ({ category }) => {
    return (
        <View style={styles.shadowStyle}> 
            <View style={styles.container}>
                <ImageOverlay 
                    source={{ uri: category.image }}
                    height={100}
                    contentPosition='center'
                    overlayAlpha={0.2}
                >
                <View style={styles.imageStyle}>
                    <FontText style={styles.descriptionContainer}>ค้นหาร้านอาหารประเภท</FontText>
                    <View style={styles.contentStyle}>
                        <FontText style={{ color: 'white', fontSize: 26, fontWeight: 'bold', }}>
                            {category.name}
                        </FontText>
                    </View>
                </View>
                </ImageOverlay>
            </View>
        </View>
    );
};

const styles = {
    shadowStyle: {
        shadowOffset: { 
            width: 0, 
            height: 2, 
        }, 
        shadowOpacity: 0.2, 
        shadowRadius: 10,
    },
    container: { 
        marginTop: 10, 
        marginHorizontal: 10, 
        overflow: 'hidden', 
        borderRadius: 10, 
    },
    imageStyle: { 
        flex: 1, 
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    contentStyle: { 
        paddingHorizontal: 30, 
        backgroundColor: ORANGE, 
        shadowOffset: {
            width: 0, 
            height: 2, 
        }, 
        shadowOpacity: 0.2, 
        shadowRadius: 10, 
        borderRadius: 5 
    },
    descriptionContainer: {
        position: 'absolute', 
        top: 0, 
        left: 5, 
        shadowOffset: { 
            width: 0, 
            height: 2, 
        }, 
        shadowOpacity: 0.5,
        color: 'white',
    }
};

export default CategoryCard;
