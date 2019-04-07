import React from 'react';
import { View, Modal, Dimensions, TouchableOpacity, } from 'react-native';
import StarRating from 'react-native-star-rating';
import { Icon } from 'react-native-elements';
import { MapView, } from 'expo';
import geolib from 'geolib';
import { FontText } from './FontText';
import { ORANGE, YELLOW, GRAY } from '../../../config';
import { Row } from './Row';
import { ShopStatus } from './ShopStatus';
import { ShopDistance } from './ShopDistance';
import userTiny from '../../images/user-marker-tiny.png';
import userNormal from '../../images/user-marker.png';
import shopTiny from '../../images/shop-marker-tiny.png';
import shopNormal from '../../images/shop-marker.png';

const WIDTH = Dimensions.get('window').width * 0.8;
const ScreenWidth = Dimensions.get('window').width;
const empty_location = {
    latitude: 0,
    longitude: 0,
};

class RestaurantMaps extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            location: {
                latitude: 0,
                longitude: 0,
            },
            userMarker: ScreenWidth > 375 ? userNormal : userTiny,
            shopMarker: ScreenWidth > 375 ? shopNormal : shopTiny,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    location: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }
                });
            });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    computeDelta(location) {
        const { latitude, longitude } = this.state.location;
        return {
            latitudeDelta: (Math.max(latitude, location.latitude) - Math.min(latitude, location.latitude)) * 1.5,
            longitudeDelta: (Math.max(longitude, location.longitude) - Math.min(longitude, location.longitude)) * 1.5,
        };
    }

    computeCenter(location) {
        const position = this._isMounted && geolib.getCenter([this.state.location, location]);
        return ({
            latitude: parseFloat(position.latitude),
            longitude: parseFloat(position.longitude),
        });
    }

    renderDistance() {
        const { location = empty_location } = this.props.data;
        const response = this._isMounted && geolib.getDistance(this.state.location, location);
        return (
            <ShopDistance>
                {response < 1000 ? `${response} M` : `${(response / 1000).toFixed(1)} KM`}
            </ShopDistance>
        );
    }

    render() {
        const { visible, onCancel, onPress } = this.props;
        const {
            isOpen,
            name,
            rating,
            reviewCount,
            category,
            location = { latitude: 0, longitude: 0 },
        } = this.props.data;
        return (
            <Modal
                visible={visible}
                transparent
                animationType='slide'
            >
                <View style={styles.containerOut} >
                    <View style={styles.container}>
                        <MapView 
                            style={styles.mapStyle}
                            region={{
                                ...this.computeCenter(location),
                                ...this.computeDelta(location)
                            }}
                        >
                            <MapView.Marker 
                                coordinate={this.state.location}
                                title={'You\'re here'}
                                image={this.state.userMarker}
                            />
                            <MapView.Marker 
                                coordinate={{
                                    latitude: location.latitude, 
                                    longitude: location.longitude,
                                }}
                                title={name}
                                image={this.state.shopMarker}
                            />
                        </MapView>
                        <View style={styles.contentContainer}>
                            <FontText size={26} numberOfLines={1}>{name}</FontText>
                            <Row>
                                <TouchableOpacity 
                                    // onPress={this.onReviewSelect.bind(this)}
                                    activeOpacity={1}
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
                                <Row style={styles.contentRight}>
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
                                <ShopStatus isOpen={isOpen} />
                                {this.renderDistance()}
                            </Row>
                        </View>
                        <Row style={styles.footerContainer}>
                            <TouchableOpacity 
                                onPress={onCancel}
                                style={{ ...styles.buttonStyle, marginRight: 5 }} 
                            >
                                <FontText style={{ color: GRAY }}>ยกเลิก</FontText>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={onPress}
                                style={{ backgroundColor: ORANGE, ...styles.buttonStyle }}
                            >
                                <FontText style={{ color: 'white' }}>ดูเมนูอาหาร</FontText>
                            </TouchableOpacity>
                        </Row>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = {
    container: {
        backgroundColor: '#FFF', 
        width: WIDTH, 
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 10, 
        borderTopWidth: 5, 
        borderColor: YELLOW,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    containerOut: { 
        alignItems: 'center', 
        justifyContent: 'center', 
        flex: 1,
    },
    mapStyle: {
        width: WIDTH, 
        height: 200,
    },
    contentContainer: {
        paddingVertical: 10, 
        paddingHorizontal: 20,
    },
    contentRight: { 
        flex: 1, 
        justifyContent: 'flex-end' 
    },
    footerContainer: { 
        padding: 10, 
        backgroundColor: '#f0f0f0', 
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 10, 
        justifyContent: 'flex-end' 
    },
    buttonStyle: {
        paddingVertical: 5, 
        paddingHorizontal: 10, 
        borderRadius: 5,
    }
};

export { RestaurantMaps };
