import React from 'react';
import { View } from 'react-native';
import StarRating from 'react-native-star-rating';
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
import { YELLOW, GRAY, GREEN, DARK_RED } from './colors';

class HistoryCard extends React.Component {
    renderButton() {
        if (this.props.data.status === 5) {
            return (
                <TwoButton 
                    onFirstPress={() => console.log('first')}
                    firstText='ให้คะแนนรีวิว'
                    firstColor={GRAY}
                    onSecondPress={() => console.log('second')}
                    secondText='สั่งอีกครั้ง'
                    secondColor={YELLOW}
                />
            );
        }
        return (
            <OneButton 
                onPress={() => console.log('press')}
                text='สั่งอีกครั้ง'
                color={YELLOW}
            />
        );
    }

    renderStatus() {
        if (this.props.data.status === 5) {
            return <RowQueue queue='SUCCESS' amount={240} color={GREEN} />;
        }
        return <RowQueue queue='CANCEL' amount={240} color={DARK_RED} />;
    }

    render() {
        const { data } = this.props;
        const { image, name, rating, reviewCount, orderId, timestamp, } = data;
        return (
            <Card>
                <CardSection>
                    <View style={styles.card}>
                        <Row>
                            <ImageRound source={{ uri: image }} />
                            <View style={{ flex: 1 }}>
                                <FontText 
                                    size={26}
                                    style={{ lineHeight: 30 }}
                                    numberOfLines={1}
                                >
                                    {name}
                                </FontText>
                                <Row>
                                    <StarRating
                                        disabled
                                        maxStars={5}
                                        rating={rating}
                                        starSize={14}
                                        fullStarColor={YELLOW}
                                        emptyStarColor={YELLOW}
                                    />
                                    <FontText
                                        size={16}
                                        style={{ marginLeft: 10, flex: 1 }}
                                    >
                                        {reviewCount} รีวิว
                                    </FontText>
                                    <FontText size={16}>
                                        Order ID: {orderId}
                                    </FontText>
                                </Row>
                                <FontText size={16} style={{ alignSelf: 'flex-end' }}>
                                    {timestamp}
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
};

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

export { HistoryCard };
