import React from 'react';
import { View, Text } from 'react-native';
import Slick from 'react-native-slick';

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Slick style={styles.wrapper} showsButtons>
                    <View style={styles.slide1}>
                        <Text style={styles.text}>Hello Slick</Text>
                    </View>
                    <View style={styles.slide2}>
                        <Text style={styles.text}>Beautiful</Text>
                    </View>
                    <View style={styles.slide3}>
                        <Text style={styles.text}>And simple</Text>
                    </View>
                </Slick>
                <Text style={{ flex: 1 }}>Section</Text>
            </View>
        );
    }
}

const styles = {
    wrapper: {
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB',
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5',
    },
    slide3: {
      flex: 1,
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
