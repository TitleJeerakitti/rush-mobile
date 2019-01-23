import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { 
    Slick, 
    SlickItem, 
    FilterCard, 
    FilterItem, 
    FilterButton,
    MainCategory,
    MenuCard,
} from './common';

class RestaurantMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // restaurants: [],
            // refreshing: false,
            filters: [
                { type: 'ความนิยม' }, 
                { type: 'ราคาต่ำ' }, 
                { type: 'ราคาสูง' }
            ],
            sortType: 'ราคา',
            visible: false,
        };
    }

    renderItem() {
        return this.state.filters.map((filter, index) =>
            <FilterItem 
                key={index}
                onPress={() => {
                    this.setState({ sortType: filter.type, visible: false }, () => {
                        // this.onRefresh();
                        console.log('click');
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
        return (
            <ScrollView style={{ flex: 1 }}>
                <Slick>
                    <SlickItem source={require('../images/promotion_mockup.png')} />
                    <SlickItem source={require('../images/promotion_2.png')} />
                </Slick>
                <FilterButton onPress={() => this.setState({ visible: true })} >
                    {this.state.sortType}
                </FilterButton>
                <MainCategory />
                <View style={{ backgroundColor: '#FAFAFA' }}>
                    <MenuCard />
                </View>
                {this.renderFilter()}
            </ScrollView>
        );
    }
}

const mapStateToProps = ({ restaurant }) => {
    const { currentRestaurant } = restaurant;
    return { currentRestaurant };
};

export default connect(mapStateToProps, null)(RestaurantMenu);
