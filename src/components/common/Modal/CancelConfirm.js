import React from 'react';
import { Modal, View, Alert } from 'react-native';
import { FontText, CancelConfirmButton, Card } from '../../common';

class CancelConfirm extends React.Component {
    render() {
        const { visible, onCancel, onConfirm } = this.props;
        return (
            <Modal
                visible={visible}
                transparent
                animationType='fade'
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}
            >
                <View style={styles.container}>
                    <View style={styles.containerChild}>
                        <FontText size={28} style={{ alignSelf: 'center' }}>
                            ยืนยันการยกเลิก
                        </FontText>
                        <Card>
                            <CancelConfirmButton 
                                onConfirm={onConfirm}
                                onCancel={onCancel}
                            />
                        </Card>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = {
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginBottom: 40
    },
    containerChild: {
        maxHeight: '40%',
        width: '80%',
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 20,
        elevation: 10,
    },
};

export { CancelConfirm };
