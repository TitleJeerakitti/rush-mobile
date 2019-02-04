import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';

class AuthButton extends React.Component {
    renderFacebook() {
        const { facebook } = this.props;
        if (facebook) {
            return (
                <Icon name='sc-facebook' type='evilicon' color='white' />
            );
        }
    }

    render() {
        const { children, color, onPress, style } = this.props;
        return (
            <TouchableOpacity 
                style={[styles.containerStyle, { backgroundColor: color, ...style }]}
                onPress={onPress}
            >
                {this.renderFacebook()}
                <Text style={styles.textStyle}>{children}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = {
    containerStyle: {
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        marginHorizontal: '12%',
        shadowColor: 'black', 
        shadowOpacity: 0.2, 
        shadowOffset: { width: 1, height: 1 }, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
    }
};

export { AuthButton };
