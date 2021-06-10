import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import Toast from 'react-native-root-toast';
import RenderNews from '../../components/RenderNews';
import { sitelink } from '../../defaults';
import { withTheme,ActivityIndicator } from 'react-native-paper';
const News = (props) => {
    const [news,newsSet] = useState({})
    const [newsLoading,newsLoadingSet] = useState(true);
    const {username} = props.route.params;
    const res = async () => {
        await axios.post(`https://api.${sitelink}/user/cryptonews`,{
            username:username
        }, {
         headers: 
         {'Content-type':'application/json'}
     }).then(
         res => {
          newsLoadingSet(false);
          newsSet(res.data)
          
         }).catch( e => {
          newsLoadingSet(false);
             Toast.show('Network Error', {
                 duration:Toast.durations.LONG,
             })
         })
         
     
     }

    useEffect(() => {
  
            res();
            
        return () => {
            news
        }
    }, [useIsFocused()])

    const RenderTransactions = (item) => {
        return <RenderNews data={item} />
    }
    return  (
        <View>
            {newsLoading && <ActivityIndicator size={65} /> }
            {news && <SafeAreaView>
                <FlatList 
                                data={news}
                                renderItem={RenderTransactions}
                                keyExtractor={data => data.id}
                            />
            </SafeAreaView> }
        </View>
    )

}
export default withTheme(News);