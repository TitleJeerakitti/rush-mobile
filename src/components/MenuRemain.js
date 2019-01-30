import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import update from 'immutability-helper';
import { TextLineFont, Button, FontText, DiscountCode, Subtotal, MenuCard } from './common';
import { GREEN } from './common/colors';
import RestaurantCard from './RestaurantCard';

class MainRemain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            all_menus: []
        };
    }

    // componentWillMount() {
    //     fetch('http://localhost:3000/fake_remain?id=00005', {
    //         headers: {
    //             'Cache-Control': 'no-cache'
    //         }
    //     })
    //         .then((response) => response.json())
    //         .then((responseData) => {
    //             const data = responseData.pop();
    //             this.setState({ ...this.state, all_menus: data.menu });
    //         }
    //             // this.props.menus.map(menu => 
    //             //     console.log(responseData[0].menu.filter((data) => data.id === menu.id))
    //             //     //this.setState({ ...this.state, all_menus: this.state.all_menus.push(responseData[0].menu.filter((data) => data.id === menu.id)) })
    //             //     // update(this.state, {
    //             //     //     all_menus: { $push: [responseData[0].menu.filter((data) => data.id === menu.id)] }
    //             //     // })
    //             //     )
    //         )
    //         .catch((error) => console.log(error));
    // }

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
                                    id={menu.id}
                                    name={menu.name} 
                                    price={menu.price} 
                                    picture={menu.picture}
                                    qty={menu.quantity} 
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
            // return this.props.menus.map(menu => {
            //     const value = this.state.all_menus.filter((data) => data.id === menu.id);
            //     const data = value.pop();
            //     if (data !== undefined && menu.qty > 0) {
            //         return (
            //             // <Text key={menu.id}>{valueData.name} จำนวน {menu.qty}</Text>
            //             <MenuCard 
            //                 key={data.id} 
            //                 id={data.id}
            //                 name={data.name} 
            //                 price={data.price} 
            //                 picture={data.picture} 
            //             />
            //         );
            //     }
            // }
            // );
        }
        return (
            <View 
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 100,
                    flex: 1
                }}
            >
                <FontText>ไม่มีสินค้าในตะกร้า</FontText>
            </View>
        );
    }

    render() {
        // console.log(this.state);
        return (
            <View style={{ flex: 1 }}>
                <RestaurantCard 
                    data={this.props.data}
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
                <Subtotal price={240.00} time={20} />
            </View>
        );
    }
}

const mapStateToProps = ({ restaurant }) => {
    const { menus, data, total, menuData } = restaurant;
    // console.log(menus);
    return { menus, data, total, menuData }; 
};

export default connect(mapStateToProps, null)(MainRemain);
