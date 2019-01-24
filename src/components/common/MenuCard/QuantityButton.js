import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Row } from '../../common';

class QuantityButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0
        };
    }

    additiveAmount() {
        if (this.state.amount > 0) {
            this.setState({ amount: --this.state.amount });
        }
    }

    render() {
        const { container, grayBg, whiteBg, leftRadius, rightRadius, whiteText } = styles;
        return (
            <Row>
                <TouchableOpacity 
                    style={[container, grayBg, leftRadius]}
                    onPress={() => this.additiveAmount()}
                >
                    <Text style={whiteText}>-</Text>
                </TouchableOpacity>
                <View
                    style={[container, whiteBg]}
                >
                    <Text>{this.state.amount}</Text>
                </View>
                <TouchableOpacity 
                    style={[container, grayBg, rightRadius]}
                    onPress={() => this.setState({ amount: ++this.state.amount })}
                >
                    <Text style={whiteText}>+</Text>
                </TouchableOpacity>
            </Row>
        );
    }
}

const styles = {
    container: {
        width: 30, 
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    grayBg: {
        backgroundColor: '#AAA', 
    },
    whiteBg: {
        backgroundColor: '#FFF',
    },
    whiteText: {
        color: '#FFF',
        fontSize: 20,
    },
    leftRadius: {
        borderTopLeftRadius: 5, 
        borderBottomLeftRadius: 5,
    },
    rightRadius: {
        borderTopRightRadius: 5, 
        borderBottomRightRadius: 5,
    }
};

export { QuantityButton };
