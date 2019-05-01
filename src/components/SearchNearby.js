import React from 'react';
import { RefreshControl, View, ListView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Permissions } from 'expo';
import RestaurantCard from './RestaurantCard';
import { 
    FilterCard, 
    FilterItem, 
    FilterButton, 
    LoadingImage, 
    RestaurantMaps, 
    Empty
} from './common';
import { SERVER, SEARCH_NEARBY } from '../../config';
import { restaurantSelected } from '../actions';

const INITIAL_LOCATION = {
    latitude: 0,
    longitude: 0,
};

class SearchNearby extends React.Component {

    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            isLoaded: false,
            restaurants: [],
            refreshing: false,
            filters: [
                { type: 'ระยะทาง' }, 
                { type: 'ความนิยม' }, 
                { type: 'จำนวนรีวิว' }
            ],
            sortType: 'ระยะทาง',
            visible: false,
            mapVisible: false,
            restaurantSelect: {},
            latitude: INITIAL_LOCATION.latitude,
            longitude: INITIAL_LOCATION.longitude,
            locationPermission: undefined,
        };
    }

    async componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            const { status } = await Permissions.askAsync(Permissions.LOCATION);
            // Promise.all(result);
            if (status === 'granted') {
                navigator.geolocation.getCurrentPosition(position => {
                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        locationPermission: true,
                    });
                    this.getRestaurantAPI();
                });
            } else {
                this.setState({
                    isLoaded: true,
                    locationPermission: false,
                });
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onRefresh = () => {
        this.getRestaurantAPI();
    }

    onRestaurantSelect(item) {
        this.setState({ mapVisible: false, });
        this.props.restaurantSelected(item);
        Actions.restaurant_menu();
    }

    async getRestaurantAPI() {
        await this.setState({ refreshing: true });
        try {
            const { token_type, access_token } = this.props.token;
            const response = await fetch(this.selectAPI(), {
                headers: {
                    'Cache-Control': 'no-cache',
                    Authorization: `${token_type} ${access_token}`,
                }
            });
            const responseData = await response.json();
            if (this._isMounted) {
                await this.setState({
                    restaurants: responseData,
                    isLoaded: true,
                    refreshing: false
                });
            }
        } catch (error) {
            Alert.alert('Connect lost try again!');
            await this.setState({ refreshing: false });
        }
    }

    listViewCloneWithRows(data = []) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return ds.cloneWithRows(data);
    }

    selectAPI() {
        if (this.state.sortType === 'ระยะทาง') { 
            // return ('http://localhost:3000/restaurants?_sort=distance&_order=asc');
            return (`${SERVER}${SEARCH_NEARBY}?latitude=${this.state.latitude}&longitude=${this.state.longitude}&sorted_by=1`);
        } else if (this.state.sortType === 'ความนิยม') {
            return (`${SERVER}${SEARCH_NEARBY}?latitude=${this.state.latitude}&longitude=${this.state.longitude}&sorted_by=2`);
        }
        // return ('http://localhost:3000/restaurants?_sort=name&_order=asc');
        return (`${SERVER}${SEARCH_NEARBY}?latitude=${this.state.latitude}&longitude=${this.state.longitude}&sorted_by=3`);
    }

    refreshControl() {
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
            />
        );
    }

    renderItem() {
        return this.state.filters.map((filter, index) =>
            <FilterItem 
                key={index}
                onPress={() => {
                    this.setState({ sortType: filter.type, visible: false }, () => {
                        this.onRefresh();
                    });
                }}
            >
                {filter.type}
            </FilterItem>
        );
    }

    renderHeader() {
        return (
            <FilterButton onPress={() => this.setState({ visible: true })} >
                {this.state.sortType}
            </FilterButton>
        );
    }

    renderFilter() {
        return (
            <FilterCard visible={this.state.visible}>
                {this.renderItem()}
            </FilterCard>
        );
    }

    render() {
        const { container, } = styles;
        const { 
            isLoaded, 
            restaurants, 
            restaurantSelect, 
            mapVisible, 
            latitude, 
            longitude 
        } = this.state;

        if (!isLoaded) {
            return <LoadingImage />;
        } else if (restaurants.length > 0) {
            return (
                <View style={container} >
                    <ListView 
                        style={container}
                        dataSource={this.listViewCloneWithRows(restaurants)}
                        stickyHeaderIndices={[0]}
                        renderRow={(item) => 
                            <RestaurantCard 
                                data={item} 
                                onPress={() => this.onRestaurantSelect(item)}
                                onLongPress={() => this.setState({ 
                                    mapVisible: true, 
                                    restaurantSelect: item, 
                                })} 
                                userPosition={{
                                    latitude: this.state.latitude,
                                    longitude: this.state.longitude,
                                }}
                            />
                        }
                        renderHeader={() => this.renderHeader()}
                        refreshControl={this.refreshControl()}
                    />
                    {this.renderFilter()}
                    <RestaurantMaps 
                        data={restaurantSelect}
                        visible={mapVisible} 
                        onCancel={() => this.setState({ 
                            mapVisible: false, 
                            restaurantSelect: {},
                        })}
                        userPosition={{
                            latitude,
                            longitude,
                        }}
                        onPress={() => this.onRestaurantSelect(restaurantSelect)}
                    />
                </View>
            );
        } else if (!this.state.locationPermission) {
            return <Empty title='กรุณาเปิด Location ในตั้งค่าก่อน' />;
        }
        return <Empty title='ไม่มีร้านอาหารบริเวณใกล้เคียง' />;
    }
}

const styles = {
    container: {
        flex: 1,
    },
    space: {
        height: 10,
        backgroundColor: 'transparent',
    }
};

const mapStateToProps = ({ auth }) => {
    const { token } = auth;
    return { token }; 
};

export default connect(mapStateToProps, { restaurantSelected })(SearchNearby);
