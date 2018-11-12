import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { Divider } from 'react-native-elements';
import RestaurantCard from './RestaurantCard';

class SearchNearby extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            refreshing: false,
            error: '',
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
        fetch('http://localhost:3000/restaurants', {
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

    renderRestaurant() {
        return this.state.restaurants.map(restaurant =>
            <RestaurantCard key={restaurant.id} data={restaurant} />
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
                {this.renderRestaurant()}
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
