import React from 'react';
import { ScrollView, /* View, Text */ } from 'react-native';
import { connect } from 'react-redux';
import { 
    Slick, 
    SlickItem, 
    FilterCard, 
    FilterItem, 
    FilterButton,
    MainCategory,
    // MenuCard,
    // FontText,
    // Card,
    // CardSection,
    MenuList,
    MainCategoryItem,
} from './common';
import { restaurantGetMenu, currentCategoryChange } from '../actions';

class RestaurantMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // refreshing: false,
            filters: [
                { type: 'ความนิยม' }, 
                { type: 'ราคาต่ำ' }, 
                { type: 'ราคาสูง' }
            ],
            sortType: 'ราคา',
            visible: false,
            // refresh: false,
        };
    }

    componentWillMount() {
        this.props.restaurantGetMenu();
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

    renderMainCategoryItem() {
        if (this.props.menuData.main_categories !== undefined) {
            return this.props.menuData.main_categories.map((category, index) => 
                <MainCategoryItem 
                    key={index}
                    onPress={() => this.props.currentCategoryChange(index)}
                    selected={index === this.props.currentCategory}
                >
                    {category.name}
                </MainCategoryItem>
            );
        }
    }

    renderMenuList() {
        // const { restaurantId } = this.props;
        const { menuData, currentCategory } = this.props;
        return (
            <MenuList 
                // restaurantId={restaurantId}
                currentCategory={currentCategory}
                data={menuData}
            />
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
                <MainCategory>
                    {this.renderMainCategoryItem()}
                </MainCategory>
                    {/* {this.renderSubCategory()} */}
                {this.renderMenuList()}
                {this.renderFilter()}
            </ScrollView>
        );
    }
}

const mapStateToProps = ({ restaurant }) => {
    const { currentRestaurant, restaurantId, menuData, currentCategory } = restaurant;
    return { currentRestaurant, restaurantId, menuData, currentCategory };
};

export default connect(mapStateToProps, { 
    restaurantGetMenu, 
    currentCategoryChange 
})(RestaurantMenu);
