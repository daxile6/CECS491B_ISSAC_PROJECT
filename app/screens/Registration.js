import {View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import React, {useState} from 'react'
import {firebase} from './config'

const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    registerUser = async (email, password, firstName, lastName) => {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url: 'https://b-finaldatabase.firebaseapp.com',
            })
            .then(() => {
                alert('Verification email sent')
            }).catch((error) => {
                alert(error.message)
            })
            .then(() => {
                firebase.firestore().collection('users')
                .doc(firebase.auth().currentUser.uid)
                .set({
                    firstName,
                    lastName,
                    email,
                })
            })
            .catch((error) => {
                alert(error.message)
            })
        })
        .catch((error => {
            alert(error.message)
        }))
    } 
    return (
        <View style={styles.container}>
            <Text style={{fontWeight:'bold', 'fontSize': 30, color:'#fff'}}>
                Register Here!
            </Text>
            <View style={{marginTop:40}}>
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff', marginBottom: 5 }}>First Name</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter First Name"
                    onChangeText={(firstName) => setFirstName(firstName)}
                    autoCorrect={false}
                    placeholderTextColor="#808080"
                    color="#fff"
                    />
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff', marginBottom: 5 }}>Last Name</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter Last Name"
                    onChangeText={(lastName) => setLastName(lastName)}
                    autoCorrect={false}
                    placeholderTextColor="#808080"
                    color="#fff"
                    />
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff', marginBottom: 5 }}>Email</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter Email"
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    placeholderTextColor="#808080"
                    color="#fff"
                    />
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff', marginBottom: 5 }}>Password</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter Password"
                    onChangeText={(password) => setPassword(password)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    placeholderTextColor="#808080"
                    color="#fff"
                    />
                
            </View>
            <TouchableOpacity
                onPress={() => registerUser(email, password, firstName, lastName)}
                style={styles.button}
            >
                    <Text style={{fontWeight:'bold', fontSize:22, color:'#fff'}}>Register</Text>
                </TouchableOpacity>

        </View>
    )
}

export default Registration

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        paddingTop:100,
        backgroundColor: '#000'
    },
    textInput: {
        paddingTop:10,
        paddingBottom:10,
        width:255,
        fontSize:20,
        //borderBottomWidth:1,
        //borderBottomColor: '#000',
        marginBottom:10,
        textAlign: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 10,
    },
    button:{
        marginTop:50,
        height:70,
        width:250,
        backgroundColor:'#145369',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
    },

})