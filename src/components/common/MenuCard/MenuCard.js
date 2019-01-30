import React from 'react';
import { View, Dimensions } from 'react-native';
import { Card, CardSection, ImageRound, FontText, QuantityButton } from '../../common';

class MenuCard extends React.Component {

    componentWillMount() {
        const { width } = Dimensions.get('window');
        this.setState({ width });
    }

    render() {
        const { name, price, picture, id, qty, subIndex, index } = this.props;
        return (
            <Card>
                <CardSection>
                    <View 
                        style={{ 
                            flex: 1, 
                            // height: 20, 
                            borderRadius: 20,
                            backgroundColor: '#FFF',
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.1,
                            shadowRadius: 10,
                            flexDirection: 'row',
                            padding: 10,
                        }} 
                    >
                        <ImageRound source={{ uri: picture }} />
                        <View style={{ justifyContent: 'center', flex: 1 }}>
                            <FontText>{name}</FontText>
                            <FontText>{price} บาท</FontText>
                        </View>
                        <QuantityButton id={id} qty={qty} name={name} subIndex={subIndex} index={index} currentCategory={this.props.currentCategory} />
                    </View>
                </CardSection>
            </Card>
        );
    }
}

export { MenuCard };
