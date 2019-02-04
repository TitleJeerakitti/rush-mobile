import React from 'react';
import { TouchableOpacity, View, } from 'react-native';
import { connect } from 'react-redux';
import { Rating, Icon } from 'react-native-elements';
import { restaurantSelected } from '../actions';
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

    onClick() {
        if (!this.props.disabled) {
            this.props.restaurantSelected(this.props.data);
        }
    }

    renderDistance() {
        const { distance } = this.props.data;
        if (distance < 1000) {
            return (
                <ShopDistance>{distance} M</ShopDistance>
            );
        }
        return (
            <ShopDistance>{distance / 1000} KM</ShopDistance>
        );
    }

    render() {
        const { card } = styles;
        const {
            isOpen,
            name,
            image,
            rating,
            reviewCount,
            category,
        } = this.props.data;
        return (
            <Card style={{ marginTop: 10 }}>
                <CardSection>
                    <TouchableOpacity
                        style={card}
                        activeOpacity={1}
                        onPress={this.onClick.bind(this)}
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
                                    <TouchableOpacity onPress={() => console.log('click rate')}>
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
                                        </Row>
                                    </TouchableOpacity>
                                    <Row style={{ flex: 1, justifyContent: 'flex-end' }}>
                                        <Icon name='tag' type='evilicon' size={16} color='gray' />
                                        <FontText style={{ color: 'gray' }} numberOfLines={1} >
                                            {category}
                                        </FontText>
                                    </Row>
                                </Row>
                                <Row style={{ marginTop: 5 }}>
                                    <ShopStatus isOpen={isOpen} />
                                    {this.renderDistance()}
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

export default connect(null, { restaurantSelected })(RestaurantCard);
