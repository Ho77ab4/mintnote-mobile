import React, {useState} from 'react'
import { SafeAreaView, View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native'
import Firebase from '../Firebase'

export const LoginScreen = () => {
    const [toggle, setToggle] = useState('signup')

    const handleEmail = (e) => {
        console.log(e)
        Firebase.user.email = e;
    }

    const handlePassword = (e) => {
        console.log(e)
        Firebase.user.password = e;
    }

    function loggining() {
        if (Firebase.isLoggining === 'start') {
            return (
                <Text>Loggining...</Text>
            )
        } else if (Firebase.isLoggining === 'finish') {
            return (
                <Text>asd!</Text>
            )
        } 
    }

    const auth = () => {
        if (Firebase.user.email !== '' && Firebase.user.password !== '') {
            Firebase.init()
        } else {
            console.log('not all fields!')
        }
    }

    if (toggle === 'signup') {
        if (Firebase.user.isAuth) {
            return (<Text style={{fontSize: 20}}>Auth successful!</Text>)
        } else {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{borderWidth: 0.5, borderColor: '#191923', borderRadius: 15, paddingBottom: 15}}>
                <View style={styles.buttons}>
                    <TouchableOpacity 
                        style={{borderTopLeftRadius: 10, backgroundColor: "#88c5fd"}}
                    >
                        <Text style={{fontSize: 23, padding: 10, width: 150, color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => setToggle('login')}
                        style={{borderTopRightRadius: 10, backgroundColor: "#55D470", alignContent: 'center'}}
                    >
                        <Text style={{fontSize: 23, padding: 10, width: 150, color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Log In</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.main}>
                    <Text style={styles.textes}>Email</Text>
                    <TextInput style={styles.textInput} placeholder={"Enter your email"} onChangeText={handleEmail} />
                    <Text style={styles.textes}>Password</Text>
                    <TextInput style={styles.textInput} placeholder={"Enter your password"} secureTextEntry={true} onChangeText={handlePassword} />
                    <View style={{width: 100, paddingLeft: 11}}>
                        <Button title="Log In" onPress={auth} />
                    </View>
                    {loggining()}
                </View>
                </View>
            </SafeAreaView>
        )
        }
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{borderWidth: 0.5, borderColor: '#191923', borderRadius: 15, paddingBottom: 15, alignItems: 'center'}}>
                <View style={styles.buttons}>
                    <TouchableOpacity 
                        onPress={() => setToggle('signup')}
                        style={{borderTopLeftRadius: 10, backgroundColor: "#4193DF"}}
                    >
                        <Text style={{fontSize: 23, padding: 10, width: 150, color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{borderTopRightRadius: 10, backgroundColor: "#87e39b", alignContent: 'center'}}
                    >
                        <Text style={{fontSize: 23, padding: 10, width: 150, color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Log In</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.main}>
                    <Text style={styles.textes}>Email</Text>
                    <TextInput style={styles.textInput} placeholder={"Enter your email"} />
                    <Text style={styles.textes}>Password</Text>
                    <TextInput style={styles.textInput} placeholder={"Enter your password"} secureTextEntry={true}/>
                </View>
                <View style={{borderBottomWidth: 1, borderBottomColor: 'gray', width: 250}}></View>
                <Text style={{marginRight: 200, margin: 15, fontSize: 18}}>Log in with:</Text>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FAFAFA"
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        margin: 0,
    },
    main: {
        marginLeft: 0,
    }, 
    textes: {
        margin: 10,
        fontSize: 18
    },
    textInput: {
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        fontSize: 18
    }
})

