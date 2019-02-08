import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SlickItem } from './common';

class Promotion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sources: [
                '../images/promotion_mockup.png',
                '../images/promotion_2.png',
                '../images/promotion_3.png',
                '../images/promotion_mockup.png'
            ]
        };
    }

    renderPromotion() {
        return this.state.sources.map((source, index) => 
            <TouchableOpacity 
                key={index} 
                onPress={() => console.log('test')} 
                activeOpacity={1}
                style={{ marginTop: 5 }}
            >
                <SlickItem source={require('../images/promotion_mockup.png')} />
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                {this.renderPromotion()}
                <View style={{ marginTop: 5 }} />
            </ScrollView>
        );
    }
}

export default Promotion;
