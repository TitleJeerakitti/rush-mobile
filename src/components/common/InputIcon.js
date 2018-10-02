import React from 'react';
import { TextInput, View } from 'react-native';
import { Icon } from 'react-native-elements';

class InputIcon extends React.Component {

    constructor() {
        super();
        this.state = {
            rightIconStyle: styles.clearHide,
        };
    }

    render() {
        const { containerStyle, textStyle, clearHide, clearShow } = styles;
        const { rightIconStyle } = this.state;
        const { placeholder, iconName } = this.props;
        return (
            <View style={containerStyle}>
                <Icon name={iconName} type='evilicon' size={30} />
                <TextInput 
                    style={textStyle}
                    placeholder={placeholder}
                    autoCorrect={false}
                    autoCapitalize='none'
                    onFocus={() =>
                        this.setState({ ...this.state, rightIconStyle: clearShow })
                    }
                    onEndEditing={() => 
                        this.setState({ ...this.state, rightIconStyle: clearHide })
                    }
                    underlineColorAndroid='transparent'
                />
                <Icon name='close-o' type='evilicon' size={20} iconStyle={rightIconStyle} />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        backgroundColor: 'white',
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 16,
        textAlign: 'center',
        flex: 1,
        // paddingRight: 30,
    },
    clearShow: {
        paddingHorizontal: 5,
        color: 'black',
    },
    clearHide: {
        paddingHorizontal: 5,
        color: 'white',
    }
};

export { InputIcon };
