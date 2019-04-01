import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { 
    Slick, 
    SlickItem, 
    FilterCard, 
    FilterItem, 
    FilterButton,
    MainCategory,
    MenuList,
    MainCategoryItem,
    LoadingImage,
} from './common';
import { restaurantGetMenu, currentCategoryChange } from '../actions';
import { SERVER, GET_RESTAURANT_MENU } from './common/config';

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

    componentDidMount() {
        this.getRestaurantMenu();
    }

    async getRestaurantMenu() {
        try {
            const { token_type, access_token } = this.props.token;
            const response = await fetch(this.getRestaurantAPI(), {
                headers: {
                    'Cache-Control': 'no-cache',
                    Authorization: `${token_type} ${access_token}`,
                }
            });
            const responseData = await response.json();
            this.props.restaurantGetMenu(responseData);
        } catch (error) {
            console.log(error);
        }
    }

    getRestaurantAPI() {
        if (this.props.orderId !== '') {
            return `${SERVER}/restaurant/restaurant_detail/?supplier_id=${this.props.restaurantId}&order_id=${this.props.orderId}`;
        }
        return `${SERVER}${GET_RESTAURANT_MENU}?supplier_id=${this.props.restaurantId}`;
    }

    renderItem() {
        return this.state.filters.map((filter, index) =>
            <FilterItem 
                key={index}
                onPress={() => {
                    this.setState({ 
                        sortType: filter.type, 
                        visible: false 
                    }, () => {
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
        const { menuData, currentCategory } = this.props;
        const mainCategories = menuData.main_categories;
        if (mainCategories !== undefined) {
            return mainCategories.map((category, index) => 
                <MainCategoryItem 
                    key={index}
                    onPress={() => this.props.currentCategoryChange(index)}
                    selected={index === currentCategory}
                >
                    {category.name}
                </MainCategoryItem>
            );
        }
    }

    renderMenuList() {
        const { menuData, currentCategory } = this.props;
        return (
            <MenuList
                currentCategory={currentCategory}
                data={menuData}
            />
        );
    }

    renderSlickItem() {
        const { extra_pictures } = this.props.menuData;
        if (extra_pictures !== undefined) {
            return (
                <Slick>
                    { 
                        extra_pictures.map((item, index) => 
                        <SlickItem key={index} source={{ uri: item.image }} />) 
                    }
                </Slick>
            );
        }
        return null;
    }

    render() {
        if (this.props.menuData.main_categories !== undefined) {
            return (
                <ScrollView style={{ flex: 1, }}>
                    {this.renderSlickItem()}
                    <FilterButton onPress={() => this.setState({ visible: true })} >
                        {this.state.sortType}
                    </FilterButton>
                    <MainCategory>
                        {this.renderMainCategoryItem()}
                    </MainCategory>
                    {this.renderMenuList()}
                    {this.renderFilter()}
                </ScrollView>
            );
        }
        return <LoadingImage />;
    }
}

const mapStateToProps = ({ restaurant, auth }) => {
    const { menuData, currentCategory, restaurantId, orderId } = restaurant;
    const { token } = auth;
    return { menuData, currentCategory, restaurantId, token, orderId };
};

export default connect(mapStateToProps, { 
    restaurantGetMenu, 
    currentCategoryChange 
})(RestaurantMenu);
