import React from 'react';
import { Modal, View, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';
import { FontText, Row, CancelConfirmButton, } from '../../common';

class OrderConfirm extends React.Component {
    
    renderItem() {
        if (this.props.total > 0) {
            return this.props.menuData.map(menu => {
                return (
                    <Row key={menu.id} >
                        <FontText style={{ flex: 1 }}>{menu.name}</FontText>
                        <FontText>{menu.price.toFixed(2)} x {menu.quantity}</FontText>
                    </Row>
                );
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
                        <View style={styles.line} />
                        <Row>
                            <FontText style={{ flex: 1 }} size={24}>ราคาสุทธิ</FontText>
                            <FontText size={24}>{price.toFixed(2)} บาท</FontText>
                        </Row>
                        <Divider style={{ height: 10, backgroundColor: 'transparent' }} />
                        <CancelConfirmButton 
                            onConfirm={onConfirm}
                            onCancel={onCancel}
                        />
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
        maxHeight: '60%',
        width: '80%',
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 20,
        elevation: 10,
    },
    line: { 
        borderBottomColor: 'black', 
        borderBottomWidth: 1, 
        marginVertical: 10 
    }
};

export { OrderConfirm };
