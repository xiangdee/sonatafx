import React ,{useEffect, useState} from 'react';
import { FlatList, View } from 'react-native';
import { withTheme,Text, ActivityIndicator } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { sitelink } from '../../defaults';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import RenderTops from '../../components/RenderTops';
import { SafeAreaView } from 'react-native-safe-area-context';

const TopDeposit = () => {
    const [topEarners,topEarnersSet] = useState({})
    const [topEarnersLoading,topEarnersLoadingSet] = useState(true);
    const res = async () => {
        await axios.get(`https://api.${sitelink}/user/randompeople`, {
         headers: 
         {'Content-type':'application/json'}
     }).then(
         res => {
          topEarnersLoadingSet(false);
          topEarnersSet(res.data)
          
         }).catch( e => {
          topEarnersLoadingSet(false);
             Toast.show('Network Error', {
                 duration:Toast.durations.LONG,
             })
         })
         
     
     }

    useEffect(() => {
  
            res();
            
        return () => {
            topEarners
        }
    }, [useIsFocused()])

    const RenderTransactions = (item) => {
        return <RenderTops data={item} />
    }
    return  (
        <View>
            {topEarnersLoading && <ActivityIndicator size={65} /> }
            {topEarners && <SafeAreaView>
                <FlatList 
                                data={topEarners}
                                renderItem={RenderTransactions}
                                keyExtractor={data => data.id}
                            />
            </SafeAreaView> }
        </View>
    )
}

export default withTheme(TopDeposit);