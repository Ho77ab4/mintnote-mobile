import React, {useState, useEffect} from 'react'
import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import firebase from 'firebase'
import Firebase from '../Firebase'

import { DirectoriesNavigationScreen } from '../Screens/DirectoriesNavigationScreen'
import { Context } from '../Context'

export const DirectoriesNavigator = () => {
    const [isDataLoading, setIsDataLoading] = useState(true)
    const [fetchedDirectories, setFetchedDirectories] = useState([])

    useEffect(() => {
        if (Firebase.token !== '') {
            //getNotes()
            getDirectories()
        }
    }, [Firebase.token])

    const getDirectories = () => {
        fetch("https://mintnote-api.appspot.com/directories/", {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + Firebase.token
            }
        })
        .then(async (res) => {
            const data = await res.json()
            const dataArr = []
            data["directories"].map(item => {
                dataArr.push(item)
            })
            data["notes"].map(item => {
                dataArr.push(item)
            })
            console.log(data)
            setFetchedDirectories(dataArr)
        }).finally(() => setIsDataLoading(false))
    }

    const DirectoryStack = createStackNavigator()
    if (isDataLoading) {
        return (
            <Text>Loading...</Text>
        )
    } else {    
        return (
        <Context.Provider value={{
            fetchedDirectories,
            setFetchedDirectories
        }}>
            <DirectoryStack.Navigator initialRouteName="Main">
                    <DirectoryStack.Screen 
                        name="Main" 
                        component={DirectoriesNavigationScreen} 
                        initialParams={{
                            directoryName: 'Main',
                            parent: "/",
                        }}
                        options={({route}) => ({title: route.params.directoryName})}
                    />
            </DirectoryStack.Navigator>
        </Context.Provider>
        )
    }
}