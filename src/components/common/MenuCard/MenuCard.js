import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import { Card, CardSection, ImageRound, FontText, QuantityButton } from '../../common';
import { editMenu } from '../../../actions/';
import { ORANGE } from '../colors';

class MenuContainer extends React.Component {

    subtractAmount() {
        const { subIndex, index, currentCategory, menuData } = this.props;
        const menu = menuData.main_categories[currentCategory]
                    .sub_categories[subIndex].menus[index];
        const quantity = menu.quantity;
        if (quantity > 0) {
            const payload = update(menuData, {
                main_categories: {
                    [currentCategory]: {
                        sub_categories: {
                            [subIndex]: {
                                menus: {
                                    [index]: {
                                        quantity: { $set: quantity - 1 }
                                    }
                                }
                            }
                        }
                    }
                }
            });
            this.props.editMenu(payload);
        }
    }

    additionAmount() {
        const { subIndex, index, currentCategory, menuData } = this.props;
        const menu = menuData.main_categories[currentCategory]
                    .sub_categories[subIndex].menus[index];
        const quantity = menu.quantity;
        const payload = update(menuData, {
            main_categories: {
                [currentCategory]: {
                    sub_categories: {
                        [subIndex]: {
                            menus: {
                                [index]: {
                                    quantity: { $set: quantity + 1 }
                                }
                            }
                        }
                    }
                }
            }
        });
        this.props.editMenu(payload);
    }

    renderQuantity() {
        const { notQuantity, data } = this.props;
        if (notQuantity) {
            return (
                <View style={styles.quantity}>
                    <Text style={styles.quantityText}>x {data.quantity}</Text>
                </View>
            );
        }
        return (
            <QuantityButton 
                quantity={data.quantity} 
                onLeft={this.subtractAmount.bind(this)}
                onRight={this.additionAmount.bind(this)}
            />
        );
    }

    render() {
        const { data } = this.props;
        const { name, price, picture } = data;
        return (
            <Card>
                <CardSection>
                    <View style={styles.container} >
                        <ImageRound source={{ uri: picture }} />
                        <View style={{ justifyContent: 'center', flex: 1 }}>
                            <FontText>{name}</FontText>
                            <FontText>{price} บาท</FontText>
                        </View>
                        {this.renderQuantity()}
                    </View>
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    container: {
        flex: 1, 
        borderRadius: 20,
        backgroundColor: '#FFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        flexDirection: 'row',
        padding: 10,
        elevation: 4,
    },
    quantity: { 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: ORANGE, 
        minWidth: '20%', 
        marginVertical: -10, 
        marginRight: -10, 
        borderTopRightRadius: 10, 
        borderBottomRightRadius: 10, 
        paddingHorizontal: 10 
    },
    quantityText: {
        fontSize: 28, 
        fontWeight: 'bold', 
        color: 'white'
    }
};

const mapStateToProps = ({ restaurant }) => {
    const { menuData } = restaurant;
    return { menuData };
};

const MenuCard = connect(mapStateToProps, { editMenu })(MenuContainer);
export { MenuCard };
