import React from 'react';
import { View, Image, ScrollView, ListView, Text } from 'react-native';
import { connect } from 'react-redux';
// import { Actions } from 'react-native-router-flux';
import { QueueCard, CancelConfirm, FontText, LoadingImage } from './common';
import { 
    loadData, 
    loadDataFinish,
    getOrderId,
} from '../actions';
import { SERVER, GET_QUEUE } from '../../config';

class Queue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.listViewCloneWithRows(),
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
            const { access_token, token_type, } = this.props.token;
            const response = await fetch(`${SERVER}${GET_QUEUE}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    Authorization: `${token_type} ${access_token}`,
                },
            });
            const responseData = await response.json();
            if (this.mounted) {
                await this.setState({ 
                    data: this.listViewCloneWithRows(responseData), 
                });
                this.props.loadDataFinish();
                this.setState({ canLoad: true });
            }
        } catch (error) {
            console.log(error);
        }
    }

    listViewCloneWithRows(data = []) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return ds.cloneWithRows(data);
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

    renderQueue(queue) {
        if (queue.order_detail.status < 4) {
            return (
                <QueueCard
                    status={queue.order_detail.status} 
                    data={queue.supplier_detail} 
                    amount={queue.order_detail.total} 
                    queue={queue.queue_number} 
                    onCancelPress={() => this.setState({ visible: !this.state.visible })} 
                    onPress={() => this.props.getOrderId(queue.order_detail.order_id)}
                />
            );
        }
        return <View />;
    }

    render() {
        const { containerEmpty, imageEmpty } = styles;
        const { data } = this.state;
        if (!this.props.dataLoaded) {
            return (
                <LoadingImage />
            );
        }
        if (data._chachedRowCount === 0) {
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
            <View style={{ flex: 1 }} >
                <ListView 
                    style={{ flex: 1 }}
                    dataSource={data}
                    renderRow={(item) => this.renderQueue(item)} 
                />
                {this.renderCancelConfirm()}
            </View>
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
