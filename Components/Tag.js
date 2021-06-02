import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'

export const Tag = ({name, color, onPress}) => {

    const handlePress = () => {
        onPress(name, color)
    }

    return (
        <View style={styles.container}>
            <Button title={name} color={color} onPress={handlePress}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minWidth: 20,
        margin: 5,
    }
})