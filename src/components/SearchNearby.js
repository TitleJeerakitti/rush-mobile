import React from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import RestaurantCard from './RestaurantCard';
import { FilterCard, FilterItem, FilterButton, FontText } from './common';
import { SERVER } from './common/config';

class SearchNearby extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            refreshing: false,
            filters: [
                { type: 'ระยะทาง' }, 
                { type: 'ความนิยม' }, 
                { type: 'ตัวอักษร' }
            ],
            sortType: 'ระยะทาง',
            visible: false,
        };
    }

    componentDidMount() {
        this.mounted = true;
        this.getRestaurantAPI();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    onRefresh = () => {
        this.getRestaurantAPI();
    }

    async getRestaurantAPI() {
        await this.setState({ refreshing: true });
        try {
            // console.log(this.props.token)
            const response = await fetch(this.selectAPI(), {
                headers: {
                    'Cache-Control': 'no-cache',
                    Authorization: `Token ${this.props.token}`,
                }
            });
            const responseData = await response.json();
            if (this.mounted) {
                await this.setState({
                    restaurants: responseData,
                    refreshing: false
                });
                // console.log(this.state.restaurants);
            }
        } catch (error) {
            console.log(error);
            await this.setState({ refreshing: false });
        }
    }

    selectAPI() {
        if (this.state.sortType === 'ระยะทาง') { 
            // return ('http://localhost:3000/restaurants?_sort=distance&_order=asc');
            return (`${SERVER}/restaurant/nearby_restaurant/`);
        } else if (this.state.sortType === 'ความนิยม') {
            return ('http://localhost:3000/restaurants?_sort=rating&_order=desc');
        }
        // return ('http://localhost:3000/restaurants?_sort=name&_order=asc');
        return ('http://10.66.10.222:8000/testing/restaurant');
    }

    renderRestaurant() {
        if (this.state.restaurants.length > 0) {
            return this.state.restaurants.map(restaurant =>
                <RestaurantCard 
                    key={restaurant.id} 
                    data={restaurant}
                />
            );
        }
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

    renderFilter() {
        return (
            <FilterCard visible={this.state.visible}>
                {this.renderItem()}
            </FilterCard>
        );
    }

    render() {
        const { container, space, containerNone } = styles;
        if (this.state.restaurants.length > 0) {
            return (
                <ScrollView
                    style={container}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                >
                    <FilterButton onPress={() => this.setState({ visible: true })} >
                        {this.state.sortType}
                    </FilterButton>
                    {this.renderRestaurant()}
                    {this.renderFilter()}
                    <Divider style={space} />
                </ScrollView>
            );
        }
        return (
            <View style={containerNone}>
                <FontText>ไม่มีร้านอาหารบริเวณใกล้เคียง</FontText>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
    },
    containerNone: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    space: {
        height: 10,
        backgroundColor: 'transparent',
    }
};

const mapStateToProps = ({ auth }) => {
    const { token } = auth;
    // console.log(token)
    return { token }; 
};

export default connect(mapStateToProps)(SearchNearby);
