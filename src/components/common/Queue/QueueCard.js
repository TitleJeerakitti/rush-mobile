import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontText, Card, Row, RowQueue, QueueProgress } from '../../common';
import RestaurantCard from '../../RestaurantCard';
import { YELLOW, DARK_RED } from '../colors';

class QueueCard extends React.Component {
    renderButton() {
        const { status, onPress, onCancelPress } = this.props;
        if (status > 1) {
            return (
                <Row>
                    <TouchableOpacity 
                        style={styles.fullDetailButton} 
                        onPress={onPress}
                    >
                        <FontText color={'white'}>ดูรายละเอียด</FontText>
                    </TouchableOpacity>
                </Row>
            );
        }
        return (
            <Row>
                <TouchableOpacity 
                    style={styles.cancelButton} 
                    onPress={onCancelPress}
                >
                    <FontText color={'white'}>ยกเลิก</FontText>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.halfDetailButton} 
                    onPress={onPress}
                >
                    <FontText color={'white'}>ดูรายละเอียด</FontText>
                </TouchableOpacity>
            </Row>
        );
    }

    render() {
        const { status, data, amount, queue } = this.props;
        return (
            <RestaurantCard data={data} disabled >
                <RowQueue amount={amount} queue={queue} />
                <QueueProgress status={status} />
                <Card style={styles.buttonContainer}>
                    <Row>
                        {this.renderButton()}
                    </Row>
                </Card>
            </RestaurantCard>
        );
    }
}

const styles = {
    buttonContainer: {
        marginHorizontal: -10, 
        marginBottom: -10, 
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 10,
    },
    cancelButton: {
        flex: 1,
        padding: 10, 
        backgroundColor: DARK_RED, 
        borderBottomLeftRadius: 10, 
        alignItems: 'center'
    },
    halfDetailButton: {
        flex: 1,
        padding: 10, 
        backgroundColor: YELLOW, 
        borderBottomRightRadius: 10, 
        alignItems: 'center'
    },
    fullDetailButton: {
        flex: 1,
        padding: 10, 
        backgroundColor: YELLOW, 
        borderBottomRightRadius: 10, 
        borderBottomLeftRadius: 10, 
        alignItems: 'center'
    }
};

export { QueueCard };
