import React from 'react';
import { View, ScrollView } from 'react-native';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { TextLineFont, Card, CardSection, ImageRound, Row, FontText } from './common';
import { YELLOW } from './common/colors';
import RestaurantCard from './RestaurantCard';

class ReviewPage extends React.Component {
    componentDidMount() {
        // fetch('http://10.66.10.222:8000/testing/datetime')
        //     .then(response => response.json())
        //     .then(responseData => {
        //         const newDate = responseData.toISOString();
        //         console.log(newDate)
        //     });

        // const dateTime = Date.now();
        // const dateTime = Date();

        // const formattedTimestamp = dateTime.toISOString();

        // console.log(dateTime.toISOString());
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <RestaurantCard
                    data={this.props.data}
                    disabled
                    disabledStar={this.props.data}
                />
                <TextLineFont title='ความคิดเห็นทั้งหมด' />
                <ScrollView style={{ flex: 1, marginBottom: getBottomSpace() }}>
                    <Card>
                        <CardSection>
                            <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 15 }}>
                                <Row style={{ alignItems: 'flex-start' }}>
                                    <ImageRound 
                                        source={{ uri: 'https://secure.gravatar.com/avatar/446036d58468747c85040777c7597973?s=400&d=mm&r=g' }} 
                                        rounded
                                    />
                                    <View style={{ flex: 1 }}>
                                        <Row>
                                            <FontText style={{ flex: 1 }} size={24}>Aranya Kawaii</FontText>
                                            <StarRating
                                                disabled
                                                maxStars={5}
                                                rating={4.5}
                                                starSize={14}
                                                fullStarColor={YELLOW}
                                            />
                                        </Row>
                                        <FontText>อร่อยมากค่ะ แซ่บเวอร์ ทำไว แถมใกล้ออฟฟิศ อยากให้เพื่อนๆไปลองกันนะคะ</FontText>
                                        <FontText style={{ alignSelf: 'flex-end' }}>08.30 12-02-2019</FontText>
                                    </View>
                                </Row>
                            </View>
                        </CardSection>
                    </Card>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = ({ global }) => {
    const { data, supplier_id } = global;
    return { data, supplier_id };
};

const Review = connect(mapStateToProps)(ReviewPage);
export default Review;
