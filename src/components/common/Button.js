import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Row, Card, CardSection } from '../common';

const Button = ({ onPress, children, color }) => {
    return (
        <Card>
            <CardSection>
                <TouchableOpacity 
                    onPress={onPress} 
                    style={{ ...styles.container, backgroundColor: color }}
                    activeOpacity={1}
                >
                    <Row>
                        {children}
                    </Row>
                </TouchableOpacity>
            </CardSection>
        </Card>
    );
};

const styles = {
    container: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        shadowOpacity: 0.2,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        elevation: 1,
    }
};

export { Button };
