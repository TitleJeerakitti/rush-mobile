import React from 'react';
import { View, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { Row, FontText, Card } from '../../common';
import { DARK_RED } from '../colors';

class QueueProgress extends React.Component {
    renderCooking() {
        const { status } = this.props;
        if (status > 1) {
            return (
                <Image 
                    source={require('../../../images/cooking-red.png')} 
                    style={styles.square} 
                />
            );
        }
        return (
            <Image 
                source={require('../../../images/cooking.png')} 
                style={styles.square} 
            />
        );
    }

    renderDone() {
        const { status } = this.props;
        if (status > 2) {
            return (
                <Image 
                    source={require('../../../images/tray-red.png')} 
                    style={styles.square} 
                />
            );
        }
        return (
            <Image 
                source={require('../../../images/tray.png')} 
                style={styles.square} 
            />
        );
    }

    render() {
        const { container, containerImage, square } = styles;
        const { status } = this.props;
        return (
            <Card style={container}>
                <Row>
                    <View style={containerImage}>
                        <Image source={require('../../../images/inprogress.png')} style={square} />
                        <FontText color={DARK_RED}>รอร้านตอบรับ</FontText>
                    </View>
                    <Icon 
                        name='skip-next-circle' 
                        type='material-community' 
                        color={status > 1 ? DARK_RED : 'black'} 
                    />
                    <View style={containerImage}>
                        {this.renderCooking()}
                        <FontText color={status > 1 ? DARK_RED : 'black'}>กำลังปรุง</FontText>
                    </View>
                    <Icon 
                        name='skip-next-circle' 
                        type='material-community' 
                        color={status > 2 ? DARK_RED : 'black'} 
                    />
                    <View style={containerImage}>
                        {this.renderDone()}
                        <FontText color={status > 2 ? DARK_RED : 'black'}>เสร็จแล้วจ้า</FontText>
                    </View>
                </Row>
            </Card>
        );
    }
};

const styles = {
    container: {
        paddingVertical: 20
    },
    containerImage: {
        flex: 1,
        alignItems: 'center'
    },
    square: {
        width: 50, 
        height: 50
    }
};

export { QueueProgress };
