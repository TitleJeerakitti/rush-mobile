import React from 'react';
import { TextInput, View } from 'react-native';
import { Icon } from 'react-native-elements';

const InputIcon = () => {
    const { containerStyle, textStyle } = styles;

    return (
        <View style={containerStyle}>
            <Icon name='user-circle' type='font-awesome' size={30} />
            <TextInput 
                style={textStyle}
                placeholder='test'
                autoCorrect={false}
                autoCapitalize='none'
            />
        </View>
    );
};

const styles = {
    containerStyle: {
        backgroundColor: 'white',
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 16,
        textAlign: 'center',
        flex: 1
    }
};

export { InputIcon };
