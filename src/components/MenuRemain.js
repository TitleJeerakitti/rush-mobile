import React from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Divider } from 'react-native-elements';
// import update from 'immutability-helper';
import { 
    TextLineFont, 
    Button, 
    FontText, 
    DiscountCode, 
    Subtotal, 
    MenuCard, 
    OrderConfirm,
} from './common';
import { loadData } from '../actions';
import { GREEN, SERVER } from './common/config';
import RestaurantCard from './RestaurantCard';

class MainRemain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            menus: [],
        };
    }

    componentDidMount() {
        const { menuData } = this.props;
        this.getMenus(menuData);
    }

    componentWillReceiveProps(nextProps) {
        const menuList = this.makeMenuList(nextProps.menuData);
        if (menuList.length !== this.state.menus.length) {
            return this.getMenus(nextProps.menuData);
        }
        for (let i = 0; i < menuList.length; i++) {
            if (menuList[i].id !== this.state.menus[i].id || 
                menuList[i].quantity !== this.state.menus[i].quantity) {
                    return this.getMenus(nextProps.menuData);
            }
        }
    }

    getMenus(menuData) {
        console.log(menuData)
        if (menuData !== undefined) {
            const menuList = this.makeMenuList(menuData);
            this.setState({ menus: menuList });
        } else {
            this.setState({ menus: [] });
        }
    }

    makeMenuList(menuData) {
        if (menuData.main_categories !== undefined) {
            return menuData.main_categories.reduce((list, mainCategory, mainIndex) => {
                mainCategory.sub_categories.forEach((subCategory, subIndex) => {
                    subCategory.menus.forEach((menu, index) => {
                        if (menu.quantity > 0) {
                            list.push({ 
                                ...menu,
                                mainIndex,
                                subIndex,
                                index,
                            });
                        }
                    });
                });
                return list;
            }, []);
        }
        return [];
    }

    makeMenuSentAPI(menuData) {
        return menuData.reduce((list, menu) => {
                list.push({ 
                    menu_id: menu.id,
                    amount: menu.quantity,
                });
            return list;
        }, []);
    }

    shouldBuy() {
        if (this.state.menus.length > 0) {
            this.setState({ visible: true });
        }
    }

    async placeOrder() {
        try {
            const response = await fetch(`${SERVER}/order/create_new_order/`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Token ${this.props.token}`,
                },
                body: JSON.stringify({
                    customer_id: this.props.userInfo.id,
                    supplier_id: this.props.restaurantId,
                    menus: this.makeMenuSentAPI(this.state.menus),
                    total: this.computeSubtotal(),
                    special_request: '',
                    discount: 0,
                }),
            });
            const { success } = await response.json();
            await this.setState({ visible: false, menus: [] });
            if (success === 'Successful Create Order') {
                this.props.loadData();
                Actions.popTo('home_homepage');
                Actions.queue();
            }
        } catch (error) {
            console.log(error);
        }
        // this.props.loadData();
        // Actions.popTo('home_homepage');
        // Actions.queue();
    }

    computeSubtotal() {
        const { menus } = this.state;
        if (menus.length > 0) {
            return menus.reduce((subtotal, menu) => {
                subtotal += menu.price * menu.quantity;
                return subtotal;
            }, 0);
        }
        return 0;
    }

    renderMenu() {
        const { menus } = this.state;
        if (menus.length > 0) {
            return menus.map(menu => {
                return (
                    <MenuCard 
                        key={menu.id} 
                        data={menu}
                        index={menu.index}
                        currentCategory={menu.mainIndex}
                        subIndex={menu.subIndex}
                    />
                );
            });
        }
        return (
            <View style={styles.containerEmpty}>
                <FontText>ไม่มีสินค้าในตะกร้า</FontText>
            </View>
        );
    }

    renderSubtotal() {
        const { menuData } = this.props;
        const subtotal = this.computeSubtotal();
        return (
            <Subtotal 
                price={subtotal} 
                time={menuData.estimate_time} 
                onPress={() => this.shouldBuy()} 
            />
        );
    }

    renderConfirmPopup() {
        return (
            <OrderConfirm 
                price={this.computeSubtotal()} 
                total={this.state.menus.length}
                menuData={this.state.menus}
                visible={this.state.visible} 
                onCancel={() => this.setState({ visible: !this.state.visible })} 
                onConfirm={() => this.placeOrder()}
            />
        );
    }

    render() {
        const { data } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <RestaurantCard 
                    data={data}
                    disabled
                />
                <TextLineFont title='รายการอาหารที่สั่ง' />
                <ScrollView style={{ flex: 1 }}>
                    {this.renderMenu()}
                    <Button color={GREEN} onPress={() => Actions.pop()}>
                        <FontText color='white' size={24}>สั่งอาหารเพิ่มเติม</FontText>
                    </Button>
                    <Divider style={{ height: 10, backgroundColor: 'transparent' }} />
                </ScrollView>
                <DiscountCode onPress={() => console.log('code')} />
                {this.renderSubtotal()}
                {this.renderConfirmPopup()}
            </View>
        );
    }
}

const styles = {
    containerEmpty: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        flex: 1
    }
};

const mapStateToProps = ({ restaurant, auth }) => {
    const { data, menuData, restaurantId } = restaurant;
    const { userInfo, token } = auth;
    return { data, menuData, userInfo, restaurantId, token }; 
};

export default connect(mapStateToProps, { loadData })(MainRemain);
