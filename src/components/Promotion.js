import React from 'react';
import { ListView, } from 'react-native';
import { connect } from 'react-redux';
import { LoadingImage, Empty, Space } from './common';
import { SERVER, GET_PROMOTION, } from '../../config';
import PromotionCard from './advance_component/PromotionCard';

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

    render() {
        if (this.state.loading) {
            return <LoadingImage />;
        } else if (this.state.data.length > 0) {
            return (
                <ListView 
                    dataSource={this.listViewCloneWithRows(this.state.data)}
                    renderRow={(item) => <PromotionCard item={item} />}
                    renderFooter={() => <Space />}
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
