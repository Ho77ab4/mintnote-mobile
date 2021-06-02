import React, {useState} from 'react'
import {Modal, View, Button, StyleSheet, Text, TextInput, TouchableOpacity, FlatList} from 'react-native'
import {Tag} from '../Tag'
import {TagCreationModal} from './TagCreationModal'

export const TagsModal = ({title, modalTagsVisible, setModalTagsVisible, chooseTag, tags}) => {
    const [createTagModalVisible, setCreateTagModalVisible] = useState(false)

    const pressHandler = (name, color) => {
        chooseTag(name, title, color)
        setModalTagsVisible(!modalTagsVisible)
    }

    const handleCancel = () => {
        setModalTagsVisible(!modalTagsVisible)
    }

    const renderTag = ({item}) => {
        return (
            <Tag name={item.name} color={item.color} onPress={pressHandler}/>
        )
    }
    
    const addTag = (name, color) => {
        tags.push({name: name, color: color})
    }
    
    return (
        <View>
        <TagCreationModal createTagModalVisible={createTagModalVisible} setCreateTagModalVisible={setCreateTagModalVisible} addTag={addTag}/>
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalTagsVisible}
            onRequestClose={() => {
                setModalTagsVisible(!modalTagsVisible);
            }}
        >
            <TouchableOpacity
                onPressOut={() => { setModalTagsVisible(!modalTagsVisible) }}
                style={styles.modalView}
            >
                <TouchableOpacity style={styles.modal} activeOpacity={1}>
                            
                            <View style={styles.buttonsView}>
                                <Text style={styles.modalElem}>Выберите тег:</Text>
                                <View style={styles.button}>
                                    <Button color={"#4193DF"} title="Создать" onPress={() => setCreateTagModalVisible(true)}/>
                                </View>
                            </View>
                            <FlatList
                                data={tags}
                                keyExtractor={item => item.name}
                                renderItem={renderTag}
                            />
                            <View style={styles.buttonsView}>
                                <View style={styles.button}>
                                    <Button color={'red'} title="Отменить" onPress={handleCancel}/>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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
        marginTop: 10,
        borderRadius: 10
    }, 
    tag: {
        margin: 5,
        color: '#192459'
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