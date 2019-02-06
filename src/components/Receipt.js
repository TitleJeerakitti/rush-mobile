import React from 'react';
import { View, ScrollView } from 'react-native';
import RestaurantCard from './RestaurantCard';
import { TextLineFont, MenuCard, Card, CardSection, FontText, Row } from './common';

class Receipt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            menus: [],
            total: 0,
            visible: false,
        };
    }

    componentDidMount() {
        this.mounted = true;
        fetch('http://localhost:3000/receipt', {
            headers: {
                'Cache-Control': 'no-cache',
            }
        })
        .then(response => response.json())
        .then(responseData => {
            if (this.mounted) {
                this.setState({
                    data: responseData.supplier_detail,
                    menus: responseData.menus,
                    total: responseData.total
                });
            }
        })
        .catch(error => console.log(error));
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    renderMenu() {
        if (this.state.menus.length > 0) {
            return this.state.menus.map((menu, index) => 
                <MenuCard key={index} data={menu} notQuantity />
            );
        }
    }

    render() {
        console.log(this.mounted);
        return (
            <View style={{ flex: 1 }}>
                <RestaurantCard
                    data={this.state.data}
                    disabled
                />
                <TextLineFont title='รายการอาหารที่สั่ง' />
                <ScrollView style={{ flex: 1 }}>
                    {this.renderMenu()}
                    <View style={{ marginTop: 10 }} />
                    <Card style={styles.line} />
                    <Card>
                        <CardSection>
                            <Row>
                                <FontText style={{ flex: 1 }} size={24}>ราคาสุทธิ</FontText>
                                <FontText size={24} >{this.state.total.toFixed(2)} บาท</FontText>
                            </Row>
                        </CardSection>
                    </Card>
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    line: {
        borderBottomWidth: 1, 
        borderColor: 'black', 
        marginHorizontal: 10
    }
};

export default Receipt;
