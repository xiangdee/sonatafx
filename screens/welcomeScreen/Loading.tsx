import React, { useState, useEffect } from 'react'
import { View,Image } from 'react-native'
import { useTheme } from 'react-native-paper'
import * as SecureStore from 'expo-secure-store';

export default function Loading({navigation}) {
    const [userLoggedIn,userLoggedInSet] = useState({})
    const store = async () => {
      const result =  await SecureStore.getItemAsync('userLoggedIn');
      // SecureStore.deleteItemAsync('userLoggedIn');
      userLoggedInSet(result);
      return result;
    }
     const  displayMainContent =  () => { 
      store() ;      
      if ( userLoggedIn !== null) {
        return navigation.replace('Home')
      }else{
        return navigation.replace('Welcome')
      }
      
      
    }
  
    useEffect(() => {
        
        displayMainContent();
    })
    const theme = useTheme();
    const {colors} = theme;
    return (
      <View style={{backgroundColor:colors.background,flex:1}}>
      <View style={{alignItems:'center'}}>
        <Image  source={require('../../assets/images/splash.png')}/>
      </View>
  </View>
    )
}
