import React from 'react'
import { Button, Card, Text, withTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5'
import * as Progress from 'react-native-progress';
 function RenderTransaction({data,theme,username,navigation,renderType}) {
    // console.log(data.item);
    const { item } = data;
    let statusColor: any;
    let icon: any;
    let tColor;
    let tSign;
    switch (item.type) {
        case 'withdraw':
            tColor=theme.colors.danger
            tSign = '-';
            break;
    
        default:
            tColor=theme.colors.success
            tSign = '+';
            break;
    }
    switch (item.status) {
        case 'pending':
            statusColor = theme.colors.warning;
             tColor = theme.colors.warning;
            break;
        case 'loss':
            statusColor = theme.colors.danger;
        default:
            statusColor = theme.colors.success;
            break;
    }
    
    switch (item.method) {
        case 'Bitcoin':
            icon = <FontAwesome5 name='bitcoin' size={20} color={theme.colors.warning}/>
            break;
        case 'Paypal':
            icon = <FontAwesome5 name='paypal' size={20} color={theme.colors.info}/>
            break;    
        case 'Cashapp':
            icon = <FontAwesome5 name='dollar-sign' size={15} color={theme.colors.info}/>
            break; 
        case 'Bank':
            icon = <FontAwesome5 name='piggy-bank' size={15} color={theme.colors.info}/>
            break;        
    
        default:
            break;
    }
    const prog = item.percentage;
    let progress_col;
    let progress_per = prog/100;
        if (prog <= 20) {
            progress_col = theme.colors.danger;

        }
        if (prog > 20 && prog <= 50 ) {
            progress_col = theme.colors.info;

        }
        if (prog > 50 && prog <= 70 ) {
            progress_col = theme.colors.warning;

        }
        if (prog > 70 && prog <= 80 ) {
            progress_col = theme.colors.warning;

        }
        if (prog > 81 && prog <= 99.9 ) {
            progress_col = theme.colors.danger;
        }
        if (prog > 99.9 ) {
            progress_col = theme.colors.success;

        }
        
    let button:any;
    switch (renderType) {
        case 'withdraw':
            button=<Progress.Bar progress={progress_per} width={70} height={20} color={progress_col}/>
            break;
        case 'all':
            button=<Text>{item.type}</Text>
            break;    
    
        default:
            button = <Button  style={{backgroundColor:theme.colors.background}}
            onPress={()=>navigation.navigate('verify_deposit',
            {
                user:item.user,
                username:username,
                ref_id:item.ref_id
            }
            )}
            >Verify</Button>
            break;
    }

    

    return (
        <Card>
            <Card.Content>
                <View style={styles.lineContent}>
                <Text style={{color:tColor}}>{tSign}{item.value}</Text>
                <Text>{icon} {item.method}</Text>
                <Text style={{color:statusColor}}>{item.status}</Text>
                </View>
                <View style={styles.lineContent}>
                <Text>{item.date}</Text>
                {button}
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
export default withTheme(RenderTransaction)