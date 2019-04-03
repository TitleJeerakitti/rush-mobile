import React from 'react';
import { 
    TextInput, 
    Dimensions, 
    ImageBackground, 
    KeyboardAvoidingView, 
    TouchableOpacity, 
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { Permissions, ImagePicker, } from 'expo';
import { Row, ImageRound, FontText, Card, CardSection, Button } from './common';
import { YELLOW, ORANGE, SERVER } from './common/config';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        const { birthday, email, name, picture, tel_number = '' } = this.props.userInfo;
        this.state = {
            birthday,
            email,
            name,
            picture,
            tel_number,
            imageURL: null,
        };
    }

    async getLocationAsync() {
        const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
        //   return Location.getCurrentPositionAsync({enableHighAccuracy: true});
            this.selectPhoto();
        } else {
          throw new Error('Location permission not granted');
        }
    }

    async selectPhoto() {
        const result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            allowsEditing: true,
            aspect: [1, 1],
        });
        const imageUri = `data:image/jpg;base64,${result.base64}`;
        await this.setState({ imageURL: imageUri, });
        await this.uploadImage();
    }

    async uploadImage() {
        try {
            const { access_token, token_type, } = this.props.token;

            const response = await fetch(`${SERVER}/auth/upload-customer-profile-picture/`, {
                method: 'POST',
                headers: {
                    Authorization: `${token_type} ${access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    profile_picture: this.state.imageURL,
                }),
            });
            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { imageStyle, containerDetail, containerBackground, textInputStyle } = styles;
        const { birthday, email, name, picture, tel_number } = this.state;
        return (
            <KeyboardAvoidingView behavior='position' style={{ flex: 1 }} enabled>
                <ImageBackground source={{ uri: 'https://png.pngtree.com/thumb_back/fw800/back_pic/04/51/79/17585f3a4b4b691.jpg' }} style={containerBackground}>
                    <TouchableOpacity onPress={() => this.getLocationAsync()}>
                    <ImageRound
                        source={{ uri: this.state.imageURL ? this.state.imageURL : picture }} 
                        style={imageStyle}
                    />
                    </TouchableOpacity>
                    <Card style={containerDetail}>
                        <FontText size={24}>{email}</FontText>
                        <Row>
                            <Icon 
                                name='cake' 
                                type='material' 
                                containerStyle={{ marginRight: 10 }} 
                            />
                            <FontText size={20}>{birthday}</FontText>
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
                            <TextInput 
                                placeholder='ชื่อ - สกุล' 
                                style={textInputStyle} 
                                value={name} 
                                autoCapitalize='none'
                                autoCorrect={false}
                            />
                        </Row>
                    </CardSection>
                    <CardSection style={{ paddingBottom: 10 }}>
                        <Row>
                            <FontText style={{ flex: 1 }}>เบอร์โทร</FontText>
                            <TextInput 
                                placeholder='เบอร์โทรศัพท์' 
                                style={textInputStyle} 
                                value={tel_number} 
                                autoCapitalize='none'
                                autoCorrect={false}
                            />
                        </Row>
                    </CardSection>
                </Card>
                <Button onPress={() => console.log('here')} color={YELLOW}>
                    <FontText color='white'>บันทึกการเปลี่ยนแปลง</FontText>
                </Button>
            </KeyboardAvoidingView>
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
    },
    containerBackground: {
        paddingVertical: 30, 
        paddingHorizontal: 20, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    textInputStyle: {
        flex: 4, 
        borderColor: '#CCC', 
        borderWidth: 1, 
        borderRadius: 10, 
        padding: 10, 
        fontFamily: 'thaisans', 
        fontSize: 20
    }
};

const mapStateToProps = ({ auth }) => {
    const { userInfo, token } = auth;
    return { userInfo, token };
};

export default connect(mapStateToProps)(EditProfile);
