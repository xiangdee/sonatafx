import React from 'react'
import { Card, Text, withTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
 function RenderRefs({data,theme,username,navigation,renderType}) {
    const { item } = data;

    return (
        <Card>
            <Card.Content>
                <View style={styles.lineContent}>
                <Text>{item.refUserSignUp}</Text>
                <Text>{item.refUserName}</Text>
                <Text>{item.country}</Text>
                </View>
            </Card.Content>
        </Card>
    )
}


const styles = StyleSheet.create({
    lineContent: {
        flexDirection:'row',
        flex:1,
        justifyContent:'space-around',
        marginBottom:10
    }
})

export default withTheme(RenderRefs)