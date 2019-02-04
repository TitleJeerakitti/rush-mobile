import React from 'react';
import { Modal, View, ScrollView, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
// import update from 'immutability-helper';
// import { BlurView } from 'expo';  
import { FontText, TextLineFont, Row, Button } from '../../common';
import { GREEN, DARK_RED } from '../colors';

class OrderConfirm extends React.Component {
    
    renderItem() {
        if (this.props.total > 0) {
            const mainCategories = this.props.menuData.main_categories;
            return mainCategories.map((mainCategory) => {
                const subCategories = mainCategory.sub_categories;
                return subCategories.map((subCategory) => {
                    const menus = subCategory.menus;
                    return menus.map((menu, index) => {
                        if (menu.quantity > 0) {
                            return (
                                <Row
                                    key={menu.id} 
                                >
                                    <FontText style={{ flex: 1 }}>{menu.name}</FontText>
                                    <FontText>{menu.price.toFixed(2)} x {menu.quantity}</FontText>
                                </Row>
                            );
                        }
                        return <View key={index} />;
                    });
                });
            });
        }
    }

    render() {
        const { visible, onConfirm, onCancel, price } = this.props;
        
        return (
            <Modal
                visible={visible}
                transparent
                animationType='fade'
            >
                <View style={styles.container}>
                    <View style={styles.containerChild}>
                        {/* <TextLineFont title='รายการอาหารของท่าน' /> */}
                        <View style={{ alignItems: 'center' }}>
                            <FontText size={28}>ยืนยันการสั่งอาหาร</FontText>
                        </View>
                        <Row>
                            <FontText style={{ flex: 1 }} size={24}>รายการอาหาร</FontText>
                            <FontText size={24}>จำนวน</FontText>
                        </Row>
                        <ScrollView>
                            {this.renderItem()}
                        </ScrollView>
                        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginVertical: 10 }} />
                        <Row>
                            <FontText style={{ flex: 1 }} size={24}>ราคาสุทธิ</FontText>
                            <FontText size={24}>{price.toFixed(2)} บาท</FontText>
                        </Row>
                        <Divider style={{ height: 10, backgroundColor: 'transparent' }} />
                        <Row>
                            <TouchableOpacity onPress={onCancel} style={[styles.btn, { borderColor: DARK_RED }]} >
                                <FontText color={DARK_RED}>ยกเลิก</FontText>
                            </TouchableOpacity>
                            <View style={{ flex: 1 }} />
                            <TouchableOpacity onPress={onConfirm} style={[styles.btn, { borderColor: GREEN, backgroundColor: GREEN }]} >
                                <FontText color='white'>ยืนยัน</FontText>
                            </TouchableOpacity>
                        </Row>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = {
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginBottom: 40
    },
    containerChild: {
        maxHeight: '40%',
        width: '80%',
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 20,
    },
    btn: {
        flex: 5,
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 5,
        borderRadius: 19,
        borderWidth: 1,
    }
};

export { OrderConfirm };
