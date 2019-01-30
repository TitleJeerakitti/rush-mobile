import React from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
// import update from 'immutability-helper';
import { TextLineFont, Button, FontText, DiscountCode, Subtotal, MenuCard } from './common';
import { GREEN } from './common/colors';
import RestaurantCard from './RestaurantCard';

class MainRemain extends React.Component {

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

    render() {
        const { data, menuData, subTotal, total } = this.props;

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
                </ScrollView>
                <DiscountCode onPress={() => console.log('code')} />
                <Subtotal price={subTotal} time={menuData.estimate_time} total={total} />
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

export default connect(mapStateToProps, null)(MainRemain);
