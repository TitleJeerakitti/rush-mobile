import React from 'react';
import { 
    TextInput, 
    Dimensions, 
    ImageBackground, 
    KeyboardAvoidingView, 
    TouchableOpacity, 
    Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { Permissions, ImagePicker, } from 'expo';
import { Actions } from 'react-native-router-flux';
import { Row, ImageRound, FontText, Card, CardSection, Button } from './common';
import { YELLOW, ORANGE, SERVER, EDIT_PROFILE } from '../../config';
import { authUpdateUserInfo } from '../actions';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        const { birthday, email, picture, tel_number = '' } = this.props.userInfo;
        this.state = {
            birthday,
            email,
            firstName: '',
            lastName: '',
            picture,
            telNumber: tel_number ? `0${tel_number.slice(3)}` : '',
            imageURL: null,
        };
    }

    componentDidMount() {
        this.getUserInfo();
    }

    async getUserInfo() {
        try {
            const { access_token, token_type, } = this.props.token;
            const response = await fetch(`${SERVER}${EDIT_PROFILE}`, {
                headers: {
                    Authorization: `${token_type} ${access_token}`,
                    'Content-Type': 'application/json',
                }
            });
            const responseData = await response.json();
            if (response.status === 200) {
                this.setState({
                    firstName: responseData.first_name,
                    lastName: responseData.last_name,
                    telNumber: `0${responseData.tel_number.slice(3)}`,
                    picture: responseData.profile_picture,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getCameraRollAsync() {
        const { status, /* permissions */ } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
        //   return Location.getCurrentPositionAsync({enableHighAccuracy: true});
            this.selectPhoto();
        } else {
          throw new Error('Location permission not granted');
        }
    }

    async saveEditProfile() {
        try {
            const { access_token, token_type, } = this.props.token;
            const response = await fetch(`${SERVER}${EDIT_PROFILE}`, {
                method: 'POST',
                headers: {
                    Authorization: `${token_type} ${access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                    tel_number: `+66${this.state.telNumber.slice(1)}`,
                    profile_picture: this.state.imageURL,
                }),
            });
            const responseData = await response.json();
            console.log(response.status);
            if (response.status === 200) {
                Alert.alert('Update Profile Success!');
                this.props.authUpdateUserInfo(responseData);
                Actions.pop();
            }
        } catch (error) {
            console.log(error);
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
    }

    // async uploadImage() {
    //     try {
    //         const { access_token, token_type, } = this.props.token;

    //         const response = await fetch(`${SERVER}/auth/upload-customer-profile-picture/`, {
    //             method: 'POST',
    //             headers: {
    //                 Authorization: `${token_type} ${access_token}`,
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 profile_picture: this.state.imageURL,
    //             }),
    //         });
    //         const responseData = await response.json();
    //         console.log(responseData);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    render() {
        const { imageStyle, containerDetail, containerBackground, textInputStyle } = styles;
        const { birthday, email, firstName, lastName, picture, telNumber } = this.state;
        return (
            <KeyboardAvoidingView behavior='position' style={{ flex: 1 }} enabled>
                <ImageBackground source={{ uri: 'https://png.pngtree.com/thumb_back/fw800/back_pic/04/51/79/17585f3a4b4b691.jpg' }} style={containerBackground}>
                    <TouchableOpacity onPress={() => this.getCameraRollAsync()}>
                    <ImageRound
                        source={{ uri: this.state.imageURL || picture }} 
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
                            <FontText style={{ flex: 1 }}>ชื่อ</FontText>
                            <TextInput 
                                placeholder='ชื่อ' 
                                style={textInputStyle} 
                                value={firstName} 
                                onChangeText={(text) => this.setState({ firstName: text })}
                                autoCapitalize='none'
                                autoCorrect={false}
                            />
                        </Row>
                    </CardSection>
                    <CardSection style={{ paddingBottom: 10 }}>
                        <Row>
                            <FontText style={{ flex: 1 }}>นามสกุล</FontText>
                            <TextInput 
                                placeholder='นามสกุล' 
                                style={textInputStyle} 
                                value={lastName} 
                                onChangeText={(text) => this.setState({ lastName: text })}
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
                                value={telNumber} 
                                onChangeText={(text) => this.setState({ telNumber: text })}
                                autoCapitalize='none'
                                autoCorrect={false}
                            />
                        </Row>
                    </CardSection>
                </Card>
                <Button onPress={() => this.saveEditProfile()} color={YELLOW}>
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

export default connect(mapStateToProps, { authUpdateUserInfo })(EditProfile);
