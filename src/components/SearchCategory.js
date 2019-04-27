import React from 'react';
import { View, ListView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Space, LoadingImage, Empty } from './common';
import { SERVER, SEARCH_CATEGORY } from '../../config';
import RestaurantCard from './RestaurantCard';
import CategoryCard from './advance_component/CategoryCard';
import { restaurantSelected } from '../actions';

class SearchCategory extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            loading: true,
            category: this.props.categoryType,
            data: []
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.getRestaurant();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async getRestaurant() {
        try {
            const { access_token, token_type } = this.props.token;
            const response = await fetch(`${SERVER}${SEARCH_CATEGORY}?id=${this.state.category.id}`, {
                headers: {
                    Authorization: `${token_type} ${access_token}`,
                }
            });
            const responseData = await response.json();
            if (this._isMounted && response.status === 200) {
                this.setState({ data: responseData, loading: false });
            }
        } catch (error) {
            Alert.alert('Connect lost try again!');
            if (this._isMounted) {
                this.setState({ loading: false });
            }
        }
    }

    listViewCloneWithRows(data = []) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return ds.cloneWithRows(data);
    }

    render() {
        if (this.state.loading) {
            return <LoadingImage />;
        } else if (this.state.data.length > 0) {
            return (
                <View style={{ flex: 1, }}>
                    <CategoryCard category={this.state.category} />
                    <ListView 
                        dataSource={this.listViewCloneWithRows(this.state.data)}
                        renderRow={(item) => 
                            <RestaurantCard 
                                data={item}
                                onPress={() => {
                                    this.props.restaurantSelected(item);
                                    Actions.restaurant_menu();
                                }}
                            />
                        }
                        renderFooter={() => <Space />}
                        enableEmptySections
                    />
                </View>
            );
        }
        return (
            <View style={{ flex: 1 }}>
                <CategoryCard category={this.state.category} />
                <Empty title={`ไม่มีร้านประเภท ${this.state.category.name} ในระบบตอนนี้`} />
            </View>
        );
    }
}

const mapStateToProps = ({ restaurant, auth }) => {
    const { token } = auth;
    const { categoryType } = restaurant;
    return { token, categoryType };
};

export default connect(mapStateToProps, { restaurantSelected })(SearchCategory);
