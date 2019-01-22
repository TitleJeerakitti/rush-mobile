import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, Row, MainCategoryItem } from '../../common';

class MainCategoryCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            categorys: [],
            currentIndex: 0,
        };
    }

    componentWillMount() {
        this.getRestaurantAPI();

        
        // this.setState({
        //     currentId: categorys[0]
        // })
    }

    getRestaurantAPI() {
        fetch(`http://localhost:3000/main_category?supplier_id=${this.props.restaurantId}`, {
            headers: {
                'Cache-Control': 'no-cache'
            }
        })
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    categorys: responseData,
                    refreshing: false
                });
            })
            .catch(() => {
                console.log('error connect!');
            });
    }

    renderItem() {
        return this.state.categorys.map((category, index) => 
            <MainCategoryItem 
                key={index}
                onPress={() => this.setState({ currentIndex: index })}
                selected={index === this.state.currentIndex}
            >
                {category.name}
            </MainCategoryItem>
        );
    }

    render() {
        return (
            <Card>
                <Row>
                    {this.renderItem()}
                </Row>
            </Card>
        );
    }
}

const mapStateToProps = ({ restaurant }) => {
    const { restaurantId } = restaurant;
    return { restaurantId };
};

const MainCategory = connect(mapStateToProps)(MainCategoryCard);
export { MainCategory };
