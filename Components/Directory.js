import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, Pressable, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'

export const Directory = ({title, action, onPress, tags}) => {

    const onDeletePressed = () => {
        Alert.alert(
            "Удаление элемента",
            "Вы действительно хотите удалить элемент?",
            [
                {
                    text: "OK",
                    onPress: () => action(title, "Delete")
                }, 
                {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel"
                }
            ]
        )
    }

    const onTagsPressed = () => {
        action(title, "Tags")
    }

    return (
        <Pressable 
            style={styles.container}
            onPressOut={onPress}
        >
            <Icon name="folder" size={30} color="black" />
            <Text style={styles.text}>{title}</Text>
            <Menu style={styles.dropdown}>
                <MenuTrigger style={{triggerTouchable: 'white', width: 50}}>
                    <Text style={styles.pressText}>&#8942;</Text>
                </MenuTrigger>
                <MenuOptions >
                    <MenuOption onSelect={() => alert(`Save`)} >
                        <Text style={{fontSize: 20}}>Copy</Text>
                    </MenuOption>
                    <MenuOption onSelect={onDeletePressed}>
                        <Text style={{color: 'red', fontSize: 20}}>Delete</Text>
                    </MenuOption>
                    
                </MenuOptions>
            </Menu>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
        marginBottom: 5,
    },
    text: {
        marginLeft: 5,
        fontSize: 20,
    },
    dropdown: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'absolute',
        right: 10,
    },
    dropDownOpts: {
        marginTop: -50,
    },
    press: {
        width: 50,
    },
    pressText: {
        textAlign: 'center',
        fontSize: 25,
    }
})