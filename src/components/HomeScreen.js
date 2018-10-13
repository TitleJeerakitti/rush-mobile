import React from 'react';
import { ScrollView, Text, } from 'react-native';
import { Slick, SlickItem } from './common';


export default class HomeScreen extends React.Component {
    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <Slick>
                    <SlickItem source={require('../images/promotion_mockup.png')} />
                    <SlickItem source={require('../images/promotion_2.png')} />
                    <SlickItem source={require('../images/promotion_3.png')} />
                    <SlickItem source={require('../images/promotion3.png')} />
                </Slick>
                <Text style={{ flex: 1 }}>Section</Text>
            </ScrollView>
        );
    }
}
