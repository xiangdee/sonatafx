import * as Localization from 'expo-localization';
import React, { useEffect } from 'react'
import { View,StyleSheet } from 'react-native';
import {  FlatList, ScrollView } from 'react-native-gesture-handler';
import { Card, Title, withTheme,Text, ActivityIndicator, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { user_referals } from '../../actions/userActions'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RenderRefs from '../../components/RenderRefs';
import { useIsFocused } from '@react-navigation/native';
import { sitelink } from '../../defaults';

function Wallet({user,theme,navigation,referals,refererLoader,user_referals}) {
    const isFocused =useIsFocused;
    useEffect(() => {
        user_referals({username:user.username});
        return () => {
            referals
        }
    }, [isFocused])
 
    const displayUserTransactions =  () =>  {
        if (refererLoader == true) {
            if (referals) {
                return (
                    <>
                        <FlatList
                            data={referals}
                            renderItem={RenderTransactions}
                            keyExtractor={item => item.id} 
                            /></>
                )
            }
                 else {
                return( 
                <>
                    <Text style={{ marginLeft: 20, marginRight: 20 }}>
                        No referals
                    </Text></>
                 )   
                }
        }else {
            return <ActivityIndicator size='large'/>
        }

        }
        const RenderTransactions = (item) => {
            return <RenderRefs data={item} username={user.username} navigation={navigation}/>
        }

    return (
        <View style={{marginTop:60}}>
            <View>
                    <Card style={{backgroundColor:theme.colors.success,marginRight:20,marginLeft:20,height:130}}>
                        <Card.Content style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Title>
                                Users Refered
                        </Title>   
                        <FontAwesome5 name='users' size={55}/> 
                            
                        </Card.Content>
                        <Card.Content style={{justifyContent:'flex-start'}}>
                        
                           
                            <Text>
                                {user.totalRefered}
                            </Text>
                           
                        </Card.Content>
                    </Card>
                    <Card style={{backgroundColor:theme.colors.info,marginRight:20,marginLeft:20,marginTop:20,height:130}}>
                        <Card.Content style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Title>
                                Total Refered
                        </Title>   
                        <FontAwesome5 name='money-bill' size={55}/> 
                            
                        </Card.Content>
                        <Card.Content style={{justifyContent:'flex-start'}}>
                        
                           
                            <Text>
                                {user.refTotal}
                            </Text>
                           
                        </Card.Content>
                    </Card>
                    
            </View>
            <View style={{marginRight:20,marginLeft:20,}}>
                <Title>Earn Extra funds with {sitelink}</Title>
                <Text>
                Share this link below with your friend's and get
							paid when they successfully sign up.
                </Text>
                <TextInput label={`www.${sitelink}/sign_up?referrer=${user.username}`} 
                value={`www.${sitelink}/sign_up?referrer=${user.username}`} style={{width:300}}/>
                <Text>
                    Or you can share your username {user.username} , to users for use when they sign up
                </Text>
            </View>
            <SafeAreaView>
                    <Title style={{ marginLeft:20, marginRight:20}}>Users Refered</Title>
                {displayUserTransactions()}
            </SafeAreaView>
       </View>
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
    const {user,referals,refererLoader} = state.Users;
    return {
        user:user,
        referals:referals,
        refererLoader:refererLoader
    }
}
export default connect(mapStateToProps,{user_referals})(withTheme(Wallet));