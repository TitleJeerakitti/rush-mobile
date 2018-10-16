import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

class TextWithFont extends React.Component {
    loadText() {
        const { children, size = 20, style, numberOfLines, color, italic } = this.props;
        if (this.props.fontLoaded && !italic) {
            return (
                <Text 
                    style={{ 
                        fontFamily: 'thaisans',
                        fontSize: size,
                        color,
                        ...style,
                    }}
                    numberOfLines={numberOfLines}
                >
                    {children}
                </Text>);
        } else if (this.props.fontLoaded && italic) {
            return (
                <Text 
                    style={{ 
                        fontFamily: 'thaisansItalic',
                        fontSize: size,
                        color,
                        ...style,
                    }}
                    numberOfLines={numberOfLines}
                >
                    {children}
                </Text>);
        }
        return (<Text>Loading...</Text>);
    }

    render() {
        return (
            this.loadText()
        );
    }
}

const mapStateToProps = ({ global }) => {
    const { fontLoaded } = global;
    return { fontLoaded };
};

const FontText = connect(mapStateToProps)(TextWithFont);
export { FontText };
