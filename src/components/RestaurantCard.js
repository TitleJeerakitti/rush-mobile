import React from 'react';
import { TouchableOpacity, View, } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import geolib from 'geolib';
// import { Actions } from 'react-native-router-flux';
import { restaurantSelected, reviewSelected } from '../actions';
import {
    Card,
    CardSection,
    Row,
    ImageRound,
    FontText,
    ShopDistance,
    ShopStatus,
} from './common';
import { YELLOW } from '../../config';

const empty_location = {
    latitude: 0,
    longitude: 0,
};

class RestaurantCard extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            latitude: 0,
            longitude: 0,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        navigator.geolocation.getCurrentPosition(position => {
            if (this._isMounted) {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    // onClick() {
    //     if (!this.props.disabled) {
            
    //     }
    // }

    onReviewSelect() {
        if (!this.props.disabledStar) {
            this.props.reviewSelected(this.props.data);
        }
    }

    renderDistance() {
        const { location = empty_location } = this.props.data;
        const response = this._isMounted && geolib.getDistance(this.state, location);
        return (
            <ShopDistance>
                {response < 1000 ? `${response} M` : `${(response / 1000).toFixed(1)} KM`}
            </ShopDistance>
        );
    }

    render() {
        const { card } = styles;
        const { onLongPress, onPress, } = this.props;
        const {
            is_open,
            name,
            image,
            rating,
            reviewCount,
            category,
        } = this.props.data;
        return (
            <Card>
                <CardSection>
                    <TouchableOpacity
                        style={card}
                        activeOpacity={1}
                        onPress={onPress}
                        onLongPress={onLongPress}
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
                                    <TouchableOpacity 
                                        onPress={this.onReviewSelect.bind(this)}
                                        activeOpacity={this.props.disabledStar ? 1 : 0.2}
                                    >
                                        <Row>
                                            <StarRating
                                                disabled
                                                maxStars={5}
                                                rating={rating}
                                                starSize={14}
                                                fullStarColor={YELLOW}
                                                emptyStarColor={YELLOW}
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
                                        <Icon 
                                            name='tag' 
                                            type='evilicon' 
                                            size={16} 
                                            color='gray' 
                                        />
                                        <FontText style={{ color: 'gray' }} numberOfLines={1} >
                                            {category ? category.name : ''}
                                        </FontText>
                                    </Row>
                                </Row>
                                <Row style={{ marginTop: 5 }}>
                                    <ShopStatus isOpen={is_open} />
                                    {this.renderDistance()}
                                </Row>
                            </View>
                        </Row>
                        {this.props.children}
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
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        elevation: 4,
    }
};

export default connect(null, { restaurantSelected, reviewSelected })(RestaurantCard);
