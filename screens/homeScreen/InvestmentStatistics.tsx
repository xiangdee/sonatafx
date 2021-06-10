import React from 'react';
import { View } from 'react-native';
import { Card, Title, withTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const InvestmentStatistics = (prop) => {
    return(
    <View style={{marginLeft:10,marginRight:10,marginTop:10}}>
        <Card>
            <Card.Content>
                <View style={{alignItems:'center'}}>
                    <MaterialCommunityIcons name='hammer-wrench' size={115} color={prop.theme.colors.primary}/>
                </View>
                <View style={{marginTop:20,marginLeft:3,marginRight:3,borderTopWidth:3}}>
                        <Title>Trust Score - 100%</Title>
                        <Title>Total Accounts - 7000</Title>
                        <Title>Trust Deposited - $90m</Title>
                        <Title>Trust Withdrawn - $200m</Title>
                        <Title>SSL Security - 100%</Title>
                        <Title>DDOS Protection - active</Title>
                        <Title>Status - Paying</Title>
                        
                </View>
                <View style={{marginTop:20,marginLeft:3,marginRight:3,borderTopWidth:3}}>
                <MaterialCommunityIcons name='server-network' size={115} color={prop.theme.colors.primary}/>

                </View>
            </Card.Content>
        </Card>
    </View>
)
}
export default withTheme(InvestmentStatistics);