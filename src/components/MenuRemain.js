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
import { GREEN } from './common/colors';
import RestaurantCard from './RestaurantCard';

class MainRemain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            menus: [],
        };
    }

    shouldBuy() {
        if (this.props.total > 0) {
            this.confirmData();
            this.setState({ visible: true });
        }
    }

    confirmData() {
        if (this.props.total > 0) {
            const mainCategories = this.props.menuData.main_categories;
            mainCategories.forEach(mainCategory => {
                const subCategories = mainCategory.sub_categories;
                subCategories.forEach(subCategory => {
                    const menus = subCategory.menus;
                    menus.forEach(menu => {
                        if (menu.quantity > 0) {
                            this.setState(prevState => ({
                                menus: [...prevState.menus, { id: menu.id, qty: menu.quantity }]
                            }));
                        }
                    });
                });
            });
        }
    }

    placeOrder() {
        this.setState({ visible: false, menus: [] });
        this.props.loadData();
        Actions.popTo('home_homepage');
        Actions.queue();
    }

    renderMenu() {
        if (this.props.total > 0) {
            const mainCategories = this.props.menuData.main_categories;
            return mainCategories.map((mainCategory, mainIndex) => {
                const subCategories = mainCategory.sub_categories;
                return subCategories.map((subCategory, subIndex) => {
                    const menus = subCategory.menus;
                    return menus.map((menu, index) => {
                        if (menu.quantity > 0) {
                            return (
                                <MenuCard 
                                    key={menu.id} 
                                    data={menu}
                                    subIndex={subIndex}
                                    index={index}
                                    currentCategory={mainIndex}
                                />
                            );
                        }
                        return <View key={index} />;
                    });
                });
            });
        }
        return (
            <View style={styles.containerEmpty}>
                <FontText>ไม่มีสินค้าในตะกร้า</FontText>
            </View>
        );
    }

    renderConfirmPopup() {
        return (
            <OrderConfirm 
                price={this.props.subTotal} 
                total={this.props.total}
                menuData={this.props.menuData}
                visible={this.state.visible} 
                onCancel={() => this.setState({ visible: !this.state.visible, menus: [] })} 
                onConfirm={() => this.placeOrder()}
            />
        );
    }

    render() {
        const { data, menuData, subTotal } = this.props;
        // console.log(this.state.menus);

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
                <Subtotal 
                    price={subTotal} 
                    time={menuData.estimate_time} 
                    onPress={() => this.shouldBuy()} 
                />
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

const mapStateToProps = ({ restaurant }) => {
    const { data, total, menuData, subTotal } = restaurant;
    return { data, total, menuData, subTotal }; 
};

export default connect(mapStateToProps, { loadData })(MainRemain);
