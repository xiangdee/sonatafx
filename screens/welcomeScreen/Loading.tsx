import React, { useState, useEffect } from 'react'
import { View,Image } from 'react-native'
import { useTheme } from 'react-native-paper'
import * as SecureStore from 'expo-secure-store';
import { connect } from 'react-redux';

function Loading({navigation,isLogggedin}) {
    const [userLoggedIn,userLoggedInSet] = useState({})
     const store = () => {
       if (isLogggedin === null) {
        navigation.replace('Welcome')
       }
      else if (Object.keys(isLogggedin).length === 0) {
        navigation.replace('Welcome')
      }else{
        navigation.replace('Home')        
      }
     }
  
    useEffect(() => {
       store()

      },[])
    const theme = useTheme();
    const {colors} = theme;
    return (
      
      <View style={{backgroundColor:colors.background,flex:1}}>
      <View style={{alignItems:'center'}}>
        <Image  source={require('../../assets/images/splash.png')} style={{ width:'100%' }}/>
      </View>
  </View>
    )
}

const mapStateToProps = (state) => {
  const {isLogggedin} = state.Auth;
  return {
    isLogggedin:isLogggedin
  }
}
export default  connect(mapStateToProps)(Loading)