import firebase from 'firebase'

// firebaseConfig

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
