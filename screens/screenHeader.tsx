import React from 'react';
import { View } from 'react-native';
import { Text, withTheme } from 'react-native-paper';

const welcomeHeader = (props) => {
    return (
        <View>
            <Text>{props.title}</Text>
       </View>
    )
}

export default withTheme(welcomeHeader);