import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme, View } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { RootSiblingParent } from 'react-native-root-siblings';
import { NavigationContainer } from '@react-navigation/native'


import  { pesistor, store } from './reducers';
import WelcomeNavigation from './navigation/WelcomeNavigation'

import { customTheme, themeDark } from './defaults';
import { PersistGate } from 'redux-persist/integration/react';


export default function App() {
  
  const colorScheme = useColorScheme();
    return (
      <StoreProvider store={store}>

        <PersistGate loading={false} persistor={pesistor}>

            <PaperProvider theme={colorScheme === "dark" ? themeDark : customTheme}>
              <RootSiblingParent>
                <NavigationContainer theme={colorScheme === "dark" ? themeDark : customTheme}>
                    <WelcomeNavigation/>
                </NavigationContainer>
              </RootSiblingParent>
             </PaperProvider>
        </PersistGate>

      </StoreProvider>
    );

}
