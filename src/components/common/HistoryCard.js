import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import StarRating from 'react-native-star-rating';
import { Actions } from 'react-native-router-flux';
import { 
    Card, 
    CardSection, 
    Row, 
    ImageRound, 
    FontText, 
    RowQueue, 
    ButtonBottomCard, 
    TwoButton,
    OneButton,
} from '../common';
import { YELLOW, GRAY, GREEN, DARK_RED } from './config';
import { getOrderAgain } from '../../actions';

class History extends React.Component {
    orderAgain() {
        const { order_detail, supplier_detail } = this.props.data;
        this.props.getOrderAgain(supplier_detail, order_detail.order_id);
        Actions.jump('homepage');
        Actions.reset('home_homepage');
        Actions.push('restaurant_menu');
    }

    renderButton() {
        const { order_detail } = this.props.data;
        if (order_detail.status === 5) {
            return (
                <TwoButton 
                    onFirstPress={() => console.log('first')}
                    firstText='ให้คะแนนรีวิว'
                    firstColor={GRAY}
                    onSecondPress={() => this.orderAgain()}
                    secondText='สั่งอีกครั้ง'
                    secondColor={YELLOW}
                />
            );
        }
        return (
            <OneButton 
                onPress={() => this.orderAgain()}
                text='สั่งอีกครั้ง'
                color={YELLOW}
            />
        );
    }

    renderStatus() {
        const { status, total } = this.props.data.order_detail;
        if (status === 5) {
            return <RowQueue queue='SUCCESS' amount={total} color={GREEN} />;
        }
        return <RowQueue queue='CANCEL' amount={total} color={DARK_RED} />;
    }

    render() {
        const { data } = this.props;
        const { order_detail, supplier_detail } = data;
        return (
            <Card>
                <CardSection>
                    <View style={styles.card}>
                        <Row>
                            <ImageRound source={{ uri: supplier_detail.image }} />
                            <View style={{ flex: 1 }}>
                                <FontText 
                                    size={26}
                                    style={{ lineHeight: 30 }}
                                    numberOfLines={1}
                                >
                                    {supplier_detail.name}
                                </FontText>
                                <Row>
                                    <StarRating
                                        disabled
                                        maxStars={5}
                                        rating={supplier_detail.rating}
                                        starSize={14}
                                        fullStarColor={YELLOW}
                                        emptyStarColor={YELLOW}
                                    />
                                    <FontText
                                        size={16}
                                        style={{ marginLeft: 10, flex: 1 }}
                                    >
                                        {supplier_detail.reviewCount} รีวิว
                                    </FontText>
                                    <FontText size={16}>
                                        Order ID: {order_detail.order_id}
                                    </FontText>
                                </Row>
                                <FontText size={16} style={{ alignSelf: 'flex-end' }}>
                                    {order_detail.timestamp}
                                </FontText>
                            </View>
                        </Row>
                        {this.renderStatus()}
                        <ButtonBottomCard style={{ marginTop: 20 }}>
                            {this.renderButton()}
                        </ButtonBottomCard>
                    </View>
                </CardSection>
            </Card>
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
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        elevation: 4
        ,
    }
};

const HistoryCard = connect(null, { getOrderAgain })(History);
export { HistoryCard };
