import React from 'react';
import { ScrollView } from 'react-native';
import { HistoryCard } from './common';

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                id: '00001',
                name: 'กุ้งกั้งอร่อยแซ่บ',
                rating: 3.5,
                reviewCount: 32,
                category: 'อาหารทะเล',
                isOpen: true,
                distance: 3600,
                image: 'https://dcassetcdn.com/design_img/1653128/517402/517402_8732330_1653128_8e6708e4_image.jpg',
                orderId: '12341234', 
                timestamp: '18:00 20-June-2018', 
                status: 5
            },
            data2: {
                id: '00001',
                name: 'กุ้งกั้งอร่อยแซ่บ',
                rating: 3.5,
                reviewCount: 32,
                category: 'อาหารทะเล',
                isOpen: true,
                distance: 3600,
                image: 'https://dcassetcdn.com/design_img/1653128/517402/517402_8732330_1653128_8e6708e4_image.jpg',
                orderId: '12341234', 
                timestamp: '18:00 20-June-2018', 
                status: 4
            }
        };
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <HistoryCard 
                    data={this.state.data}
                />
                <HistoryCard 
                    data={this.state.data2}
                />
            </ScrollView>
        );
    }
}

export default History;
