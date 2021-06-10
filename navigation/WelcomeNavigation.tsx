import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import welcome from '../screens/welcomeScreen/welcome';
import { sitename } from '../defaults';
import Register from '../screens/welcomeScreen/register';
import Login from '../screens/welcomeScreen/Login';
import HomeScreen from './HomeScreen';
import Loading from '../screens/welcomeScreen/Loading';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Deposit from '../screens/homeScreen/Deposit';
import VerifyDeposit from '../screens/homeScreen/VerifyDeposit';
import Withdraw from '../screens/homeScreen/Withdraw';
import ManageProfile from '../screens/homeScreen/ManageProfile';
import ChangePassWord from '../screens/homeScreen/ChangePassWord';
import Security from '../screens/homeScreen/Security';
import Activities from '../screens/homeScreen/Activities';
import RecoverPassword from '../screens/welcomeScreen/RecoverPassword';
import TwoFaSignIn from '../screens/welcomeScreen/TwoFaSignIn';
import TopEarners from '../screens/homeScreen/TopEarners';
import InvestmentStatistics from '../screens/homeScreen/InvestmentStatistics';
import Cryptos from '../screens/homeScreen/Cryptos';
import News from '../screens/homeScreen/News';
import LiveChat from '../screens/homeScreen/LiveChat';
import HowToInvest from '../screens/homeScreen/HowToInvest';

const Stack = createStackNavigator();
export default function WelcomeNavigation() {
  const theme=  useTheme();
    return (
        <Stack.Navigator  mode="modal"
        screenOptions={{
            headerShown:false,
            cardOverlay: () => (
                <View
                  style={{
                  flex: 1,
                  backgroundColor: theme.colors.background,
                }}
              />)
        }}>
            <Stack.Screen name='Loading' component={Loading} />
            <Stack.Screen name='Welcome' component={welcome} />
            <Stack.Screen name='register' component={Register} />
            <Stack.Screen name='login' component={Login} />
            <Stack.Screen name='recover_password' component={RecoverPassword} />
            <Stack.Screen name='twofasignin' component={TwoFaSignIn} />
            <Stack.Screen name='Home' component={HomeScreen} 
            options={{
                headerShown:false,
                headerTitle:sitename,
                headerTitleAlign:'center'
            }}/>
             <Stack.Screen name='TopEarners' component={TopEarners} 
            options={{headerShown:true,
            title:"Top Earners"}}
            />
             <Stack.Screen name='TopDeposit' component={TopEarners} 
            options={{headerShown:true,
            title:"Recent Depositors"}}
            />
             <Stack.Screen name='InvestmentStatistics' component={InvestmentStatistics} 
            options={{headerShown:true,
            title:"Our Statistics"}}
            />
            <Stack.Screen name='Cryptos' component={Cryptos} 
            options={{headerShown:true,
            title:"Crypto Statistics"}}
            />
            <Stack.Screen name='News' component={News} 
            options={{headerShown:true,
            title:"News"}}
            />
            <Stack.Screen name='LiveChat' component={LiveChat} 
            options={{headerShown:true,
            title:"Live Chat"}}
            />
            <Stack.Screen name='HowToInvest' component={HowToInvest} 
            options={{headerShown:true,
            title:"How to Invest"}}
            />
            <Stack.Screen name='Deposit' component={Deposit} 
            options={{headerShown:true}}
            />
            <Stack.Screen name='Withdraw' component={Withdraw} 
            options={{headerShown:true}}
            />
            <Stack.Screen name='verify_deposit' component={VerifyDeposit} 
            options={{headerShown:true,
            title:"Verify Payment"}}
            />
            <Stack.Screen name='Manage_profile' component={ManageProfile} 
            options={{headerShown:true,
            title:"Manage Profile"}}
            />
            <Stack.Screen name='change_password' component={ChangePassWord} 
            options={{headerShown:true,
            title:"Password Change"}}
            />
             <Stack.Screen name='security' component={Security} 
            options={{headerShown:true,
            title:"Advanced Security"}}
            />
            <Stack.Screen name='activities' component={Activities} 
            options={{headerShown:true,
            title:"Account Activities"}}
            />

        </Stack.Navigator>
    )
}



