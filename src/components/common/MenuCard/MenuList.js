import React from 'react';
import { View, ListView } from 'react-native';
import { Divider } from 'react-native-elements';
import { Card, CardSection, FontText, MenuCard } from '../../common';

class MenuContainerList extends React.Component {
    // constructor(props) {
    //     super(props);
    //     const { data, currentCategory } = this.props;
    //     this.state = {
    //         data: data.main_categories[currentCategory].sub_categories,
    //     };
    // }

    // listViewCloneWithRows(data = []) {
    //     const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    //     return ds.cloneWithRows(data);
    // }

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

    // renderSubCategoryList(item, index) {
    //     return (
    //         <CardSection>
    //             <FontText >{item.name}</FontText>
    //             { this.renderMenuItem(item.menus, index) }
    //         </CardSection>
    //     );
    // }

    render() {
        return (
            <View style={{ backgroundColor: '#FAFAFA', }}>
                <Card>
                    {this.renderSubCategory()}
                </Card>
            </View>
            // <ListView 
            //     dataSource={this.listViewCloneWithRows(this.state.data)}
            //     renderRow={(item, index) => this.renderSubCategoryList(item, index)}
            // />
        );
    }
}

const MenuList = MenuContainerList;
export { MenuList };
