import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Divider } from 'react-native-elements';
import { QueueCard, CancelConfirm } from './common';
import { loadData } from '../actions';

class Queue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                isOpen: true,
                name: 'Starbuck',
                image: 'https://upload.wikimedia.org/wikipedia/el/thumb/e/e3/Starbucks_logo.svg/480px-Starbucks_logo.svg.png',
                rating: 4.7,
                reviewCount: 127,
                category: 'Cafe',
                distance: 800
            },
            visible: false,
        };
    }
    // componentDidMount() {
    //     setTimeout(() => {
    //         this.props.loadData();
    //     }, 3000);
    // }

    renderCancelConfirm() {
        return (
            <CancelConfirm 
                visible={this.state.visible}
                onConfirm={() => console.log('cancel')}
                onCancel={() => this.setState({ visible: !this.state.visible })}
            />
        );
    }

    render() {
        if (this.props.dataLoad) {
            return (
                <View 
                    style={{ 
                        flex: 1, 
                        backgroundColor: '#F5F5F5', 
                        justifyContent: 'center', 
                        alignItems: 'center' 
                    }}
                >
                    {/* <Text>{this.props.dataLoad}</Text> */}
                    <Image
                        style={{ width: '50%', height: '50%' }}
                        source={require('../images/Tuuf.gif')}
                    />
                </View>
            );
        }
        return (
            <ScrollView>
                <QueueCard status={1} data={this.state.data} amount={240} queue={'A 0001'} onCancelPress={() => this.setState({ visible: !this.state.visible })} />
                <QueueCard status={2} data={this.state.data} amount={240} queue={'A 0001'} />
                <QueueCard status={3} data={this.state.data} amount={240} queue={'A 0001'} />
                <Divider style={{ height: 10 }} />
                {this.renderCancelConfirm()}
            </ScrollView>
        );
    }
}

// const styles = {
//     card: {
//         backgroundColor: '#fefefe',
//         padding: 10,
//         borderRadius: 15,
//         shadowOpacity: 0.1,
//         shadowColor: 'black',
//         shadowOffset: { width: 10, height: 5 },
//     }
// };

const mapStateToProps = ({ global }) => {
    const { dataLoad } = global;
    return { dataLoad };
};

export default connect(mapStateToProps, { loadData })(Queue);
