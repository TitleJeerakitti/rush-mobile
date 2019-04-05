import React from 'react';
import { RefreshControl, View, ListView, } from 'react-native';
import { connect } from 'react-redux';
import RestaurantCard from './RestaurantCard';
import { FilterCard, FilterItem, FilterButton, FontText, LoadingImage } from './common';
import { SERVER, SEARCH_NEARBY } from '../../config';

class SearchNearby extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            restaurants: this.listViewCloneWithRows(),
            refreshing: false,
            filters: [
                { type: 'ระยะทาง' }, 
                { type: 'ความนิยม' }, 
                { type: 'ตัวอักษร' }
            ],
            sortType: 'ระยะทาง',
            visible: false,
        };
    }

    componentDidMount() {
        this.mounted = true;
        this.getRestaurantAPI();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    onRefresh = () => {
        this.getRestaurantAPI();
    }

    async getRestaurantAPI() {
        await this.setState({ refreshing: true });
        try {
            const { token_type, access_token } = this.props.token;
            const response = await fetch(this.selectAPI(), {
                headers: {
                    'Cache-Control': 'no-cache',
                    Authorization: `${token_type} ${access_token}`,
                }
            });
            const responseData = await response.json();
            if (this.mounted) {
                await this.setState({
                    restaurants: this.listViewCloneWithRows(responseData),
                    isLoaded: true,
                    refreshing: false
                });
                // console.log(this.state.restaurants);
            }
        } catch (error) {
            console.log(error);
            await this.setState({ refreshing: false });
        }
    }

    listViewCloneWithRows(data = []) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return ds.cloneWithRows(data);
    }

    selectAPI() {
        if (this.state.sortType === 'ระยะทาง') { 
            // return ('http://localhost:3000/restaurants?_sort=distance&_order=asc');
            return (`${SERVER}${SEARCH_NEARBY}`);
        } else if (this.state.sortType === 'ความนิยม') {
            return ('http://localhost:3000/restaurants?_sort=rating&_order=desc');
        }
        // return ('http://localhost:3000/restaurants?_sort=name&_order=asc');
        return ('http://10.66.10.222:8000/testing/restaurant');
    }

    refreshControl() {
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
            />
        );
    }

    renderItem() {
        return this.state.filters.map((filter, index) =>
            <FilterItem 
                key={index}
                onPress={() => {
                    this.setState({ sortType: filter.type, visible: false }, () => {
                        this.onRefresh();
                    });
                }}
            >
                {filter.type}
            </FilterItem>
        );
    }

    renderHeader() {
        return (
            <FilterButton onPress={() => this.setState({ visible: true })} >
                {this.state.sortType}
            </FilterButton>
        );
    }

    renderFilter() {
        return (
            <FilterCard visible={this.state.visible}>
                {this.renderItem()}
            </FilterCard>
        );
    }

    render() {
        const { container, containerNone } = styles;
        const { isLoaded, restaurants, } = this.state;
        if (!isLoaded) {
            return <LoadingImage />;
        } else if (restaurants._cachedRowCount > 0) {
            return (
                <View style={container} >
                    <ListView 
                        style={container}
                        dataSource={restaurants}
                        stickyHeaderIndices={[0]}
                        renderRow={(item) => <RestaurantCard data={item} />}
                        renderHeader={() => this.renderHeader()}
                        refreshControl={this.refreshControl()}
                    />
                    {this.renderFilter()}
                </View>
            );
        }
        return (
            <View style={containerNone}>
                <FontText>ไม่มีร้านอาหารบริเวณใกล้เคียง</FontText>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
    },
    containerNone: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    space: {
        height: 10,
        backgroundColor: 'transparent',
    }
};

const mapStateToProps = ({ auth }) => {
    const { token } = auth;
    return { token }; 
};

export default connect(mapStateToProps)(SearchNearby);
