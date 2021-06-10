import * as Localization from 'expo-localization';
import React, { useEffect } from 'react'
import { View,StyleSheet } from 'react-native';
import {  FlatList, ScrollView } from 'react-native-gesture-handler';
import { Card, Title, withTheme,Text, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { user_activities } from '../../actions/userActions'
import RenderActivitiess from '../../components/RenderActivitiess';
import { useIsFocused } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function Activities({user,theme,activities,activitiesLoader,user_activities}) {
    const isFocused= useIsFocused;
    const timezone = Localization.timezone;
    useEffect(() => {
        user_activities({username:user.username,timezone:timezone});
        return () => {
            activities
        }
    }, [isFocused])
    
    const displayUserTransactions =  () =>  {
        if (activitiesLoader == true) {
            if (activities) {
                return (
                    <>
                        <FlatList
                            data={activities}
                            renderItem={RenderActivities}
                            keyExtractor={item => item.id} 
                            nestedScrollEnabled={true}
                            /></>
                )
            }
                 else {
                return( 
                <>
                    <Text style={{ marginLeft: 20, marginRight: 20 }}>
                        No Activies
                    </Text></>
                 )   
                }
        }else {
            return <ActivityIndicator size='large'/>
        }

        }
        const RenderActivities = (item) => {
            return <RenderActivitiess data={item} />
        }

    return (
              <SafeAreaView>
                {displayUserTransactions()}
            </SafeAreaView>
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
    const {user,transactions,transactionsLoader,activitiesLoader,activities} = state.Users;
    return {
        user:user,
        activities:activities,
        activitiesLoader:activitiesLoader
    }
}
export default connect(mapStateToProps,{user_activities})(withTheme(Activities));