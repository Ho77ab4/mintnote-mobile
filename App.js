import React from 'react';
import { DrawerLeftMenu } from './Navigators/DrawerLeftMenu'
import { MenuProvider}  from 'react-native-popup-menu'
import { Header } from './CustomViewComponents';
import { NavigationContainer } from '@react-navigation/native';
import Firebase from './Firebase'
import firebase from 'firebase'

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Header />
        <DrawerLeftMenu />
      </NavigationContainer>
    </MenuProvider>
  );
}