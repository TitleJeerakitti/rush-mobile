import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';
import { Marker } from 'react-native-maps';
import { Spinner } from './common';

export default class Maps extends Component {
    state = {
        errorMessage: null,
        region: null,
    };

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage:
                    'Oops, this will not work on Sketch in ' +
                    'an Android emulator. Try it on your device!',
            });
        } else {
            this.getLocationAsync();
        }
    }

    getLocationAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        const location = await Location.getCurrentPositionAsync({});
        console.log(location);
        this.setState({
            ...this.state,
            region: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.018,
                longitudeDelta: 0.008,
            }
        });
        console.log(this.state);
    };

    renderMap() {
        if (this.state.region) {
            return (
                <MapView 
                    style={{ flex: 1 }}
                    provider='google'
                    region={this.state.region}
                    showsUserLocation
                    showsMyLocationButton
                >
                    <Marker
                        coordinate={{
                            latitude: 13.72784116,
                            longitude: 100.77059532,
                        }}
                        title='esus name'
                        description='arai wa'
                        image={require('../images/maps-and-flags.png')}
                    />
                </MapView>
            );
        } if (this.state.errorMessage) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>{this.state.errorMessage}</Text>
                </View>
            );
        }
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Spinner />
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderMap()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
