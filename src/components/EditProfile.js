import React from 'react';
import { View, TextInput, Dimensions, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements';
// import { connect } from 'react-native-router-flux';
import { Row, ImageRound, FontText, Card, CardSection, Button } from './common';
import { YELLOW, ORANGE } from './common/config';

class EditProfile extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         pictureLength: Dimensions.get('window').width * 0.3,
    //     };
    // }

    render() {
        const { imageStyle, containerDetail } = styles;
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={{ uri: 'https://png.pngtree.com/thumb_back/fw800/back_pic/04/51/79/17585f3a4b4b691.jpg' }} style={{ backgroundColor: '#FFF', paddingVertical: 30, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <ImageRound
                        source={{ uri: 'https://i.imgflip.com/127vzs.jpg' }} 
                        style={imageStyle}
                    />
                    <Card style={containerDetail}>
                        <FontText size={24}>naremxxx@pornhub.com</FontText>
                        <Row>
                            <Icon name='cake' type='material' containerStyle={{ marginRight: 10 }} />
                            <FontText size={20}>13-01-1996</FontText>
                        </Row>
                    </Card>
                </ImageBackground>
                <Card style={{ backgroundColor: ORANGE, marginTop: 0, paddingVertical: 10 }}>
                    <CardSection>
                        <FontText color='white'>รายละเอียดเกี่ยวกับคุณ</FontText>
                    </CardSection>
                </Card>
                <Card style={{ backgroundColor: '#FEFEFE', marginTop: 0, paddingTop: 10 }}>
                    <CardSection style={{ paddingBottom: 10 }}>
                        <Row>
                            <FontText style={{ flex: 1 }}>ชื่อ-สกุล</FontText>
                            <TextInput placeholder='ชื่อ - สกุล' style={{ flex: 4, borderColor: '#CCC', borderWidth: 1, borderRadius: 10, padding: 10 }} />
                        </Row>
                    </CardSection>
                    <CardSection style={{ paddingBottom: 10 }}>
                        <Row>
                            <FontText style={{ flex: 1 }}>เบอร์โทร</FontText>
                            <TextInput placeholder='เบอร์โทรศัพท์' style={{ flex: 4, borderColor: '#CCC', borderWidth: 1, borderRadius: 10, padding: 10 }} />
                        </Row>
                    </CardSection>
                    <CardSection style={{ paddingBottom: 10 }}>
                        <Row>
                            <FontText style={{ flex: 1 }}>ที่อยู่</FontText>
                            <TextInput placeholder='ที่อยู่ปัจจุบัน' style={{ flex: 4, borderColor: '#CCC', borderWidth: 1, borderRadius: 10, padding: 10 }} />
                        </Row>
                    </CardSection>
                </Card>
                <Button onPress={() => console.log('here')} color={YELLOW}>
                    <FontText color='white'>บันทึกการเปลี่ยนแปลง</FontText>
                </Button>
            </View>
        );
    }
}

const styles = {
    imageStyle: {
        width: Dimensions.get('window').width * 0.3, 
        height: Dimensions.get('window').width * 0.3, 
        borderRadius: Dimensions.get('window').width * 0.15,
        marginRight: 0, 
        borderWidth: 3, 
        borderColor: '#000',
    },
    containerDetail: { 
        alignItems: 'center', 
        backgroundColor: 'rgba(255,255,255,0.8)', 
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        borderRadius: 10,
        borderWidth: 3, 
        borderColor: '#000',
    }
};

export default EditProfile;
