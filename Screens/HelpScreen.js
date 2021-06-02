import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const HelpScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Help</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

