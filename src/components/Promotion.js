import React from 'react';
import { View, TouchableOpacity, ListView } from 'react-native';
import { connect } from 'react-redux';
import { SlickItem, LoadingImage, FontText, Empty } from './common';
import { SERVER, GET_PROMOTION } from '../../config';

class Promotion extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            loading: true,
            data: [],
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.getPromotion();
    }

    async getPromotion() {
        try {
            const { access_token, token_type } = this.props.token;
            const response = await fetch(`${SERVER}${GET_PROMOTION}`, {
                headers: {
                    Authorization: `${token_type} ${access_token}`,
                },
            });
            const responseData = await response.json();
            if (this._isMounted && response.status === 200) {
                this.setState({ 
                    data: responseData,
                    loading: false,
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

    renderPromotion(item) {
        return (
            <TouchableOpacity
                onPress={() => console.log(item)} 
                activeOpacity={1}
                // style={{ marginTop: 5 }}
            >
                <SlickItem source={{ uri: item.image }} />
            </TouchableOpacity>
        );
    }

    render() {
        if (this.state.loading) {
            return <LoadingImage />;
        } else if (this.state.data.length > 0) {
            return (
                <ListView 
                    dataSource={this.listViewCloneWithRows(this.state.data)}
                    renderRow={(item) => this.renderPromotion(item)}
                />
            );
        }
        return (
            <Empty title='ยังไม่มีโปรโมชั่นตอนนี้' />
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { token } = auth;
    return { token };
};

export default connect(mapStateToProps)(Promotion);
