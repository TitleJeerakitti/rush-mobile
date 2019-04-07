import React from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { HistoryCard, FontText, LoadingImage } from './common';
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
        this.state = {
            canLoad: true,
            histories: [],
        };
    }

    componentDidMount() {
        if (this.state.canLoad) {
            this.getHistoryAPI();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.canLoad && prevState.canLoad && this.state.canLoad) {
            this.getHistoryAPI();
        }
    }

    async getHistoryAPI() {
        await this.setState({ canLoad: false });
        try {
            const { access_token, token_type } = this.props.token;
            const response = await fetch(`${SERVER}${GET_HISTORY}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    Authorization: `${token_type} ${access_token}`,
                }
            });
            const responseData = await response.json();
            await this.setState({ histories: responseData.histories, canLoad: true });
            // console.log('finish get api');
        } catch (error) {
            console.log(error);
        }
    }

    renderHistoryCard() {
        return this.state.histories.map((history, index) => 
            <HistoryCard 
                key={index}
                data={history}
            />
        );
    }

    render() {
        // console.log('render ', this.props.canLoad, this.state.canLoad);
        if (!this.state.canLoad) {
            return <LoadingImage />;
        }
        if (this.state.histories.length > 0) {
            return (
                <ScrollView style={{ flex: 1 }}>
                    {this.renderHistoryCard()}
                </ScrollView>
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
