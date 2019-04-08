import React from 'react';
import { View, TextInput, TouchableOpacity, ListView, } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Row, FontText, Empty } from './common';
import RestaurantCard from './RestaurantCard';
import { ORANGE, SERVER, SEARCH_BY_NAME } from '../../config';
import { restaurantSelected } from '../actions';
 
class SearchByName extends React.Component {
    
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            text: '',
            refreshing: false,
            restaurants: [],
            visible: false,
        };
    }

    componentDidMount() {
        this._isMounted = true;
    }
    
    componentWillUnmount() {
        this._isMounted = false;
    }

    async getRestaurantAPI() {
        try {
            const { access_token, token_type } = this.props.token;
            const response = await fetch(`${SERVER}${SEARCH_BY_NAME}?word=${this.state.text}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    Authorization: `${token_type} ${access_token}`,
                }
            });
            const responseData = await response.json();
            if (this._isMounted && response.status === 200) {
                this.setState({
                    restaurants: responseData,
                    refreshing: false
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    onSelectRestaurant(item) {
        this.props.restaurantSelected(item);
        // Actions.pop();
        Actions.restaurant_menu();
    }

    listViewCloneWithRows(data = []) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return ds.cloneWithRows(data);
    }

    renderClear() {
        const { text } = this.state;
        if (text !== '') {
            return (
                <TouchableOpacity 
                    onPress={() => this.setState({ text: '' })} 
                    style={{ marginLeft: 10 }} 
                >
                    <Icon name='close-circle' type='material-community' color={ORANGE} />
                </TouchableOpacity>
            );
        }
    }

    renderContent() {
        if (this.state.restaurants.length === 0) {
            return (
                <Empty title='ไม่มีร้านที่คุณค้นหา' />
            );
        }
        return (
            <ListView 
                dataSource={this.listViewCloneWithRows(this.state.restaurants)}
                renderRow={(restaurant) => 
                    <RestaurantCard 
                        data={restaurant} 
                        onPress={() => this.onSelectRestaurant(restaurant)} 
                    />
                }
                enableEmptySections
            />
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
                        onChangeText={(text) => this.setState({ text })}
                        style={{ marginLeft: 10, flex: 1, }}
                        numberOfLines={1}
                        placeholder='ค้นหาร้านอาหารที่ท่านต้องการ...'
                        autoCorrect={false}
                        autoCapitalize='none'
                        underlineColorAndroid='transparent'
                    />
                    {this.renderClear()}
                    <TouchableOpacity 
                        onPress={() => this.getRestaurantAPI()} 
                        style={{ marginLeft: 10 }}
                    >
                        <FontText>ค้นหา</FontText>
                    </TouchableOpacity>
                </Row>
                {this.renderContent()}
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


const mapStateToProps = ({ auth }) => {
    const { token } = auth;
    return { token };
}
export default connect(mapStateToProps, { restaurantSelected })(SearchByName);
