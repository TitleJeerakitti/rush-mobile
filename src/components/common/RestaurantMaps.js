import React from 'react';
import { View, Modal, Text, Dimensions, TouchableOpacity, } from 'react-native';
import StarRating from 'react-native-star-rating';
import { Icon } from 'react-native-elements';
import { Constants, MapView, } from 'expo';
import { FontText } from './FontText';
import { DARK_ORANGE, ORANGE, YELLOW, GRAY } from '../../../config';
import { Row } from './Row';
import { ShopStatus } from './ShopStatus';
import { ShopDistance } from './ShopDistance';
import userTiny from '../../images/user-marker-tiny.png';
import userNormal from '../../images/user-marker.png';
import shopTiny from '../../images/shop-marker-tiny.png';
import shopNormal from '../../images/shop-marker.png';

const WIDTH = Dimensions.get('window').width * 0.8;
const ScreenWidth = Dimensions.get('window').width;

class RestaurantMaps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 37.785834,
            longitude: -122.406417,
            userMarker: ScreenWidth > 375 ? userNormal : userTiny,
            shopMarker: ScreenWidth > 375 ? shopNormal : shopTiny,
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => 
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })    
        );
    }

    renderDistance(distance) {
        // const { distance } = this.props.data;
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
        console.log(this.state)
        return (
            <Modal
                visible
                transparent
                animationType='fade'
            >
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }} >
                    <View style={styles.container}>
                        <MapView 
                            style={{ width: WIDTH, height: 200, }}
                            region={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                                latitudeDelta: 0.008,
                                longitudeDelta: 0.004,
                            }}
                            // "coords": Object {
                            //     "accuracy": 5,
                            //     "altitude": 0,
                            //     "altitudeAccuracy": -1,
                            //     "heading": -1,
                            //     "latitude": 37.785834,
                            //     "longitude": -122.406417,
                            //     "speed": -1,
                            //   },
                        >
                            <MapView.Marker 
                                coordinate={{
                                    latitude: this.state.latitude,
                                    longitude: this.state.longitude,
                                }}
                                title={'test'}
                                image={this.state.userMarker}
                            />
                            <MapView.Marker 
                                coordinate={{
                                    latitude: 13.728964,
                                    longitude: 100.771623,
                                }}
                                title={'test'}
                                image={this.state.shopMarker}
                            />
                        </MapView>
                        <View style={{ paddingVertical: 10, paddingHorizontal: 20, }}>
                            <FontText size={26} numberOfLines={1}>BonChon - SiamParagon</FontText>
                            <Row>
                                <TouchableOpacity 
                                    // onPress={this.onReviewSelect.bind(this)}
                                    activeOpacity={1}
                                >
                                    <Row>
                                        <StarRating
                                            disabled
                                            maxStars={5}
                                            rating={4.5}
                                            starSize={14}
                                            fullStarColor={YELLOW}
                                            emptyStarColor={YELLOW}
                                        />
                                        <FontText
                                            size={16}
                                            style={{ marginLeft: 10 }}
                                        >
                                            {'123'} รีวิว
                                        </FontText>
                                    </Row>
                                </TouchableOpacity>
                                <Row style={{ flex: 1, justifyContent: 'flex-end' }}>
                                    <Icon name='tag' type='evilicon' size={16} color='gray' />
                                    <FontText style={{ color: 'gray' }} numberOfLines={1} >
                                        {'Thai'}
                                    </FontText>
                                </Row>
                            </Row>
                            <Row style={{ marginTop: 5 }}>
                                <ShopStatus isOpen />
                                {this.renderDistance(10000)}
                            </Row>
                        </View>
                        <Row style={{ padding: 10, backgroundColor: '#f0f0f0', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, justifyContent: 'flex-end' }}>
                            <TouchableOpacity style={{ paddingVertical: 5, paddingHorizontal: 10, marginRight: 5 }}>
                                <FontText style={{ color: GRAY }}>ยกเลิก</FontText>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: ORANGE, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, }}>
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
    }
};

export { RestaurantMaps };
