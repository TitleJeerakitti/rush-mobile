import React from 'react';
import { View, ListView, RefreshControl, } from 'react-native';
import { connect } from 'react-redux';
import { HistoryCard, FontText, LoadingImage, Space } from './common';
import { SERVER, GET_HISTORY } from '../../config';

class History extends React.Component {
    // static getDerivedStateFromProps(nextProps, prevState) {
    //     console.log('getDerievd ', nextProps.canLoad, prevState.canLoad);
    //     // if (nextProps.canLoad === prevState.canLoad) {
    //     //     return { canLoad: false };
    //     // }
    //     return null;
    // }

    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            refreshing: false,
            canLoad: true,
            histories: [],
            loading: true,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        if (this.state.canLoad) {
            this.getHistoryAPI();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.canLoad && prevState.canLoad && this.state.canLoad) {
            this.getHistoryAPI();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onRefresh() {
        this.setState({ refreshing: true, });
        this.getHistoryAPI();
    }

    async getHistoryAPI() {
        try {
            await this.setState({ canLoad: false });
            const { access_token, token_type } = this.props.token;
            const response = await fetch(`${SERVER}${GET_HISTORY}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    Authorization: `${token_type} ${access_token}`,
                }
            });
            const responseData = await response.json();
            if (this._isMounted) {
                await this.setState({ 
                    histories: responseData.histories, 
                    canLoad: true,
                    loading: false,
                    refreshing: false,
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

    render() {
        // console.log('render ', this.props.canLoad, this.state.canLoad);
        if (this.state.loading) {
            return <LoadingImage />;
        }
        if (this.state.histories.length > 0) {
            return (
                // <ScrollView style={{ flex: 1 }}>
                //     {this.renderHistoryCard()}
                // </ScrollView>
                <ListView 
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.onRefresh()}
                        />
                    }
                    dataSource={this.listViewCloneWithRows(this.state.histories)}
                    renderRow={(history) => <HistoryCard data={history} />}
                    renderFooter={() => <Space />}
                />
            );
        }
        return (
            <View style={styles.containerEmpty}>
                <FontText size={24}>ไม่มีประวัติการสั่งอาหาร</FontText>
            </View>
        );
    }
}

const styles = {
    containerEmpty: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
};

const mapStateToProps = ({ auth }) => {
    const { token } = auth;
    return { token };
};

export default connect(mapStateToProps)(History);
