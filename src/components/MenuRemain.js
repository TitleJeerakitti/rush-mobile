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
    Subtotal, 
    MenuCard, 
    OrderConfirm,
} from './common';
import { loadData } from '../actions';
import { GREEN, SERVER, CREATE_NEW_ORDER, CHECK_PROMO_CODE } from './common/config';
import RestaurantCard from './RestaurantCard';

class MainRemain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            menus: [],
            discountCode: null,
            errorMessage: '',
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

    async getAPI(body) {
        try {
            const { access_token, token_type, } = this.props.token;
            const response = await fetch(`${SERVER}${body}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `${token_type} ${access_token}`,
                },
                body: JSON.stringify({
                    supplier_id: this.props.restaurantId,
                    menus: this.makeMenuSentAPI(this.state.menus),
                    total: this.computeSubtotal(),
                    special_request: '',
                    discount: 0,
                    category: 'R',
                    promotion_code: this.state.discountCode === '' ? null : this.state.discountCode,
                }),
            });
            const responseData = await response.json();
            return responseData;
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    getMenus(menuData) {
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
            const { status } = await this.getAPI(CREATE_NEW_ORDER);
            if (status === 200) {
                await this.setState({ visible: false, menus: [] });
                this.props.loadData();
                Actions.popTo('home_homepage');
                Actions.queue();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async checkPromo() {
        try {
            const { status } = await this.getAPI(CHECK_PROMO_CODE);
            if (status === 200) {
                await this.setState({ errorMessage: 'Can use!' });
            } else if (status === 600) {
                await this.setState({ errorMessage: 'Invalid Promotion Code' });
            } else if (status === 601) {
                await this.setState({ errorMessage: 'Promotion already used' });
            } else if (status === 602) {
                await this.setState({ errorMessage: 'Your price is below for this code' });
            } else if (status === 603) {
                await this.setState({ errorMessage: 'Invalid code for this restaurant' });
            }
        } catch (err) {
            console.log(err);
        }
    }

    computeSubtotal() {
        const { menus } = this.state;
        if (menus.length > 0) {
            return menus.reduce((subtotal, menu) => {
                const total = subtotal + (menu.price * menu.quantity);
                return total;
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
                onCancel={() => this.setState({ visible: !this.state.visible, errorMessage: '', discountCode: null })} 
                onConfirm={() => this.state.discountCode && this.state.discountCode !== '' ? this.checkPromo() : this.placeOrder()}
                discountCode={this.state.discountCode}
                onChangeCode={(text) => this.setState({ discountCode: text, errorMessage: '' })}
                errorMessage={this.state.errorMessage}
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
                {/* <DiscountCode onPress={() => console.log('code')} /> */}
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
