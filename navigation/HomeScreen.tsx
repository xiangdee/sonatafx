import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/homeScreen/Home';
import { sitename } from '../defaults';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Wallet from '../screens/homeScreen/Wallet';
import Earn from '../screens/homeScreen/Earn';
import Profile from '../screens/homeScreen/Profile';
const Tab = createBottomTabNavigator();

export default function HomeScreen() {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home} 
            options={{
                tabBarIcon:({color,size}) => {
                    return <AntDesign name='home' color={color} size={size} />
                }
            }}/>
            <Tab.Screen name='Walet' component={Wallet} 
             options={{
                tabBarIcon:({color,size}) => {
                    return <AntDesign name='wallet' color={color} size={size} />
                }
            }}
            />
            {/* <Tab.Screen name='Transaction' component={About} /> */}
            <Tab.Screen name='Earn' component={Earn} 
             options={{
                tabBarIcon:({color,size}) => {
                    return <AntDesign name='CodeSandbox' color={color} size={size} />
                }
            }}
            />
            <Tab.Screen name='Account' component={Profile} 
             options={{
                tabBarIcon:({color,size}) => {
                    return <AntDesign name='user' color={color} size={size} />
                }
            }}
            />
            
        </Tab.Navigator>
    )
}


