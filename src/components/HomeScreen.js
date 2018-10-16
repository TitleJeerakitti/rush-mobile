import React from 'react';
import { ScrollView, Dimensions, } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo';
import { 
    Slick, 
    SlickItem, 
    FontText, 
    Card, 
    Button, 
    CardSection,
    CategoryItem,
} from './common';
import { DARK_RED, } from './common/colors';


export default class HomeScreen extends React.Component {
    componentWillMount() {
        const { width } = Dimensions.get('window');

        // Responsive Condition
        if (width > 375) {
            this.setState({ 
                ...this.state, 
                size: 24,
            });
        } else if (width > 320) {
            this.setState({ 
                ...this.state, 
                size: 24,
            });
        } else {
            this.setState({ 
                ...this.state, 
            });
        }
    }

    render() {
        const { size } = this.state;
        return (
            <ScrollView style={{ flex: 1 }}>
                <Card>
                    <Slick>
                        <SlickItem source={require('../images/promotion_mockup.png')} />
                        <SlickItem source={require('../images/promotion_2.png')} />
                        <SlickItem source={require('../images/promotion_3.png')} />
                        <SlickItem source={require('../images/promotion3.png')} />
                    </Slick>
                </Card>
                <Card>
                    <CardSection>
                        <Button color={DARK_RED}>
                            <Icon name='map-marker' type='material-community' color='white' />
                            <FontText color='white' size={size}> ค้นหาร้านอาหารใกล้เคียง</FontText>
                        </Button>
                    </CardSection>
                </Card>
                <Card>
                <LinearGradient 
                    start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 1.0 }}
                    colors={['#FFC050', '#EB8E56']}
                >
                    <ScrollView horizontal>
                        <CategoryItem 
                            source={require('../../assets/thai_food.png')} 
                            title='ไทย'
                        />
                        <CategoryItem 
                            source={require('../../assets/chinese_food.png')} 
                            title='จีน'
                        />
                        <CategoryItem 
                            source={require('../../assets/italian_food.png')} 
                            title='อิตาเลียน'
                        />
                        <CategoryItem 
                            source={require('../../assets/thai_food.png')} 
                            title='ไทย'
                        />
                    </ScrollView>
                </LinearGradient>
                </Card>
                <Card>
                    <CardSection>
                        <FontText>ร้านอาหารแนะนำสำหรับคุณ</FontText>
                    </CardSection>
                    <ScrollView horizontal>
                        <CategoryItem 
                            source={require('../../assets/thai_food.png')}
                            overlayAlpha={0}
                        />
                        <CategoryItem 
                            source={require('../../assets/chinese_food.png')}
                            overlayAlpha={0}
                        />
                        <CategoryItem 
                            source={require('../../assets/italian_food.png')}
                            overlayAlpha={0}
                        />
                        <CategoryItem 
                            source={require('../../assets/thai_food.png')}
                            overlayAlpha={0}
                        />
                    </ScrollView>
                </Card>
            </ScrollView>
        );
    }
}
