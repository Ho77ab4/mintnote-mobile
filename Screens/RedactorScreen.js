import React, {useState, useContext, useEffect} from 'react'
import { SafeAreaView, Text, StyleSheet } from 'react-native'
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import { Context } from '../Context'
import ImagePicker from 'react-native-image-crop-picker'
import Firebase from '../Firebase'

export class RedactorScreen extends React.Component {
    static reductedNote = {}
    static contextType = Context

    componentDidMount() {
        //this.timer = setInterval(() => this.putNewContent(), 1000)
        this.getNoteById()
    }

    componentDidUpdate() {
        this.getNoteById()
    }

    getNoteById() {
        fetch("https://mintnote-api.appspot.com/notes/"+this.props.route.params.editingItem.id+"/", {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + Firebase.token
            }
        })
        .then(async (res) => {
            const data = await res.json()
            reductedNote = data
            console.log(reductedNote)
        })
    }

    AddImageHandle() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image)
        })
    }

    contentChangeHandler(r) {
        fetch("https://mintnote-api.appspot.com/notes/"+reductedNote.id+"/content/", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Firebase.token
            },
            body: r
        }).then(async res => {
            console.log(res.status)
        })
    }

    setStart(r) {
        r.setContentHTML(this.props.route.params.editingItem.content)
    }

    render() {
        return (
            <SafeAreaView>
                <Text style={{fontSize: 20, fontWeight: 'bold', margin: 5}}>{this.props.route.params.editingItem.name}</Text>
                <RichToolbar 
                    getEditor={() => this.richText} 
                    actions={[
                        actions.insertImage,
                        actions.setBold,
                        actions.setItalic,
                        actions.insertBulletsList,
                        actions.insertOrderedList,
                        actions.insertLink,
                        actions.keyboard,
                        actions.setStrikethrough,
                        actions.setUnderline,
                        actions.removeFormat,
                        actions.insertVideo,
                        actions.checkboxList,
                        actions.undo,
                        actions.redo,
                    ]}
                    onPressAddImage={this.AddImageHandle}
                    selectedIconTint={"#ff0000"}
                />
                <RichEditor 
                    ref={(r) => this.richText = r}
                    onLoadEnd={() => this.setStart(this.richText)}
                    onFocus={() => this.setStart(this.richText)}
                    contentMode={'mobile'}
                    onChange={(text) => this.contentChangeHandler(text)}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})

