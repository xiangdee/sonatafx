import React from 'react'
import { Card, Text, withTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
 function RenderActivitiess({data,theme}) {
    const { item } = data;

    return (
        <Card style={{marginBottom:2}}>
            <Card.Content>
                <View style={styles.lineContent}>
                <Text>login</Text>
                <Text>{item.country}/{item.state}</Text>
                </View>
            </Card.Content>
            <Card.Content>
                <View style={styles.lineContent}>
                <Text>{item.date}</Text>
                <Text>ip:{item.ip}</Text>

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

export default withTheme(RenderActivitiess)