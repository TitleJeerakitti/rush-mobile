import React from 'react';
import { View, KeyboardAvoidingView, ListView, LayoutAnimation, Platform, UIManager } from 'react-native';
import { connect } from 'react-redux';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { TextLineFont, FontText, ReviewCard, LoadingImage } from './common';
import RestaurantCard from './RestaurantCard';
import { SERVER, GET_REVIEW, CREATE_REVIEW } from '../../config';

class ReviewPage extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            loading: true,
            canReview: false,
            reviewData: [],
            rating: 0,
            comment: '',
            error: '',
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.getReview();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onSetState(key, data) {
        LayoutAnimation.spring();
        if (Platform.OS === 'android') {
            // UIManager.setLayoutAnimationEnabledExperimental && 
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        this.setState({ [key]: data, error: '' });
    }

    async getReview() {
        try {
            const { userInfo, supplier_id } = this.props;
            const { access_token, token_type, } = this.props.token;
            const response = await fetch(`${SERVER}${GET_REVIEW}?customer_id=${userInfo.id}&supplier_id=${supplier_id}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    Authorization: `${token_type} ${access_token}`,
                }
            });
            const responseData = await response.json();
            if (this._isMounted) {
                this.setState({
                    reviewData: responseData.reviews,
                    canReview: responseData.can_review,
                    loading: false,
                    rating: 0,
                    comment: '',
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    async createComment() {
        try {
            const { supplier_id } = this.props;
            const { access_token, token_type, } = this.props.token;
            const response = await fetch(`${SERVER}${CREATE_REVIEW}`, {
                method: 'POST',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json',
                    Authorization: `${token_type} ${access_token}`,
                },
                body: JSON.stringify({
                    supplier_id,
                    rate: this.state.rating,
                    comment: this.state.comment,
                })
            });
            const responseData = await response.json();
            console.log(responseData);
            if (this._isMounted && responseData.status === 200) {
                this.getReview();
            }
        } catch (error) {
            console.log(error);
        }
    }

    listViewCloneWithRows(data = []) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return ds.cloneWithRows(data);
    }

    submitComment() {
        LayoutAnimation.spring();
        if (Platform.OS === 'android') {
            // UIManager.setLayoutAnimationEnabledExperimental && 
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        const { rating, comment } = this.state;
        if (rating !== 0 && comment !== '') {
            this.createComment();
            this.refs.ListView_Reference.scrollTo({ animated: true }, 0);
        } else {
            this.setState({ error: 'กรุณากรอกความคิดเห็นและให้ดาวก่อนกดจ้า' });
        }
    }

    renderView() {
        if (this.state.reviewData.length > 0) {
            return (
                <ListView 
                    dataSource={this.listViewCloneWithRows(this.state.reviewData)}
                    renderRow={review => 
                        <ReviewCard 
                            data={review} 
                            rating={review.rating} 
                            disabled 
                        />
                    }
                    ref='ListView_Reference'
                    enableEmptySections
                />
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
        if (this.state.loading) {
            return <LoadingImage />;
        }
        return (
            <KeyboardAvoidingView 
                style={{ flex: 1, marginBottom: getBottomSpace() + 10 }} 
                behavior='padding' 
                enabled
            >
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
                            name: userInfo.name,
                            picture: userInfo.picture,
                        }
                    }}
                    value={this.state.comment}
                    onChangeText={(text) => this.onSetState('comment', text)}
                    onPress={() => this.submitComment()}
                    rating={this.state.rating}
                    selectedStar={(rating) => this.onSetState('rating', rating)}
                    error={this.state.error}
                />
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = ({ global, auth }) => {
    const { data, supplier_id } = global;
    const { userInfo, token } = auth;
    return { data, supplier_id, userInfo, token };
};

const Review = connect(mapStateToProps)(ReviewPage);
export default Review;
