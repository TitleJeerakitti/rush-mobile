import React from 'react';
import { View, Image, ListView, RefreshControl, } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { QueueCard, CancelConfirm, FontText, LoadingImage, Space } from './common';
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
            refreshing: false,
            data: this.listViewCloneWithRows(),
            loading: true,
            visible: false,
            canLoad: true,
        };
    }

    componentDidMount() {
        this.mounted = true;
        if (this.state.canLoad) {
            this.getQueueAPI();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.canLoad && prevState.canLoad && this.state.canLoad) {
            this.getQueueAPI();
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    onRefresh() {
        this.getQueueAPI();
    }

    onSelectQueue(queue) {
        this.props.getOrderId(queue.order_detail.order_id);
        Actions.receipt();
    }

    async getQueueAPI() {
        try { 
            this.setState({ refreshing: true, canLoad: false });
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
                    loading: false,
                    refreshing: false,
                    canLoad: true,
                });
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
            // console.log(queue)
            return (
                <QueueCard
                    status={queue.order_detail.status} 
                    data={queue.supplier_detail} 
                    amount={queue.order_detail.total} 
                    queue={queue.queue_number} 
                    onCancelPress={() => this.setState({ visible: !this.state.visible })} 
                    onPress={() => this.onSelectQueue(queue)}
                />
            );
        }
        return <View />;
    }

    render() {
        const { containerEmpty, imageEmpty } = styles;
        const { data } = this.state;
        if (this.state.loading) {
            return (
                <LoadingImage />
            );
        } else if (data._cachedRowCount === 0) {
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
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.onRefresh()}
                        />
                    }
                    dataSource={data}
                    renderRow={(item) => this.renderQueue(item)} 
                    renderFooter={() => <Space />}
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
