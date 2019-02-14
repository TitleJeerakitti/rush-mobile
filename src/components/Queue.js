import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
// import { Actions } from 'react-native-router-flux';
import { QueueCard, CancelConfirm, FontText, LoadingImage } from './common';
import { 
    loadData, 
    loadDataFinish,
    getOrderId,
} from '../actions';
import { SERVER } from './common/config';

class Queue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            visible: false,
            canLoad: true
        };
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillReceiveProps(nextProps) {
        if (((nextProps.dataLoaded !== this.props.dataLoaded) && this.state.canLoad) 
            || nextProps.canLoad) {
            this.setState({ canLoad: false });
            this.getQueueAPI();
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    async getQueueAPI() {
        try { 
            const response = await fetch(`${SERVER}/order/get_queue/?customer_id=${this.props.userInfo.id}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    Authorization: `Token ${this.props.token}`,
                },
            });
            const responseData = await response.json();
            if (this.mounted) {
                await this.setState({ 
                    data: responseData, 
                });
                this.props.loadDataFinish();
                this.setState({ canLoad: true });
            }
        } catch (error) {
            console.log(error);
        }
    }

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
                            onPress={() => this.props.getOrderId(queue.order_detail.order_id)}
                        />
                    );
                }
                return <View key={queue.queue_id} />;
            });
        }
    }

    render() {
        const { containerEmpty, imageEmpty } = styles;
        if (!this.props.dataLoaded) {
            return (
                <LoadingImage />
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
    }
};

const mapStateToProps = ({ global, auth }) => {
    const { dataLoaded } = global;
    const { userInfo, token } = auth;
    return { dataLoaded, userInfo, token };
};

export default connect(mapStateToProps, { 
    loadData, 
    loadDataFinish,
    getOrderId,
})(Queue);
