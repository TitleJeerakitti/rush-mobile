import React from 'react';
import { TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import { CardSection } from './CardSection';

class ButtonSideList extends React.Component {
    componentWillMount() {
        const { width } = Dimensions.get('window');

        // Responsive Condition
        if (width > 375) {
            this.setState({ 
                ...this.state, 
                cardStyle: {
                    paddingHorizontal: 20,
                    paddingVertical: 15,
                }, 
                textListStyle: {
                    flex: 1,
                    marginLeft: '10%', 
                    justifyContent: 'center',
                }, 
                iconSize: 40,
                textSize: {
                    fontSize: 18,
                }
            });
        } else if (width > 320) {
            this.setState({ 
                ...this.state, 
                cardStyle: {
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                }, 
                textListStyle: {
                    flex: 1,
                    marginLeft: '5%', 
                    justifyContent: 'center',
                }, 
                iconSize: 35,
                textSize: {
                    fontSize: 16,
                }
            });
        } else {
            this.setState({ 
                ...this.state, 
                cardStyle: {
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                }, 
                textListStyle: {
                    flex: 1,
                    marginLeft: '5%', 
                    justifyContent: 'center',
                }, 
                iconSize: 30,
                textSize: {
                    fontSize: 16,
                }
            });
        }
    }

    isCurrentScene(type) {
        return Actions.currentScene === `home_${type}`;
    }

    sceneSelect() {
        const { type } = this.props;
        switch (type) {
            case 'homepage':
                return (this.isCurrentScene(type) ? 
                    Actions.drawerClose() : Actions.homepage());
            case 'history':
                return (this.isCurrentScene(type) ? 
                    Actions.drawerClose() : Actions.history());
            case 'queue':
                return (this.isCurrentScene(type) ? 
                    Actions.drawerClose() : Actions.queue());
            case 'sale':
                return (this.isCurrentScene(type) ? 
                    Actions.drawerClose() : Actions.sale());
            default:
                return Actions.drawerClose();
        }
    }

    render() {
        const { cardStyle, iconSize, textListStyle, textSize } = this.state;
        const { iconName, title } = this.props;
        return (
            <TouchableOpacity onPress={this.sceneSelect.bind(this)} >
                <View style={cardStyle}>
                    <CardSection>
                        <Icon name={iconName} type='material-community' size={iconSize} />
                        <View style={textListStyle}>
                            <Text style={textSize}>{title}</Text>
                        </View>
                    </CardSection>
                </View>
            </TouchableOpacity>
        );
    }
}

export { ButtonSideList };
