import React, {useState} from 'react'
import {Modal, View, Button, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native'
import { Provider, Menu } from 'react-native-paper'

export const CreateElementModal = ({modalAddVisible, setModalAddVisible, addNote}) => {
    const [value, setValue] = useState('')
    const [type, setType] = useState('Note')

    const [menuVisible, setMenuVisible] = useState(false)

    const openMenu = () => setMenuVisible(true)
    const closeMenu = () => setMenuVisible(false)

    const pressHandler = () => {
        if (value.trim() !== "") {
            addNote(value, type)
            setValue('')
            setModalAddVisible(!modalAddVisible)
        } else {
            setValue('')
            setModalAddVisible(!modalAddVisible)
        }
    }

    const handleCancel = () => {
        setValue('')
        setModalAddVisible(!modalAddVisible)
    }
    
    return (
        <View style={{color: 'red'}}>
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalAddVisible}
            onRequestClose={() => {
                setModalAddVisible(!modalAddVisible);
            }}
        >
            <TouchableOpacity
                onPressOut={() => { setModalAddVisible(!modalAddVisible) }}
                style={styles.modalView}
            >
                <TouchableOpacity style={styles.modal} activeOpacity={1}>
                            <Text style={styles.modalElem}>Enter title:</Text>
                            <TextInput onChangeText={setValue} value={value} style={styles.modalElem} autoFocus={true} placeholder="Title"/>
                            <Text style={styles.modalElem}>Choose type:</Text>
                            <Provider statusBarHeight={10}>
                                <Menu
                                    visible={menuVisible}
                                    onDismiss={closeMenu}
                                    anchor={<Text style={styles.modalElem} onPress={openMenu}>{type}</Text>}
                                >
                                    <Menu.Item 
                                        onPress={() => {
                                            setType("Note")
                                            closeMenu()
                                        }} 
                                        title="Note" />
                                    <Menu.Item 
                                        onPress={() => {
                                            setType("Directory")
                                            closeMenu()
                                        }} 
                                        title="Directory" />
                                </Menu>
                            </Provider>
                            <View style={styles.buttonsView}>
                                <View style={styles.button}>
                                    <Button title="OK" onPress={pressHandler} />
                                </View>
                                <View style={styles.button}>
                                    <Button title="Cancel" onPress={handleCancel}/>
                                </View>
                            </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        minWidth: 350,
    }, 
    modalElem: {
        marginBottom: 5,
        height: 35,
        fontSize: 18,
    },
    buttonsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }, 
    button: {
        margin: 5,
    },
    dropDownOpts: {
        borderRadius: 5,
    },
    press: {
        width: 50,
    },
    pressText: {
        textAlign: 'center',
    },
    dropdown: {
        position: 'absolute',
        right: 10,
    },
    provider: {
        height: 0,
    }
})