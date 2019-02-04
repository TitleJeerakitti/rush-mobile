import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { Card, CardSection, ImageRound, Row, FontText } from './common';
import { loadData } from '../actions';
import { YELLOW, DARK_RED, GREEN, ORANGE } from './common/colors';
import RestaurantCard from './RestaurantCard';

class Queue extends React.Component {
    // componentDidMount() {
    //     setTimeout(() => {
    //         this.props.loadData();
    //     }, 3000);
    // }

    render() {
        if (this.props.dataLoad) {
            return (
                <View 
                    style={{ 
                        flex: 1, 
                        backgroundColor: '#F5F5F5', 
                        justifyContent: 'center', 
                        alignItems: 'center' 
                    }}
                >
                    {/* <Text>{this.props.dataLoad}</Text> */}
                    <Image
                        style={{ width: '50%', height: '50%' }}
                        source={require('../images/Tuuf.gif')}
                    />
                </View>
            );
        }
        return (
            <ScrollView>
                <RestaurantCard
                    data={{
                        isOpen: true,
                        name: 'Starbuck',
                        image: 'https://upload.wikimedia.org/wikipedia/el/thumb/e/e3/Starbucks_logo.svg/480px-Starbucks_logo.svg.png',
                        rating: 4.7,
                        reviewCount: 127,
                        category: 'Cafe',
                        distance: 800
                    }}
                    disabled
                >
                    <Card>
                        <Row>
                            <View 
                                style={{ 
                                    flex: 3, 
                                    alignItems: 'center', 
                                    backgroundColor: '#FFF', 
                                    marginLeft: -10, 
                                    paddingVertical: 10, 
                                    shadowOpacity: 0.1,
                                    shadowOffset: { width: -5, height: 0 },
                                    shadowRadius: 10,
                                }}
                            >
                                {/* <Row> */}
                                    {/* <FontText style={{ flex: 1 }}>Order ID: 1234567890</FontText> */}
                                    <FontText size={24} /*color='white'*/ style={{ lineHeight: 29 }} >240.00 บาท</FontText>
                                {/* </Row> */}
                            </View>
                            <View 
                                style={{ 
                                    flex: 2,
                                    backgroundColor: YELLOW, 
                                    marginRight: -10, 
                                    paddingVertical: 10, 
                                    alignItems: 'center', 
                                    shadowOpacity: 0.1,
                                    shadowOffset: { width: -5, height: 0 },
                                    shadowRadius: 10,
                                    // borderTopLeftRadius: 10,
                                    // borderBottomLeftRadius: 10,
                                }}
                            >
                                <Text style={{ fontWeight: 'bold', color: '#FFF', fontSize: 24 }}>A 0012</Text>
                            </View>
                        </Row>
                    </Card>
                    <Card style={{ paddingVertical: 20 }}>
                        <Row>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Image source={require('../images/inprogress.png')} style={{ width: 50, height: 50 }} />
                                <FontText color={DARK_RED}>รอร้านตอบรับ</FontText>
                            </View>
                            <Icon name='skip-next-circle' type='material-community' />
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Image source={require('../images/cooking.png')} style={{ width: 50, height: 50 }} />
                                <FontText color={'black'}>กำลังปรุง</FontText>
                            </View>
                            <Icon name='skip-next-circle' type='material-community' />
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Image source={require('../images/tray.png')} style={{ width: 50, height: 50 }} />
                                <FontText color={'black'}>เสร็จแล้วจ้า</FontText>
                            </View>
                        </Row>
                    </Card>
                    <Card style={{ marginHorizontal: -10, marginBottom: -10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, }}>
                        <Row>
                            <TouchableOpacity style={{ flex: 1, padding: 10, backgroundColor: DARK_RED, borderBottomLeftRadius: 10, alignItems: 'center' }} onPress={() => console.log('error')}>
                                <FontText color={'white'}>ยกเลิก</FontText>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, padding: 10, backgroundColor: YELLOW, borderBottomRightRadius: 10, alignItems: 'center' }} onPress={() => console.log('error')}>
                                <FontText color={'white'}>ดูรายละเอียด</FontText>
                            </TouchableOpacity>
                        </Row>
                    </Card>
                </RestaurantCard>
            </ScrollView>
        );
    }
}

const styles = {
    card: {
        backgroundColor: '#fefefe',
        padding: 10,
        borderRadius: 15,
        shadowOpacity: 0.1,
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 5 },
    }
};

const mapStateToProps = ({ global }) => {
    const { dataLoad } = global;
    return { dataLoad };
};

export default connect(mapStateToProps, { loadData })(Queue);
