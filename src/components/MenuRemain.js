import React from 'react';
import { View, ListView, } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
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
import { GREEN, SERVER, CREATE_NEW_ORDER, CHECK_PROMO_CODE } from '../../config';
import RestaurantCard from './RestaurantCard';

class MainRemain extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            visible: false,
            menus: [],
            discountCode: null,
            errorMessage: '',
            discountPrice: null,
            totalPrice: null,
            canUse: false,
        };
    }

    componentDidMount() {
        this._isMounted = true;
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
            const { totalPrice, discountPrice, canUse } = this.state;
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
                    total: totalPrice || this.computeSubtotal(),
                    special_request: '',
                    discount: discountPrice || 0,
                    category: 'R',
                    promotion_code: canUse ? null : this.state.discountCode,
                }),
            });
            return response;
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    getMenus(menuData) {
        if (menuData !== undefined) {
            const menuList = this.makeMenuList(menuData);
            this._isMounted && this.setState({ menus: menuList });
        } else {
            this._isMounted && this.setState({ menus: [] });
        }
    }

    listViewCloneWithRows(data = []) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return ds.cloneWithRows(data);
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
        if (this.state.menus.length > 0 && this._isMounted) {
            this.setState({ visible: true });
        }
    }

    async placeOrder() {
        const { status } = await this.getAPI(CREATE_NEW_ORDER);
        console.log('order', status);
        if (status === 200 && this._isMounted) {
            await this.setState({ visible: false, menus: [] });
            // this.props.loadData();
            Actions.popTo('home_homepage');
            Actions.queue();
        }
    }

    async checkPromo() {
        const response = await this.getAPI(CHECK_PROMO_CODE);
        const { status, total, discount_price } = await response.json();
        if (status === 200 && this._isMounted) {
            await this.setState({ 
                discountPrice: discount_price, 
                totalPrice: total, 
                canUse: true, 
            });
        } else if (status === 600 && this._isMounted) {
            await this.setState({ errorMessage: 'Invalid Promotion Code' });
        } else if (status === 601 && this._isMounted) {
            await this.setState({ errorMessage: 'Promotion already used' });
        } else if (status === 602 && this._isMounted) {
            await this.setState({ errorMessage: 'Your price is below for this code' });
        } else if (status === 603 && this._isMounted) {
            await this.setState({ errorMessage: 'Invalid code for this restaurant' });
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

    renderEmpty() {
        const { menus } = this.state;
        if (menus.length === 0) {
            return (
                <View style={styles.containerEmpty}>
                    <FontText>ไม่มีสินค้าในตะกร้า</FontText>
                </View>
            );
        }
    }

    renderSubtotal() {
        const { menuData } = this.props;
        const { totalPrice } = this.state;
        const subtotal = this.computeSubtotal();
        return (
            <Subtotal 
                price={totalPrice || subtotal} 
                time={menuData.estimate_time} 
                onPress={() => this.shouldBuy()} 
            />
        );
    }

    renderConfirmPopup() {
        return (
            <OrderConfirm 
                price={this.state.totalPrice || this.computeSubtotal()}
                discountPrice={this.state.discountPrice}
                menuData={this.state.menus}
                visible={this.state.visible} 
                onCancel={() => this._isMounted && this.setState({ 
                    visible: !this.state.visible, 
                    errorMessage: '', 
                    discountCode: null, 
                    totalPrice: null, 
                    discountPrice: null,
                    canUse: false,
                })} 
                onConfirm={() => this.placeOrder()}
                discountCode={this.state.discountCode}
                onChangeCode={(text) => this.setState({ discountCode: text, errorMessage: '' })}
                errorMessage={this.state.errorMessage}
                onCheckCode={() => this.checkPromo()}
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
                <ListView 
                    dataSource={this.listViewCloneWithRows(this.state.menus)}
                    enableEmptySections
                    renderHeader={() => this.renderEmpty()}
                    renderRow={(menu) => 
                        <MenuCard 
                            data={menu}
                            index={menu.index}
                            currentCategory={menu.mainIndex}
                            subIndex={menu.subIndex}
                        />
                    }
                    renderFooter={() => 
                        <Button 
                            color={GREEN} 
                            onPress={() => Actions.pop()} 
                            style={{ marginBottom: 10, }}
                        >
                            <FontText color='white' size={24}>สั่งอาหารเพิ่มเติม</FontText>
                        </Button>
                    }
                />
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
