import React from 'react';
import { 
    View,
    Text,
    StatusBar,
    TouchableWithoutFeedback,
} from 'react-native';
import { Constants, LinearGradient } from 'expo';
import { Icon } from 'react-native-elements';

class Header extends React.Component {
    render() {
        const { containerStyle, navbarStyle, textStyle } = styles;
        const { title, onRight, onLeft } = this.props;
        return (
            <LinearGradient 
                start={{ x: 0.0, y: 0.5 }} end={{ x: 0.8, y: 0.7 }}
                colors={['#FF220D', '#FF7E2F']}
                style={containerStyle}
            >
                <StatusBar barStyle="light-content" />
                <View style={navbarStyle}>
                    <TouchableWithoutFeedback onPress={onLeft}>
                        <Icon 
                            name='navicon' 
                            type='evilicon' 
                            color='white' 
                            iconStyle={{ paddingHorizontal: '5%' }} 
                        />
                    </TouchableWithoutFeedback>
                    <Text style={textStyle}>{title}</Text>
                    <TouchableWithoutFeedback onPress={onRight}>
                        <Icon 
                            name='search' 
                            type='evilicon' 
                            color='white' 
                            iconStyle={{ paddingHorizontal: '5%' }} 
                        />
                    </TouchableWithoutFeedback>
                </View>
            </LinearGradient>
        );
    }
}

const styles = {
    containerStyle: {
        paddingTop: Constants.statusBarHeight,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: { width: 1, height: 1 }
    },
    navbarStyle: {
        height: 44,
        flexDirection: 'row',
    },
    textStyle: {
        color: 'white',
        fontSize: 18,
        flex: 1,
        textAlign: 'center',
        alignSelf: 'center',
    }
};

export { Header };
