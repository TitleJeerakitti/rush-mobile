import React from 'react';
import { View, } from 'react-native';
import { Card, CardSection, FontText, MenuCard } from '../../common';
import { Space } from '../Space';

class MenuContainerList extends React.Component {

    renderMenuItem(menus, subIndex) {
        return menus.map((menu, index) => 
            <MenuCard 
                key={menu.id} 
                data={menu}
                subIndex={subIndex}
                index={index}
                currentCategory={this.props.currentCategory}
            />
        );
    }

    renderSubCategory() {
        const { data, currentCategory } = this.props;

        if (data.main_categories !== undefined) {
            const subCategories = data.main_categories[currentCategory].sub_categories;
            return subCategories.map((subCategory, index) => {
                if (subCategory.menus.length > 0) {
                    return (
                        <CardSection key={index}>
                            <FontText >{subCategory.name}</FontText>
                            { this.renderMenuItem(subCategory.menus, index) }
                        </CardSection>
                    );
                }
            });
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: '#FAFAFA', }}>
                <Card>
                    {this.renderSubCategory()}
                </Card>
                <Space />
            </View>
        );
    }
}

const MenuList = MenuContainerList;
export { MenuList };
