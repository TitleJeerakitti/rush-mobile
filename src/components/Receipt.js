import React from 'react';
import { View, ListView, } from 'react-native';
import { connect } from 'react-redux';
import RestaurantCard from './RestaurantCard';
import { 
    TextLineFont,
    MenuCard, 
    Card, 
    CardSection, 
    FontText, 
    Row, 
    LoadingImage, 
    Space,
} from './common';
import { SERVER, GET_ORDER_DETAIL } from '../../config';

class Receipt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            menus: this.listViewCloneWithRows(),
            total: 0,
            visible: false,
        };
    }

    async componentDidMount() {
        this.mounted = true;
        try {
            const { access_token, token_type, } = this.props.token;
            const response = await fetch(`${SERVER}${GET_ORDER_DETAIL}?order_id=${this.props.orderId}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    Authorization: `${token_type} ${access_token}`,
                }
            });
            const responseData = await response.json();
            // console.log(responseData);
            if (this.mounted) {
                await this.setState({
                    data: responseData.supplier_detail,
                    menus: this.listViewCloneWithRows(responseData.menus),
                    total: responseData.total
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    listViewCloneWithRows(data = []) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return ds.cloneWithRows(data);
    }

    render() {
        if (this.state.menus._cachedRowCount > 0) {
            return (
                <View style={{ flex: 1 }}>
                    <RestaurantCard
                        data={this.state.data}
                        disabled
                    />
                    <TextLineFont title='รายการอาหารที่สั่ง' />
                    <ListView 
                        style={{ flex: 1 }}
                        dataSource={this.state.menus}
                        renderRow={(menu) => <MenuCard data={menu} notQuantity />}
                        renderFooter={() => <Space />}
                    />
                    <Card style={styles.line} />
                    <Card style={{ marginBottom: 10 }}>
                        <CardSection>
                            <Row>
                                <FontText style={{ flex: 1 }} size={24}>ราคาสุทธิ</FontText>
                                <FontText size={24} >{this.state.total.toFixed(2)} บาท</FontText>
                            </Row>
                        </CardSection>
                    </Card>
                </View>
            );
        }
        return <LoadingImage />;
    }
}

const styles = {
    line: {
        borderBottomWidth: 1, 
        borderColor: 'black', 
        marginHorizontal: 10
    }
};

const mapStateToProps = ({ queue, auth }) => {
    const { orderId } = queue;
    const { token } = auth;
    return { orderId, token };
};

export default connect(mapStateToProps)(Receipt);
