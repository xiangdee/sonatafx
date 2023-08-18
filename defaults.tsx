import React from 'react';
import { DarkTheme,DefaultTheme,Text } from 'react-native-paper';
import {DarkTheme as NavigationDarkTheme } from '@react-navigation/native'
import {DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native'



export  const sitename = 'Aquanerdfx';
export const sitelink = 'aquanerdfx.online';

export const  themeDark = {
    ...DarkTheme,
    ...NavigationDarkTheme,
    dark: true,
    myOwnProperty: true,
    mode : 'exact',
      colors : {
        ...DarkTheme.colors,
        ...NavigationDarkTheme,
        background:'#060e17',
        card: '#0c1825',
        surface :'#0c1825',
        primary :'#28bb78',
        info: "#5bc0de",
        warning: "#f0ad4e",
        danger: "#d9534f",
        success: "#5cb85c",
        text: "#ffffff"

    },
    
  };

  export const customTheme = {
    ...DefaultTheme,
    ...NavigationDefaultTheme,
    myOwnProperty: true,
    colors : {
        ...DefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
            primary:"#28bb78",
            accent:"#009ACD",
            info: "#5bc0de",
            warning: "#f0ad4e",
            danger: "#d9534f",
            success: "#5cb85c"
        },
    };

   export const ErrorInputText = ({error}) => {
    return (
      <Text style={{color:'red'}}>
      {error}
    </Text>
    )
   } 