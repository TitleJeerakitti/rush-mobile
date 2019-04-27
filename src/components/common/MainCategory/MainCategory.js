import React from 'react';
import { Card, Row } from '../../common';

const MainCategory = ({ children }) => {
    return (
        <Card>
            <Row>
                {children}
            </Row>
        </Card>
    );
};

export { MainCategory };
