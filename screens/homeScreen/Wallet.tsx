import * as Localization from 'expo-localization';
import React, { useEffect } from 'react'
import { View,StyleSheet } from 'react-native';
import {  FlatList, ScrollView } from 'react-native-gesture-handler';
import { Card, Title, withTheme,Text, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { user_transactions } from '../../actions/userActions'
import RenderTransaction from '../../components/RenderTransaction';
import { useIsFocused } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function Wallet({user,theme,navigation,transactions,transactionsLoader,user_transactions}) {
    const isFocused= useIsFocused;
    const timezone = Localization.timezone;
    useEffect(() => {
        user_transactions({username:user.username,timezone:timezone});
        return () => {
            transactions
        }
    }, [isFocused])
    let userStatus;
    if (user.activated < 1) {
        userStatus = 'Pending Activation';
    }else if (user.limit == false) {
        userStatus = 'Limit Exceeded';

    }else {
        userStatus='Account Working Fine'
    }
    
    const displayUserTransactions =  () =>  {
        if (transactionsLoader == true) {
            if (transactions) {
                return (
                    <>
                        <FlatList
                            data={transactions}
                            renderItem={RenderTransactions}
                            keyExtractor={item => item.id} 
                            nestedScrollEnabled={true}
                            /></>
                )
            }
                 else {
                return( 
                <>
                    <Text style={{ marginLeft: 20, marginRight: 20 }}>
                        No withdrawals
                    </Text></>
                 )   
                }
        }else {
            return <ActivityIndicator size='large'/>
        }

        }
        const RenderTransactions = (item) => {
            return <RenderTransaction data={item} username={user.username} navigation={navigation} renderType='all'/>
        }

    return (
        <ScrollView horizontal={false} style={{marginTop:50}}>
            <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Card style={{backgroundColor:theme.colors.success,marginRight:20,marginLeft:20,width:270,height:130}}>
                        <Card.Content style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Title>
                                Total Profit
                        </Title>   
                        <FontAwesome5 name='chart-area' size={55}/> 
                            
                        </Card.Content>
                        <Card.Content style={{justifyContent:'flex-start'}}>
                        
                           
                            <Text>
                                {user.totalProfit}
                            </Text>
                           
                        </Card.Content>
                    </Card>
                    <Card style={{backgroundColor:theme.colors.info,marginRight:20,width:270,height:130}}>
                        <Card.Content style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Title>
                                Total Deposit
                        </Title>   
                        <FontAwesome5 name='piggy-bank' size={55}/> 
                            
                        </Card.Content>
                        <Card.Content style={{justifyContent:'flex-start'}}>
                        
                           
                            <Text>
                                {user.totalDeposit}
                            </Text>
                           
                        </Card.Content>
                    </Card>
                    
                <Card style={{backgroundColor:theme.colors.warning,width:270,height:130}}>
                        <Card.Content  style={{alignItems:'center'}}>
                            <Title>
                                Level Details
                            </Title>
                            <Text>
                                {user.levelDetails}
                            </Text>
                            <Text>
                                {userStatus}
                            </Text>
                        </Card.Content>
                    </Card>
            </ScrollView>
            <SafeAreaView>
                    <Title style={{ marginLeft:20, marginRight:20}}>Recent Transactions</Title>
                {displayUserTransactions()}
            </SafeAreaView>
       </ScrollView>
    )
}
const styles = StyleSheet.create({
    lineContent: {
        marginLeft:15,
        marginRight:15,
        flexDirection:'column',
        justifyContent:'space-around',
        marginBottom:10
    }
});

const mapStateToProps = (state) => {
    const {user,transactions,transactionsLoader} = state.Users;
    return {
        user:user,
        transactions:transactions,
        transactionsLoader:transactionsLoader
    }
}
export default connect(mapStateToProps,{user_transactions})(withTheme(Wallet));