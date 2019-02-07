import React from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { TextLineFont, FontText, ReviewCard } from './common';
import RestaurantCard from './RestaurantCard';

class ReviewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canReview: false,
            reviewData: [],
        };
    }

    componentDidMount() {
        // fetch('http://10.66.10.222:8000/testing/datetime')
        fetch('http://localhost:3000/reviewAPI', {
            headers: {
                'Cache-Control': 'no-cache',
            }
        })
            .then(response => response.json())
            .then(responseData => {
                this.setState({ 
                    reviewData: responseData.reviews,
                    canReview: responseData.can_review,
                });
            })
            .catch(error => console.log(error));
    }

    renderReview() {
        return this.state.reviewData.map((review, index) => 
            <ReviewCard
                key={index}
                disabled
                data={review}
            />
        );
    }

    renderView() {
        if (this.state.reviewData.length > 0) {
            return (
                <ScrollView style={{ flex: 1 }}>
                    {this.renderReview()}
                </ScrollView>
            );
        }
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <FontText>{this.props.data.name}</FontText>
                <FontText>ยังไม่มีรีวิว</FontText>
            </View>
        );
    }

    render() {
        const { data, userInfo } = this.props;
        return (
            <View style={{ flex: 1, marginBottom: getBottomSpace() + 10 }}>
                <RestaurantCard
                    data={data}
                    disabled
                    disabledStar
                />
                <TextLineFont title='ความคิดเห็นทั้งหมด' />
                {this.renderView()}
                <View style={{ borderBottomWidth: 1, marginTop: 10, marginHorizontal: 10 }} />
                <ReviewCard 
                    disabled={!this.state.canReview}
                    data={{
                        customer_detail: {
                            name: userInfo ? userInfo.name : 'Guest',
                            picture: userInfo ? userInfo.picture : 'http://pluspng.com/img-png/user-png-icon-male-user-icon-512.png'
                        }
                    }}
                />
            </View>
        );
    }
}

const mapStateToProps = ({ global, auth }) => {
    const { data, supplier_id } = global;
    const { userInfo } = auth;
    return { data, supplier_id, userInfo };
};

const Review = connect(mapStateToProps)(ReviewPage);
export default Review;
