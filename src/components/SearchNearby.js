import React from 'react';
import { ScrollView, } from 'react-native';
import { Space } from './common';
import RestaurantCard from './RestaurantCard';

class SearchNearby extends React.Component {

    render() {
        const { container } = styles;
        const isOpen = true;
        return (
            <ScrollView style={container} >
                <RestaurantCard 
                    name='กุ้งกั้งอร่อยแซ่บแสบดาก'
                    startingValue={2.5}
                    reviewNumber={32}
                    category='อาหารอีสาน'
                    isOpen={isOpen} 
                    distance='3.6 KM'
                    source={{ uri: 'https://f.ptcdn.info/395/033/000/1436851513-1032261695-o.jpg' }}
                />
                <RestaurantCard 
                    name='กุ้งกั้งอร่อยหรอ'
                    startingValue={5}
                    reviewNumber={108}
                    category='อาหารสวรรค์'
                    isOpen={false} 
                    distance='1000 KM'
                    source={{ uri: 'https://f.ptcdn.info/395/033/000/1436851513-1032261695-o.jpg' }}
                />
                <RestaurantCard 
                    name='กุ้งกั้งอร่อยแซ่บแสบดาก'
                    startingValue={4.5}
                    reviewNumber={32}
                    category='อาหารอีสาน'
                    isOpen={isOpen} 
                    distance='3.6 KM'
                    source={{ uri: 'https://f.ptcdn.info/395/033/000/1436851513-1032261695-o.jpg' }}
                />
                <RestaurantCard 
                    name='กุ้งกั้งอร่อยแซ่บแสบดาก'
                    startingValue={4.5}
                    reviewNumber={32}
                    category='อาหารอีสาน'
                    isOpen={isOpen} 
                    distance='3.6 KM'
                    source={{ uri: 'https://f.ptcdn.info/395/033/000/1436851513-1032261695-o.jpg' }}
                />
                <RestaurantCard 
                    name='กุ้งกั้งอร่อยแซ่บแสบดาก'
                    startingValue={4.5}
                    reviewNumber={32}
                    category='อาหารอีสาน'
                    isOpen={isOpen} 
                    distance='3.6 KM'
                    source={{ uri: 'https://f.ptcdn.info/395/033/000/1436851513-1032261695-o.jpg' }}
                />
                <RestaurantCard 
                    name='กุ้งกั้งอร่อยแซ่บแสบดาก'
                    startingValue={4.5}
                    reviewNumber={32}
                    category='อาหารอีสาน'
                    isOpen={isOpen} 
                    distance='3.6 KM'
                    source={{ uri: 'https://f.ptcdn.info/395/033/000/1436851513-1032261695-o.jpg' }}
                />
                <Space />
            </ScrollView>
        );
    }
}

const styles = {
    container: {
        flex: 1,
    },
};

export default SearchNearby;
