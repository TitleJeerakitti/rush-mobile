import React from 'react';
import { View, ScrollView, Text, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

export default class HomeScreen extends React.Component {
    render() {
        const { width } = Dimensions.get('window');
        const imageHeight = Math.round((width * 5) / 9); // 1080 x 600
        return (
            <ScrollView style={{ flex: 1 }}>
                <Swiper 
                    style={styles.wrapper} 
                    autoplay 
                    showsPagination 
                    dotColor='transparent' 
                    dotStyle={{ borderWidth: 1, borderColor: 'white', }} 
                    activeDotColor='white' 
                    height={imageHeight}
                >
                    <View style={styles.slide1}>
                        <Image 
                            resizeMode={'cover'}
                            style={{ width: '100%', height: imageHeight }} 
                            source={require('../images/promotion_mockup.png')} 
                        />
                    </View>
                    <View style={styles.slide2}>
                        <Image 
                            resizeMode={'cover'}
                            style={{ width: '100%', height: imageHeight }} 
                            source={require('../images/promotion_2.png')} 
                        />
                    </View>
                    <View style={styles.slide3}>
                        <Image 
                            resizeMode={'cover'}
                            style={{ width: '100%', height: imageHeight }} 
                            source={require('../images/promotion_3.png')} 
                        />
                    </View>
                </Swiper>
                <Text style={{ flex: 1 }}>Section</Text>
            </ScrollView>
        );
    }
}

const styles = {
    wrapper: {
    },
    slide1: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
};
