import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Rating, Icon } from 'react-native-elements';
import {
    Card,
    CardSection,
    Row,
    ImageRound,
    FontText,
    ShopDistance,
    ShopStatus,
} from './common';

class RestaurantCard extends React.Component {
    render() {
        const { card } = styles;
        const {
            isOpen,
            name,
            image,
            rating,
            reviewCount,
            category,
            distance,
        } = this.props.data;
        return (
            <Card style={{ marginTop: 10 }}>
                <CardSection>
                    <TouchableOpacity
                        style={card}
                        activeOpacity={1}
                    >
                        <Row>
                            <ImageRound
                                source={{ uri: image }}
                            />
                            <View style={{ justifyContent: 'center', flex: 1 }}>
                                <FontText
                                    size={26}
                                    style={{ lineHeight: 30 }}
                                    numberOfLines={1}
                                >
                                    {name}
                                </FontText>
                                <Row>
                                    <Rating
                                        startingValue={rating}
                                        readonly
                                        imageSize={12}
                                    />
                                    <FontText
                                        size={16}
                                        style={{ marginLeft: 10 }}
                                    >
                                        {reviewCount} รีวิว
                                    </FontText>
                                    <Row style={{ flex: 1, justifyContent: 'flex-end' }}>
                                        <Icon name='tag' type='evilicon' size={16} color='gray' />
                                        <FontText style={{ color: 'gray' }} numberOfLines={1} >
                                            {category}
                                        </FontText>
                                    </Row>
                                </Row>
                                <Row style={{ marginTop: 5 }}>
                                    <ShopStatus isOpen={isOpen} />
                                    <ShopDistance distance={distance} />
                                </Row>
                            </View>
                        </Row>
                    </TouchableOpacity>
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    card: {
        backgroundColor: '#fefefe',
        padding: 10,
        borderRadius: 15,
        shadowOpacity: 0.1,
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 5 },
    }
};

export default RestaurantCard;
