import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import Toast from 'react-native-root-toast';
import RenderCrptos from '../../components/RenderCrptos';
import { sitelink } from '../../defaults';
import { withTheme,ActivityIndicator } from 'react-native-paper';
const Cryptos = (props) => {
    const [cryptos,cryptosSet] = useState({})
    const [cryptosLoading,cryptosLoadingSet] = useState(true);
    const {username} = props.route.params;
    const res = async () => {
        await axios.post(`https://api.${sitelink}/user/cryptomarkets`,{
            username:username
        }, {
         headers: 
         {'Content-type':'application/json'}
     }).then(
         res => {
          cryptosLoadingSet(false);
          cryptosSet(res.data)
          
         }).catch( e => {
          cryptosLoadingSet(false);
             Toast.show('Network Error', {
                 duration:Toast.durations.LONG,
             })
         })
         
     
     }

    useEffect(() => {
  
            res();
            
        return () => {
            cryptos
        }
    }, [useIsFocused()])

    const RenderTransactions = (item) => {
        return <RenderCrptos data={item} />
    }
    return  (
        <View>
            {cryptosLoading && <ActivityIndicator size={65} /> }
            {cryptos && <SafeAreaView>
                <FlatList 
                                data={cryptos}
                                renderItem={RenderTransactions}
                                keyExtractor={data => data.id}
                            />
            </SafeAreaView> }
        </View>
    )

}
export default withTheme(Cryptos);