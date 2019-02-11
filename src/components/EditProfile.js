import React from 'react';
import { View, TextInput } from 'react-native';
// import { connect } from 'react-native-router-flux';
import { Row, ImageRound, FontText } from './common';
import { YELLOW, ORANGE } from './common/config';

class EditProfile extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#FFF', paddingVertical: 40, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Row>
                        <View >
                            <ImageRound
                                source={{ uri: 'https://i.imgflip.com/127vzs.jpg' }} 
                                style={{ borderRadius: 40, }}
                            />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', }}>
                            <Row style={{ marginBottom: 10 }}>
                                <FontText style={{ flex: 1, textAlign: 'right', paddingRight: 10 }} color={ORANGE} >ชื่อ-สกุล</FontText>
                                <TextInput placeholder='นาเรม นาฮี' style={{ flex: 3, borderColor: ORANGE, borderWidth: 1, color: ORANGE, borderRadius: 10, padding: 10 }} />
                            </Row>
                            <Row>
                                <FontText style={{ flex: 1, textAlign: 'right', paddingRight: 10 }} color={ORANGE}>เบอร์</FontText>
                                <TextInput placeholder='นาเรม นาฮี' style={{ flex: 3, borderColor: ORANGE, borderWidth: 1, color: ORANGE, borderRadius: 10, padding: 10 }} />
                            </Row>
                        </View>
                    </Row>
                </View>
            </View>
        );
    }
}

export default EditProfile;
