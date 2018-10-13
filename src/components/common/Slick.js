import React from 'react';
import { Dimensions, } from 'react-native';
import Swiper from 'react-native-swiper';

const Slick = ({ children }) => {
    const { width } = Dimensions.get('window');
    const imageHeight = Math.round((width * 5) / 9); // 1080 x 600
    return (
                <Swiper 
                    autoplay 
                    showsPagination 
                    dotColor='transparent' 
                    dotStyle={{ borderWidth: 1, borderColor: 'white', }} 
                    activeDotColor='white' 
                    height={imageHeight}
                >
                    {children}
                </Swiper>
    );
};

export { Slick };
