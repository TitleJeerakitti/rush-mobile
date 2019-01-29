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
import { restaurantGetMenu } from '../actions';

class RestaurantMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // data: {},
            // mainCategorys: [],
            currentCategory: 0,
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
        // this.apiCategory();
        this.props.restaurantGetMenu();
    }

    // componentWillReceiveProps(props) {
    //     console.log(props.refresh);
    //     this.setState({ ...this.state, refresh: props.refresh });
    //     // this.render();
    // }

    // shouldComponentUpdate(nextProps) {
    //     console.log('shoud componet update');
    //     // console.log('refresh: ', nextProps.refresh);
        
    //     return true;
    // }

    // apiCategory() {
    //     fetch('http://localhost:3000/full_request', {
    //             headers: {
    //                 'Cache-Control': 'no-cache'
    //             }
    //         })
    //             .then(response => response.json())
    //             .then(responseData => {
    //                 this.setState({
    //                     data: responseData,
    //                 });
    //             })
    //             .catch(() => console.log('error'));
    // }

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
                    onPress={() => this.setState({ currentCategory: index })}
                    selected={index === this.state.currentCategory}
                >
                    {category.name}
                </MainCategoryItem>
            );
        }
    }

    renderMenuList() {
        // const { restaurantId } = this.props;
        const { menuData } = this.props;
        const { currentCategory } = this.state;
        return (
            <MenuList 
                // restaurantId={restaurantId}
                currentCategory={currentCategory}
                data={menuData}
                // refresh={this.state.refresh}
            />
        );
    }

    render() {
        // console.log(restaurantId, currentCategory, mainCategorys);
        // console.log(this.state.mainCategorys);
        // console.log(this.state.currentCategory);
        // console.log('renderMenu');
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
    const { currentRestaurant, restaurantId, menus, menuData } = restaurant;
    return { currentRestaurant, restaurantId, menus, menuData };
};

export default connect(mapStateToProps, { restaurantGetMenu })(RestaurantMenu);
