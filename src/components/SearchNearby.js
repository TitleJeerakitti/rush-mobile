import React from 'react';
import { ScrollView, RefreshControl, } from 'react-native';
import { Divider } from 'react-native-elements';
import RestaurantCard from './RestaurantCard';
import { FilterCard, FilterItem, FilterButton } from './common';

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

    componentWillMount() {
        this.getRestaurantAPI();
    }

    onRefresh = () => {
        this.getRestaurantAPI();
    }

    getRestaurantAPI() {
        this.setState({ refreshing: true });
        fetch(this.selectAPI(), {
            headers: {
                'Cache-Control': 'no-cache'
            }
        })
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    restaurants: responseData,
                    refreshing: false
                });
            })
            .catch(() => {
                console.log('error connect!');
            });
    }

    selectAPI() {
        if (this.state.sortType === 'ระยะทาง') { 
            return ('http://localhost:3000/restaurants?_sort=distance&_order=asc');
        } else if (this.state.sortType === 'ความนิยม') {
            return ('http://localhost:3000/restaurants?_sort=rating&_order=desc');
        }
        return ('http://localhost:3000/restaurants?_sort=name&_order=asc');
    }

    renderRestaurant() {
        return this.state.restaurants.map(restaurant =>
            <RestaurantCard 
                key={restaurant.id} 
                data={restaurant}
                // onCardPress={console.log(restaurant.name, ' was clicked!')}
                // onRatePress={console.log(restaurant.name, '\'s rate was clicked!')}
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

    renderFilter() {
        return (
            <FilterCard visible={this.state.visible}>
                {this.renderItem()}
            </FilterCard>
        );
    }

    render() {
        const { container, space } = styles;
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

export default SearchNearby;
