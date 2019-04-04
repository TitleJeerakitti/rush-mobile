import React from 'react';
import { ScrollView, Dimensions, ListView, } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { 
    Slick, 
    SlickItem, 
    FontText, 
    Card, 
    Button, 
    CardSection,
    CategoryItem,
    LoadingImage,
} from './common';
import { DARK_RED, SERVER, HOME, } from './common/config';


class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        const { width } = Dimensions.get('window');
        this.state = {
            isLoaded: false,
            size: width > 320 ? 24 : 20,
            bannerList: [],
            categoryList: this.listViewCloneWithRows(),
            suggestList: this.listViewCloneWithRows(),
        };
        this.mounted = true;
    }

    async componentDidMount() {
        try {
            const { access_token, token_type, } = this.props.token;
            const response = await fetch(`${SERVER}${HOME}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    Authorization: `${token_type} ${access_token}`,
                }
            });
            const responseData = await response.json();
            if (this.mounted) {
                await this.setState({
                    bannerList: responseData.slide_banner,
                    categoryList: this.listViewCloneWithRows(responseData.category),
                    suggestList: this.listViewCloneWithRows(responseData.suggest_list),
                    isLoaded: true,
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

    renderSlick() {
        const { bannerList } = this.state;
        return (
            <Slick>
                { 
                    bannerList.map(item => 
                    <SlickItem key={item.id} source={{ uri: item.image }} />)
                }
            </Slick>
        );
    }

    renderCategory(item) {
        return <CategoryItem source={{ uri: item.image }} title={item.name} />;
    }

    renderSuggest(item) {
        return <CategoryItem source={{ uri: item.image }} overlayAlpha={0} />;
    }

    render() {
        const { size, isLoaded, categoryList, suggestList } = this.state;
        if (isLoaded) {
            return (
                <ScrollView style={{ flex: 1 }}>
                    {this.renderSlick()}
                    <Button color={DARK_RED} onPress={() => Actions.search_nearby()}>
                        <Icon name='map-marker' type='material-community' color='white' />
                        <FontText color='white' size={size} style={{ paddingLeft: 5 }}>
                            ค้นหาร้านอาหารบริเวณใกล้เคียง
                        </FontText>
                    </Button>
                    <Card>
                    <LinearGradient 
                        start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 1.0 }}
                        colors={['#FFC050', '#EB8E56']}
                    >
                        <ListView
                            horizontal
                            dataSource={categoryList}
                            renderRow={(item) => this.renderCategory(item)}
                        />
                    </LinearGradient>
                    </Card>
                    <Card>
                        <CardSection>
                            <FontText>ร้านอาหารแนะนำสำหรับคุณ</FontText>
                        </CardSection>
                        <ListView
                            horizontal
                            dataSource={suggestList}
                            renderRow={(item) => this.renderSuggest(item)}
                        />
                    </Card>
                </ScrollView>
            );
        }
        return <LoadingImage />;
    }
}

const mapStateToProps = ({ auth }) => {
    const { token } = auth;
    return { token };
};

export default connect(mapStateToProps)(HomeScreen);
