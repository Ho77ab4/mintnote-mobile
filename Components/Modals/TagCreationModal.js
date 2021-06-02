import React, {useState} from 'react'
import {Modal, View, Button, StyleSheet, Text, TextInput, TouchableOpacity, FlatList} from 'react-native'
import {Tag} from '../Tag'
import ColorPicker from 'react-native-wheel-color-picker'
import Firebase from '../../Firebase'

export class TagCreationModal extends React.Component {
    
    state = {
        name: '',
        color: '',
    }
    
    constructor(props) {
        super(props)
    }

    changeValueHanler = (e) => {
        //this.value = e
        this.setState({name: e})
    }

    pressHandler() {
        const tagObj = {name: this.state.name, color: this.state.color}
        const json = JSON.stringify(tagObj)
        console.log(json)
        fetch("https://mintnote-api.appspot.com/tags/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Firebase.token
            },
            body: json
        }).then(async res => {
            console.log(res.status)
        })
        this.props.addTag(this.state.name, this.state.color)
        this.props.setCreateTagModalVisible(!this.props.createTagModalVisible)
    }

    handleCancel() {
        this.props.setCreateTagModalVisible(!this.props.createTagModalVisible)
    }

    renderTag({item}) {
        return (
            <Tag name={item.name} color={"black"} onPress={pressHandler}/>
        )
    }

    colorCompleteHandler(e) {
        this.setState({color: e})
    }

    render() {
        return (
            <View>
                <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.createTagModalVisible}
                onRequestClose={() => {
                    this.props.setCreateTagModalVisible(!this.props.createTagModalVisible);
                }}
                >
                    <TouchableOpacity
                        onPressOut={() => { this.props.setCreateTagModalVisible(!this.props.createTagModalVisible) }}
                        style={styles.modalView}
                    >
                        <TouchableOpacity style={styles.modal} activeOpacity={1}>
                                    <Text>Введите название: </Text>
                                    <TextInput value={this.value} onChangeText={(v) => this.changeValueHanler(v)} style={styles.modalElem} autoFocus={true} placeholder="Название тега"/>
                                    <View style={{height: 400}}>
                                        <ColorPicker
                                            ref={(r) => this.picker = r}
                                            onColorChangeComplete={(e) => this.colorCompleteHandler(e)}
                                            thumbSize={40}
                                            sliderSize={40}
                                            noSnap={true}
                                            row={false}
                                        />
                                    </View>
                                    <View style={styles.buttonsView}>
                                        <View   View style={styles.button}>
                                            <Button title="OK" onPress={() => this.pressHandler()}/>
                                        </View>
                                        <View style={styles.button}>
                                            <Button color={'red'} title="Отменить" onPress={() => this.handleCancel()}/>
                                        </View>
                                    </View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }
}

// export const TagCreationModal = ({createTagModalVisible, setCreateTagModalVisible}) => {
//     const [value, setValue] = useState('')

//     const pressHandler = (name) => {
//         //chooseTag(name, title)
//         setCreateTagModalVisible(!createTagModalVisible)
//     }

//     const handleCancel = () => {
//         setCreateTagModalVisible(!createTagModalVisible)
//     }

//     const renderTag = ({item}) => {
//         return (
//             <Tag name={item.name} color={"black"} onPress={pressHandler}/>
//         )
//     }
    
//     return (
//         <View>
//         <Modal
//             animationType="fade"
//             transparent={true}
//             visible={createTagModalVisible}
//             onRequestClose={() => {
//                 setCreateTagModalVisible(!createTagModalVisible);
//             }}
//         >
//             <TouchableOpacity
//                 onPressOut={() => { setCreateTagModalVisible(!createTagModalVisible) }}
//                 style={styles.modalView}
//             >
//                 <TouchableOpacity style={styles.modal} activeOpacity={1}>
//                             <Text>Enter title: </Text>
//                             <TextInput onChangeText={setValue} value={value} style={styles.modalElem} autoFocus={true} placeholder="Tag name"/>
//                             <View style={[]}>
//                                 <ColorPicker
//                                     ref={r => { this.picker = r }}
//                                     color={this.state.currentColor}
//                                     swatchesOnly={this.state.swatchesOnly}
//                                     onColorChange={this.onColorChange}
//                                     onColorChangeComplete={this.onColorChangeComplete}
//                                     thumbSize={40}
//                                     sliderSize={40}
//                                     noSnap={true}
//                                     row={false}
//                                     swatchesLast={this.state.swatchesLast}
//                                     swatches={this.state.swatchesEnabled}
//                                     discrete={this.state.disc}
//                                 />
//                                 <SomeButton onPress={() => this.picker.revert()} />
//                             </View>
//                             <View style={styles.buttonsView}>
//                                 <View   View style={styles.button}>
//                                     <Button title="OK" onPress={pressHandler}/>
//                                 </View>
//                                 <View style={styles.button}>
//                                     <Button color={'red'} title="Cancel" onPress={handleCancel}/>
//                                 </View>
//                             </View>
//                 </TouchableOpacity>
//             </TouchableOpacity>
//         </Modal>
//         </View>
//     )
// }

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
        marginTop: 10
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