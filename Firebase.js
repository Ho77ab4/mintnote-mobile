import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyADF0SacbO7c_gOCaVIgrK2d1HMz_Q0HOA",
    authDomain: "mintnote-api.firebaseapp.com",
    projectId: "mintnote-api",
    storageBucket: "mintnote-api.appspot.com",
    messagingSenderId: "1023487559915",
    appId: "1:1023487559915:web:389cc791478f3e4031d6ae",
    measurementId: "G-SW292DGV7G"
}

export default class Firebase {
    static user = {
        email: '',
        password: '',
        isAuth: false
    }
    static isLoggining = 'none'
    static token = ''
// "abc@gmail.com", "123456"
    static init() {
        firebase.initializeApp(firebaseConfig)
        firebase.auth()
            .signInWithEmailAndPassword("abc@gmail.com", "123456")
            .then((userInfo) => {
                if (userInfo.user) {
                    this.isLoggining = 'start'
                    this.user.isAuth = true
                    userInfo.user.getIdToken(true).then((idToken) => {
                        console.log(idToken)
                        this.token = idToken
                    })
                } else {
                    console.log('not auth')
                }
            })
            .catch((error) => {
                console.log(error.code, error.message)
            })
            .finally(() => this.isLoggining = 'finish')
    }
}