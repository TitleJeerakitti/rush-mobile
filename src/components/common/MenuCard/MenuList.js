import React from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-elements';
import { Card, CardSection, FontText, MenuCard } from '../../common';

class MenuContainerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subCategorys: [],
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (JSON.stringify(this.state.subCategorys) !== JSON.stringify(nextState.subCategorys)) {
            return true;
        } else if (this.props.restaurantId !== nextProps.restaurantId) {
            return true;
        } else if (this.props.currentCategory !== nextProps.currentCategory) {
            return true;
        }
        return false;
    }

    getSubCategory() {
        fetch(`http://localhost:3000/sub_category?supplier_id=${this.props.restaurantId}&main_category_id=${this.props.currentCategory}`, {
            headers: {
                'Cache-Control': 'no-cache'
            } 
        })
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    subCategorys: responseData,
                });
            })
            .catch(() => console.log('error'));
    }

    renderMenuItem(menus) {
        return menus.map((menu, index) => 
            <MenuCard 
                key={index} 
                name={menu.name} 
                price={menu.price} 
                picture={menu.picture} 
            />
        );
    }

    renderSubCategory() {
        return this.state.subCategorys.map((subCategory, index) => 
            <CardSection key={index}>
                <FontText >{subCategory.name}</FontText>
                { this.renderMenuItem(subCategory.menu) }
                <Divider style={{ height: 10, backgroundColor: 'transparent' }} />
            </CardSection>
        );
    }

    render() {
        this.getSubCategory();
        // console.log(this.props.restaurantId, ' compare ', this.props.currentCategory);
        return (
            <View style={{ backgroundColor: '#FAFAFA', }}>
                <Card>
                    {/* <CardSection>
                        <FontText >test</FontText>
                    </CardSection> */}
                    {this.renderSubCategory()}
                    {/* <MenuCard /> */}
                </Card>
            </View>
        );
    }
}

const MenuList = MenuContainerList;
export { MenuList };
