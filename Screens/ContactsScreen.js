import React from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'

export const ContactsScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Contacts</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

