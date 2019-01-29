import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Row } from '../../common';
import { addMenu, subMenu } from '../../../actions';

class QuantityMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0
        };
    }

    componentWillMount() {
        for (const [index, menu] of this.props.menus.entries()) {
            if (menu.id === this.props.id) {
                this.setState({ amount: menu.qty });
            }
        }
    }

    subtractAmount() {
        if (this.state.amount > 0) {
            this.setState({ amount: --this.state.amount });
            this.props.subMenu(this.props.id, this.state.amount);
        }
    }

    additionAmount() {
        this.setState({ amount: ++this.state.amount });
        this.props.addMenu(this.props.id, this.state.amount);
    }

    render() {
        // console.log(this.state.amount);
        const { container, grayBg, whiteBg, redBg, leftRadius, rightRadius, whiteText } = styles;
        return (
            <Row>
                <TouchableOpacity 
                    style={[container, this.state.amount === 0 ? grayBg : redBg, leftRadius]}
                    onPress={this.subtractAmount.bind(this)}
                >
                    <Text style={whiteText}>-</Text>
                </TouchableOpacity>
                <View
                    style={[container, whiteBg]}
                >
                    <Text>{this.state.amount}</Text>
                </View>
                <TouchableOpacity 
                    style={[container, this.state.amount === 0 ? grayBg : redBg, rightRadius]}
                    onPress={this.additionAmount.bind(this)}
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
    redBg: {
        backgroundColor: '#FF6000',
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

const mapStateToProps = ({ restaurant }) => {
    // console.log('render')
    const { menus } = restaurant;
    return { menus };
};

const QuantityButton = connect(mapStateToProps, { addMenu, subMenu })(QuantityMenu);
export { QuantityButton };
