import React, {useState, useContext, useEffect } from 'react'
import {SafeAreaView, StyleSheet, Pressable, Image, FlatList } from 'react-native'
import { CreateElementModal } from '../Components/Modals/CreateElementModal'
import Plus from '../Images/Plus.png'
import { Directory } from '../Components/Directory'
import { Note } from '../Components/Note'
import { Context } from '../Context'
import { TagsModal } from '../Components/Modals/TagsModal'
import Firebase from '../Firebase'

export const DirectoriesNavigationScreen = ({navigation, route}) => {
    const [modalAddVisible, setModalAddVisible] = useState(false)
    const [modalTagsVisible, setModalTagsVisible] = useState(false)
    const [tags, setTags] = useState([])
    const [tagAddingElement, setTagAddingElement] = useState('')

    useEffect(() => {
        fetch("https://mintnote-api.appspot.com/tags/", {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + Firebase.token
            }
        })
        .then(async (res) => {
            const data = await res.json()
            setTags(data)
            console.log(data)
        })
    }, [])

    const { fetchedDirectories, setFetchedDirectories } = useContext(Context);
    const { parent } = route.params;

    const [screenDirectories, setScreenDirectories] = useState(fetchedDirectories.filter(item => item.parent === parent));

    const actionWithNote = (name, action) => {
        if (action === "Delete") {
            fetchedDirectories.map(item => {
                if (item.name === name) {
                    fetch("https://mintnote-api.appspot.com/notes/+"+item.id+"/", {
                        method: "DELETE",
                        headers: {
                            'Authorization': 'Bearer ' + Firebase.token
                        }
                    })
                    .then(async (res) => {
                        const data = await res.json()
                        console.log(data)
                    })
                }
            })
            setFetchedDirectories(prev => prev.filter(item => item.name !== name))
            setScreenDirectories(prev => prev.filter(item => item.name !== name))
        } else if (action == "Copy") {
            // copy
        } else if (action == "Tags") {
            setTagAddingElement(name)
            setModalTagsVisible(true)
        }
    }

    const chooseTag = (tagName, elementName, color) => {
        const tag = {name: tagName, color: color}
        screenDirectories.map(item => {
            if (item.name === elementName && !item.tags.includes(tag)) {
                var isFounded = false
                item.tags.map(tagItem => {
                    if (tagItem.name === tag.name) {
                        isFounded = true
                        return;
                    }
                })
                if (!isFounded) {
                    item.tags.push(tag)
                    const jsonTags = JSON.stringify(item.tags)
                    console.log(jsonTags);
                    fetch("https://mintnote-api.appspot.com/notes/"+item.id+"/tags/", {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + Firebase.token
                        },
                        body: jsonTags
                    }).then(async res => {
                        console.log(res.status)
                    })
                }
            }
        })
        fetchedDirectories.map(item => {
            if (item.name === elementName && !item.tags.includes(tag)) {
                var isFounded = false
                item.tags.map(tagItem => {
                    if (tagItem.name === tag.name) {
                        isFounded = true
                        return;
                    }
                })
                if (!isFounded) {
                    item.tags.push(tag)
                }
            }
        })
    }

    const addNote = (title, type) => {
        if (type === "Note") {
            fetch("https://mintnote-api.appspot.com/notes/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Firebase.token
                },
                body: JSON.stringify({
                    name: title,
                    icon: '',
                    tags: [],
                    creationDate: Date.now().toString() ,
                    lastModifiedDate: Date.now().toString(),
                    parent: parent,
                    content: '', 
                })
            })
            .then(async (res) => {
                const data = await res.status
                console.log(data)
            })
            setFetchedDirectories(prev => [
                ...prev,
                {
                    name: title,
                    icon: '',
                    tags: [],
                    creationDate: Date.now().toString() ,
                    lastModifiedDate: Date.now().toString(),
                    parent: parent,
                    id: '', 
                    content: '', 
                    userId: ''
                }
            ])
            setScreenDirectories(prev => [
                ...prev,
                {
                    name: title,
                    icon: '',
                    tags: [],
                    creationDate: Date.now().toString() ,
                    lastModifiedDate: Date.now().toString(),
                    parent: parent,
                    id: '', 
                    content: '', 
                    userId: ''
                }
            ])
        } else if (type === "Directory") {
            fetch("https://mintnote-api.appspot.com/directories/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Firebase.token
                },
                body: JSON.stringify({
                    name: title,
                    icon: '',
                    tags: [],
                    creationDate: Date.now().toString() ,
                    lastModifiedDate: Date.now().toString(),
                    parent: parent, 
                })
            })
            .then(async (res) => {
                const data = await res.status
                console.log(data)
            })
            setFetchedDirectories(prev => [
                ...prev,
                {
                    name: title,
                    icon: '',
                    tags: [],
                    creationDate: Date.now().toString() ,
                    lastModifiedDate: Date.now().toString(),
                    parent: parent,
                }
            ])
            setScreenDirectories(prev => [
                ...prev,
                {
                    name: title,
                    icon: '',
                    tags: [],
                    creationDate: Date.now().toString() ,
                    lastModifiedDate: Date.now().toString(),
                    parent: parent,
                }
            ])
        }
    }

    const renderItem = ({item}) => {
            if (Object.keys(item).includes('content'))  {
                return (
                    <Note
                        title={item.name}
                        tags={item.tags}
                        action={actionWithNote}
                        onPress={() => {
                            navigation.navigate('Redactor', {editingItem: item});
                        }}
                    />
                )
            } else {
                return (
                    <Directory 
                        title={item.name}
                        tags={item.tags}
                        action={actionWithNote}
                        onPress={() => {
                            navigation.push('Main', {directoryName: item.name, parent: item.name})
                        }} 
                    />
                )
            }
        
    }

    return (
        <SafeAreaView style={styles.container}>
            <CreateElementModal 
                modalAddVisible={modalAddVisible} 
                setModalAddVisible={setModalAddVisible} 
                addNote={addNote}
            />
            <TagsModal 
                modalTagsVisible={modalTagsVisible} 
                setModalTagsVisible={setModalTagsVisible} 
                chooseTag={chooseTag} 
                title={tagAddingElement} 
                tags={tags}
            />
            <FlatList 
                data={screenDirectories}
                renderItem={renderItem}
                keyExtractor={item => item.name}
            />
            <Pressable style={styles.buttonPlus} onPress={() => setModalAddVisible(true)}>
                <Image source={Plus} style={styles.plus}/>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        width: 100,
    },
    plus: {
        width: 60, 
        height: 60,
    },
    buttonPlus: {
        position: 'absolute',
        right: 7,
        bottom: 7,
    },
})

