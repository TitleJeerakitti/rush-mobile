import React from 'react';
import { View, Text, } from 'react-native';
import { SlickItem, Row, FontText } from '../common';
import { ORANGE } from '../../../config';

const PromotionCard = ({ item }) => {
    return (
        <View style={styles.containerShadow}>
            <View style={styles.container}>
                <SlickItem source={{ uri: item.image }} />
                <View style={styles.containerFooter}>
                    <Row>
                        <View style={styles.leftBox}>
                            <FontText 
                                style={{ color: 'white', lineHeight: 22, }} 
                                numberOfLines={1} 
                            >
                                {item.description}
                            </FontText>
                            <FontText 
                                style={{ fontSize: 16, color: 'white', }}
                            >
                                เมื่อสั่งซื้อขั้นต่ำ {item.minimum_price} บาท
                            </FontText>
                        </View>
                        <View style={styles.rightBox}>
                            <Text 
                                style={{ fontSize: 12, color: 'white' }}
                            >
                                Promotion Code
                            </Text>
                            <Text style={styles.codeText}>{item.promotion_code}</Text>
                        </View>
                    </Row>
                </View>
            </View>
        </View>
    );
};

const styles = {
    container: { 
        marginHorizontal: 10, 
        marginTop: 10, 
        borderRadius: 10, 
        overflow: 'hidden' 
    },
    containerShadow: {
        shadowOffset: { 
            width: 0, 
            height: 0 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 5,
    },
    containerFooter: { 
        backgroundColor: ORANGE, 
        padding: 10, 
    },
    leftBox: { 
        paddingRight: 10, 
        borderRightWidth: 1, 
        borderColor: 'white', 
        flex: 2, 
        // marginRight: 10, 
    },
    rightBox: { 
        flex: 1, 
        alignItems: 'flex-end',
        paddingLeft: 10,
    },
    codeText: {
        fontSize: 18, 
        fontWeight: 'bold', 
        color: 'white', 
        paddingTop: 5,
    }
};

export default PromotionCard;
