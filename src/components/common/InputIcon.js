import React from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

class InputIcon extends React.Component {

    componentWillMount() {
        const { password } = this.props;
        const { textStyle, showStyle, } = styles;

        this.setState({ rightIconStyle: showStyle, textStyle });

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
        const { containerStyle } = styles;
        const { textStyle } = this.state;
        const { 
            placeholder,
            iconName, 
            secureTextEntry,
            onChangeText,
            value,
        } = this.props;
        
        return (
            <View style={containerStyle}>
                <Icon name={iconName} type='evilicon' size={30} />
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
}

const styles = {
    containerStyle: {
        backgroundColor: 'white',
        paddingHorizontal: 5,
        flexDirection: 'row',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '12%',
        marginTop: 20,
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
};

export { InputIcon };
