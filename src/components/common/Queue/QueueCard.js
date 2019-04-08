import React from 'react';
import { 
    ButtonBottomCard,
    RowQueue, 
    QueueProgress, 
    TwoButton,
    OneButton,
} from '../../common';
import RestaurantCard from '../../RestaurantCard';
import { YELLOW, DARK_RED } from '../../../../config';

class QueueCard extends React.Component {
    renderButton() {
        const { status, onPress, onCancelPress } = this.props;
        if (status > 1) {
            return (
                <OneButton 
                    onPress={onPress}
                    color={YELLOW}
                    text='ดูรายละเอียด'
                />
            );
        }
        return (
            <TwoButton 
                onFirstPress={onCancelPress}
                onSecondPress={onPress}
                firstColor={DARK_RED}
                secondColor={YELLOW}
                firstText='ยกเลิก'
                secondText='ดูรายละเอียด'
            />
        );
    }

    render() {
        const { status, data, amount, queue } = this.props;
        return (
            <RestaurantCard data={data} >
                <RowQueue amount={amount} queue={queue} />
                <QueueProgress status={status} />
                <ButtonBottomCard>
                    {this.renderButton()}
                </ButtonBottomCard>
            </RestaurantCard>
        );
    }
}

export { QueueCard };
