import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { Card, CardSection, ImageRound, FontText, QuantityButton } from '../../common';

class MenuCard extends React.Component {

    componentWillMount() {
        const { width } = Dimensions.get('window');
        this.setState({ width });
    }

    render() {
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
                        <ImageRound source={{ uri: 'https://is1-ssl.mzstatic.com/image/thumb/Purple71/v4/47/cf/cf/47cfcf79-9e1d-b21f-8e10-2658b7650c15/mzl.oiljceng.png/246x0w.jpg' }} />
                        <View style={{ justifyContent: 'center', flex: 1 }}>
                            <FontText>EIEI</FontText>
                            <FontText>120 บาท</FontText>
                        </View>
                        <QuantityButton />
                    </View>
                </CardSection>
            </Card>
        );
    }
}

export { MenuCard };
