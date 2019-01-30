import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Row } from '../../common';
import { addMenu, subMenu } from '../../../actions';

class QuantityMenu extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         amount: 0
    //     };
    // }

    subtractAmount() {
        if (this.props.qty > 0) {
            // console.log(this.props.id);
            this.props.subMenu(this.props.subIndex, this.props.id, this.props.index, this.props.currentCategory);
        }
    }

    additionAmount() {
        this.props.addMenu(this.props.subIndex, this.props.id, this.props.index, this.props.currentCategory);
    }

    render() {
        const { qty } = this.props;
        const { container, grayBg, whiteBg, redBg, leftRadius, rightRadius, whiteText } = styles;
        return (
            <Row>
                <TouchableOpacity 
                    style={[container, qty === 0 ? grayBg : redBg, leftRadius]}
                    onPress={this.subtractAmount.bind(this)}
                >
                    <Text style={whiteText}>-</Text>
                </TouchableOpacity>
                <View
                    style={[container, whiteBg]}
                >
                    <Text>{qty}</Text>
                </View>
                <TouchableOpacity 
                    style={[container, qty === 0 ? grayBg : redBg, rightRadius]}
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
