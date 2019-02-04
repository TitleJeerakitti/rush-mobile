import React from 'react';
import { View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Row, FontText } from './common';
import RestaurantCard from './RestaurantCard';
import { ORANGE } from './common/colors';

class SearchByName extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            refreshing: false,
            restaurants: [],
            filters: [
                { type: 'ระยะทาง' }, 
                { type: 'ความนิยม' }, 
                { type: 'ตัวอักษร' }
            ],
            sortType: 'ระยะทาง',
            visible: false,
        };
    }
    

    onTextChange(text) {
        this.setState({
            text
        });
    }

    getRestaurantAPI() {
        fetch(`http://localhost:3000/restaurants?name=${this.state.text}`, {
            headers: {
                'Cache-Control': 'no-cache'
            }
        })
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    restaurants: responseData,
                    refreshing: false
                });
            })
            .catch(() => {
                console.log('error connect!');
            });
    }

    clearText() {
        this.setState({
            text: ''
        });
    }

    renderClear() {
        const { text } = this.state;
        if (text !== '') {
            return (
                <TouchableOpacity onPress={this.clearText.bind(this)} style={{ marginLeft: 10 }} >
                    <Icon name='close-circle' type='material-community' color={ORANGE} />
                </TouchableOpacity>
            );
        }
    }

    renderRestaurant() {
        return this.state.restaurants.map(restaurant =>
            <RestaurantCard key={restaurant.id} data={restaurant} />
        );
    }

    render() {
        const { searchBox } = styles;
        return (
            <View style={{ flex: 1 }}>
                <Row style={searchBox}>
                    <Icon name='search' />
                    <TextInput
                        value={this.state.text}
                        onChangeText={this.onTextChange.bind(this)}
                        style={{ marginLeft: 10, flex: 1, }}
                        numberOfLines={1}
                        placeholder='ค้นหาร้านอาหารที่ท่านต้องการ...'
                        autoCorrect={false}
                        autoCapitalize='none'
                        underlineColorAndroid='transparent'
                    />
                    {this.renderClear()}
                    <TouchableOpacity 
                        onPress={this.getRestaurantAPI.bind(this)} 
                        style={{ marginLeft: 10 }}
                    >
                        <FontText>ค้นหา</FontText>
                    </TouchableOpacity>
                </Row>
                <ScrollView style={{ flex: 1 }}>
                    {this.renderRestaurant()}
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    searchBox: {
        backgroundColor: '#FFF',
        height: 45,
        padding: 10,
        alignItems: 'center',
    }
};

export default SearchByName;
