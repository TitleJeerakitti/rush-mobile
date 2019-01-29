import React from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-elements';
// import { connect } from 'react-redux';
import { Card, CardSection, FontText, MenuCard } from '../../common';

class MenuContainerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subCategorys: [],
        };
    }

    // componentWillMount() {
    //     console.log(this.props.data);
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     // console.log(nextProps)
    //     if (JSON.stringify(this.state.subCategorys) !== JSON.stringify(nextState.subCategorys)) {
    //         return true;
    //     } else if (this.props.restaurantId !== nextProps.restaurantId) {
    //         return true;
    //     } else if (this.props.currentCategory !== nextProps.currentCategory) {
    //         return true;
    //     }
    //     return false;
    // }

    renderMenuItem(menus) {
        return menus.map(menu => 
            <MenuCard 
                key={menu.id} 
                id={menu.id}
                name={menu.name} 
                price={menu.price} 
                picture={menu.picture} 
            />
        );
    }

    renderSubCategory() {
        const { data, currentCategory } = this.props;

        if (data.main_categories !== undefined) {
            const subCategories = data.main_categories[currentCategory].sub_categories;
            return subCategories.map((subCategory, index) => 
                <CardSection key={index}>
                    <FontText >{subCategory.name}</FontText>
                    { this.renderMenuItem(subCategory.menus) }
                    <Divider style={{ height: 10, backgroundColor: 'transparent' }} />
                </CardSection>
            );
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: '#FAFAFA', }}>
                <Card>
                    {this.renderSubCategory()}
                </Card>
            </View>
        );
    }
}

const MenuList = MenuContainerList;
export { MenuList };
