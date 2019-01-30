import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, ImageRound, FontText, QuantityButton } from '../../common';
import { addMenu, subMenu } from '../../../actions/';

class MenuContainer extends React.Component {

    subtractAmount() {
        const { subIndex, data, index, currentCategory } = this.props;
        if (data.quantity > 0) {
            this.props.subMenu(subIndex, data.id, index, currentCategory);
        }
    }

    additionAmount() {
        const { subIndex, data, index, currentCategory } = this.props;
        this.props.addMenu(subIndex, data.id, index, currentCategory);
    }

    render() {
        const { data } = this.props;
        const { name, price, picture } = data;
        
        return (
            <Card>
                <CardSection>
                    <View style={styles.container} >
                        <ImageRound source={{ uri: picture }} />
                        <View style={{ justifyContent: 'center', flex: 1 }}>
                            <FontText>{name}</FontText>
                            <FontText>{price} บาท</FontText>
                        </View>
                        <QuantityButton 
                            quantity={data.quantity} 
                            onLeft={this.subtractAmount.bind(this)}
                            onRight={this.additionAmount.bind(this)}
                        />
                    </View>
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    container: {
        flex: 1, 
        borderRadius: 20,
        backgroundColor: '#FFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        flexDirection: 'row',
        padding: 10,
    }
};

const MenuCard = connect(null, { addMenu, subMenu })(MenuContainer);
export { MenuCard };
