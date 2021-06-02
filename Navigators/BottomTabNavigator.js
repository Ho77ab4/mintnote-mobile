import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DirectoriesNavigator } from './StackDirectoriesNavigator'
import { RedactorScreen } from '../Screens/RedactorScreen'
import { TabRouter } from '@react-navigation/routers'
import Firebase from '../Firebase'

const Tab = createBottomTabNavigator()

export const BottomTabNavigator = () => {
    if (Firebase.user.isAuth) {
        return (
            <Tab.Navigator 
                tabBarOptions={{
                    tabStyle: {
                        paddingBottom: 15,
                    },
                    allowFontScaling: true,
                    inactiveBackgroundColor: '#55D470',
                    activeBackgroundColor: '#65EC82',
                    activeTintColor: 'white',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="NotesManager" component={DirectoriesNavigator} />
                <Tab.Screen name="Redactor" component={RedactorScreen}/>
            </Tab.Navigator>
        )
    } else {
        return (
            <Tab.Navigator 
                tabBarOptions={{
                    tabStyle: {
                        paddingBottom: 15,
                    },
                    allowFontScaling: true,
                    inactiveBackgroundColor: '#55D470',
                    activeBackgroundColor: '#65EC82',
                    activeTintColor: 'white',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="Redactor" component={RedactorScreen}/>
            </Tab.Navigator>
        )
    }
}

const styles = StyleSheet.create({
    tab: {
        marginBottom: 10,
        fontSize: 20,
    }
})

