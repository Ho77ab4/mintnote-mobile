import React from 'react'
import { StyleSheet, SafeAreaView, Text, Image, StatusBar } from 'react-native'
import logo from './Images/logo.png'

export const Header = () => {
    
    const styles = StyleSheet.create({
        view: {
            backgroundColor: '#55D470', 
            height: 50, 
            marginTop: StatusBar.currentHeight,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        logo: {
            width: 50, 
            height: 50,
        },
        text: {
            color: '#fff',
            fontSize: 25,
        }
    })

    return (
        <SafeAreaView style={styles.view} >
            <Image source={logo} style={styles.logo}/>
            <Text style={styles.text}>MintNote</Text>   
        </SafeAreaView>
    )
}