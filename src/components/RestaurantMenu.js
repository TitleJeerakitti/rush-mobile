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
    FontText,
    Card,
    CardSection,
    MenuList,
    MainCategoryItem,
} from './common';

class RestaurantMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: [],
            mainCategorys: [],
            currentCategory: '',
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

    componentWillMount() {
        this.apiCategory();
    }

    apiCategory() {
        fetch(`http://localhost:3000/main_category?supplier_id=${this.props.restaurantId}`, {
                headers: {
                    'Cache-Control': 'no-cache'
                }
            })
                .then(response => response.json())
                .then(async responseData => {
                    await this.setState({
                        mainCategorys: responseData,
                        currentCategory: responseData[0].id,
                    });
                })
                .catch(() => console.log('error'));
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
        return this.state.mainCategorys.map(category => 
            <MainCategoryItem 
                key={category.id}
                onPress={() => this.setState({ currentCategory: category.id })}
                selected={category.id === this.state.currentCategory}
            >
                {category.name}
            </MainCategoryItem>
        );
    }

    renderMenuList() {
        const { restaurantId } = this.props;
        const { currentCategory } = this.state;
        if (currentCategory !== '') {
            return (
                <MenuList 
                    restaurantId={restaurantId}
                    currentCategory={currentCategory}
                />
            );
        }
    }

    render() {
        // console.log(restaurantId, currentCategory, mainCategorys);
        // console.log(this.state.mainCategorys);
        // console.log(this.state.currentCategory);
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
    const { currentRestaurant, restaurantId } = restaurant;
    return { currentRestaurant, restaurantId };
};

export default connect(mapStateToProps, null)(RestaurantMenu);
