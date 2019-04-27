import React from 'react';
import { View, TextInput, TouchableOpacity, } from 'react-native';
import StarRating from 'react-native-star-rating';
import { Card, CardSection, Row, ImageRound, FontText } from '../common';
import { YELLOW, ORANGE, DARK_RED } from '../../../config';

class ReviewCard extends React.Component {

    renderComment() {
        const { disabled, data, value, onChangeText, } = this.props;
        if (disabled && data.comment) {
            return (
                <FontText>
                    {data.comment}
                </FontText>
            );
        }
        if (disabled) {
            return (
                <FontText style={{ alignSelf: 'center', color: 'gray' }}>
                    กรุณาสั่งอาหารก่อนแสดงความเห็น
                </FontText>
            );
        }
        return (
            <TextInput 
                style={styles.textInput} 
                value={value}
                placeholder='แสดงความคิดเห็น...' 
                onChangeText={onChangeText}
                autoCapitalize='none'
                autoCorrect={false}
            />
        );
    }

    renderButton() {
        if (this.props.disabled) {
            return (
                <FontText style={{ alignSelf: 'flex-end' }} size={16}>
                    {this.props.data.timestamp}
                </FontText>
            );
        }
        return (
            <Row style={{ marginTop: 10 }}>
                <View style={{ flex: 1 }} />
                <TouchableOpacity 
                    style={styles.buttonSubmit}
                    onPress={this.props.onPress}
                >
                    <FontText color='white'>Comment</FontText>
                </TouchableOpacity>
            </Row>
        );
    }

    renderError(error) {
        if (error) {
            return <FontText style={{ color: DARK_RED, }}>{error}</FontText>;
        }
    }

    render() {
        const { disabled, data, selectedStar, rating, error } = this.props;
        return (
            <Card>
                <CardSection>
                    <View style={styles.container}>
                        <Row style={{ alignItems: 'flex-start' }}>
                            <ImageRound 
                                source={{ uri: data.customer_detail.picture }} 
                                small
                            />
                            <View style={{ flex: 1 }}>
                                <Row>
                                    <FontText style={{ flex: 1 }} size={24}>
                                        {data.customer_detail.name}
                                     </FontText>
                                    <StarRating
                                        disabled={disabled}
                                        maxStars={5}
                                        rating={rating}
                                        starSize={14}
                                        fullStarColor={YELLOW}
                                        emptyStarColor={YELLOW}
                                        selectedStar={selectedStar}
                                    />
                                </Row>
                                {this.renderError(error)}
                                {this.renderComment()}
                                {this.renderButton()}
                            </View>
                        </Row>
                    </View>
                </CardSection>
            </Card>
            // </KeyboardAvoidingView>
        );
    }
}

const styles = {
    container: {
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        backgroundColor: 'white', 
        padding: 10, 
        borderRadius: 15
    },
    textInput: {
        fontFamily: 'thaisans',
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4
    },
    buttonSubmit: {
        paddingHorizontal: 10,
        backgroundColor: ORANGE, 
        borderRadius: 13
    }
};

export { ReviewCard };
