import React from 'react';
import { TextInput, View, TouchableOpacity, Text, } from 'react-native';
import { Icon } from 'react-native-elements';

class InputIcon extends React.Component {

    componentWillMount() {
        const { password, addStyle } = this.props;
        const { textStyle, showStyle, containerStyle } = styles;

        if (!addStyle) {
            this.setState({ 
                rightIconStyle: showStyle, 
                textStyle, 
                containerStyle: { ...containerStyle, marginHorizontal: 30, } });
        } else {
            this.setState({ 
                rightIconStyle: showStyle, 
                textStyle, 
                containerStyle: { ...containerStyle, ...addStyle, } });
        }

        if (!password) {
            this.setState({ ...this.state, textStyle: [textStyle, { paddingRight: 30 }] });
        }
    }

    renderShowPassword() {
        const { rightIconStyle } = this.state;
        const { password, onPress, secureTextEntry } = this.props;

        if (password && secureTextEntry) {
            return (
                <TouchableOpacity onPress={onPress}>
                    <Icon name='eye' type='entypo' size={20} iconStyle={rightIconStyle} />
                </TouchableOpacity>
            );
        } else if (password) {
            return (
                <TouchableOpacity onPress={onPress}>
                    <Icon name='eye-with-line' type='entypo' size={20} iconStyle={rightIconStyle} />
                </TouchableOpacity>
            );
        }
    }

    render() {
        const { textStyle, containerStyle } = this.state;
        const { 
            placeholder,
            iconName, 
            secureTextEntry,
            onChangeText,
            value,
            type,
            children,
            onPress,
        } = this.props;
        
        if (!children) {
            return (
                <View style={{ ...containerStyle, }}>
                    <Icon name={iconName} type={type} size={30} />
                    <TextInput 
                        value={value}
                        onChangeText={onChangeText}
                        style={textStyle}
                        placeholder={placeholder}
                        secureTextEntry={secureTextEntry}
                        autoCorrect={false}
                        autoCapitalize='none'
                        underlineColorAndroid='transparent'
                    />
                    {this.renderShowPassword()}
                </View>
            );
        }
        return (
            <TouchableOpacity 
                onPress={onPress} 
                style={styles.buttonStyle}
            >
                <Text style={styles.buttonText}>
                    {children}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = {
    containerStyle: {
        backgroundColor: 'white',
        paddingHorizontal: 5,
        flexDirection: 'row',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        shadowColor: 'black', 
        shadowOpacity: 0.2, 
        shadowOffset: { width: 1, height: 1 }, 
    },
    buttonStyle: {
        backgroundColor: 'white',
        marginHorizontal: 30,
        padding: 10,
        borderRadius: 25,
        flexDirection: 'row',
        marginTop: 20,
        shadowColor: 'black', 
        shadowOpacity: 0.2, 
        shadowOffset: { width: 1, height: 1 },  
    },
    textStyle: {
        textAlign: 'center',
        flex: 1,
        paddingVertical: 10,
    },
    showStyle: {
        paddingHorizontal: 5,
        color: 'black',
    },
    buttonText: {
        flex: 1, 
        textAlign: 'center', 
        color: '#333',
    }
};

export { InputIcon };
