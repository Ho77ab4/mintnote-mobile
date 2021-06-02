import React, {useEffect, useState} from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { ContactsScreen } from '../Screens/ContactsScreen'
import { HelpScreen } from '../Screens/HelpScreen'
import { LoginScreen } from '../Screens/LoginScreen'
import Firebase from '../Firebase'
import firebase from 'firebase'

import { BottomTabNavigator } from './BottomTabNavigator'

const Drawer = createDrawerNavigator()


export const DrawerLeftMenu = () => {
    if (!Firebase.user.isAuth) {
        return (
            <Drawer.Navigator>
                <Drawer.Screen name="Login" component={LoginScreen} />
                <Drawer.Screen name="Home" component={BottomTabNavigator} />
                <Drawer.Screen name="Contacts" component={ContactsScreen} /> 
                <Drawer.Screen name="Help" component={HelpScreen} />
            </Drawer.Navigator>
    )
    } else {
        return (
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={BottomTabNavigator} />
                <Drawer.Screen name="Contacts" component={ContactsScreen} /> 
                <Drawer.Screen name="Help" component={HelpScreen} />
            </Drawer.Navigator>
        )
    }
}