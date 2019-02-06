import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { QueueCard, CancelConfirm, FontText } from './common';
import { loadData } from '../actions';

class Queue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            visible: false,
        };
    }

    componentDidMount() {
        this.mount = true;
        fetch('http://localhost:3000/queue_detail', {
            headers: {
                'Cache-Control': 'no-cache',
            }
        })
        .then(response => response.json())
        .then(responseData => {
            if (this.mount) {
                this.setState({ 
                    data: responseData, 
                });
            }
        })
        .catch(error => console.log(error));
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

    renderQueueCard() {
        const { data } = this.state;
        if (data.length > 0) {
            return data.map(queue => {
                if (queue.order_detail.status < 4) {
                    return (
                        <QueueCard
                            key={queue.queue_id} 
                            status={queue.order_detail.status} 
                            data={queue.supplier_detail} 
                            amount={queue.order_detail.total} 
                            queue={queue.queue_number} 
                            onCancelPress={() => this.setState({ visible: !this.state.visible })} 
                            onPress={() => Actions.receipt()}
                        />
                    );
                }
                return <View key={queue.queue_id} />;
            });
        }
    }

    render() {
        const { containerLoading, containerEmpty, imageEmpty } = styles;
        if (this.props.dataLoad) {
            return (
                <View 
                    style={containerLoading}
                >
                    {/* <Text>{this.props.dataLoad}</Text> */}
                    <Image
                        style={{ width: '50%', height: '50%' }}
                        source={require('../images/Tuuf.gif')}
                    />
                </View>
            );
        }
        if (this.state.data.length === 0) {
            return (
                <View style={containerEmpty}>
                    <Image
                        style={imageEmpty}
                        source={require('../images/r-logo.png')}
                    />
                    <FontText size={24}>ยังไม่ได้สั่งอาหารเลยจ้า</FontText>)
                </View>        
            );
        }
        return (
            <ScrollView style={{ flex: 1 }} >
                {this.renderQueueCard()}
                <View style={{ marginTop: 10 }} />
                {this.renderCancelConfirm()}
            </ScrollView>
        );
    }
}

const styles = {
    imageEmpty: {
        height: '30%', 
        resizeMode: 'contain', 
        tintColor: 'gray'
    },
    containerEmpty: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    containerLoading: { 
        flex: 1, 
        backgroundColor: '#F5F5F5', 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
};
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
