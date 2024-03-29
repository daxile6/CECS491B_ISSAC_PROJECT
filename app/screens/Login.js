import {View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import {firebase} from './config'

const Login = () => {
    /* Values to store the functions current state*/
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    /* Function that awaits for autentication from firebase*/
    loginUser = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
        }
        catch (error){
            alert(error.message)
        }
    }

    /* Function in case the user forgets their password*/
    const forgetPassword = () => {
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert("Password reset email sent")
        }).catch((error) => {
            alert(error)
        })
    }
    /* Returns the screen that shows the users the login page*/
    return (
        <View style={styles.container}>
            <Text style={{fontWeight:'bold', fontSize:45, color:'#fff'}}> 
            Login
            </Text> 
            <View style={{marginTop:40}}>
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff', marginBottom: 5 } }>Email</Text>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Enter Email"
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="#808080"
                    color="#fff"
                    
                />
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff',marginBottom:5 }}>Password</Text>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Enter Password"
                    onChangeText={(password) => setPassword(password)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="#808080"
                    color="#fff"
                    secureTextEntry={true}
                    
                />
            </View>
            {/* Button to log in */}
            <TouchableOpacity onPress={() => loginUser(email, password)}
                style={styles.button}>
                
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            {/* Button to register for an account */}
            <TouchableOpacity  onPress={() => navigation.navigate('Registration')}
                style={{marginTop:20}}>
               
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fff'}}>Don't have an account? Register Now</Text>
            </TouchableOpacity>
            {/* button in case the user forgets their password */}
            <TouchableOpacity  onPress={() => {forgetPassword()}}
                style={{marginTop:20}}>
               
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fff'}}>Forget Password?</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login


/* Style sheet that styles all the button and features of the login page*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        paddingTop:100,
        backgroundColor:'#000',
        
    },
    textInput: {
        paddingTop:10,
        paddingBottom:10,
        width:255,
        fontSize:20,
        //borderBottomWidth:1,
        ///borderBottomColor: '#FFF',
        marginBottom:10,
        textAlign: 'center',
        borderWidth:2,
        borderColor: '#FFF',
        borderRadius: 10,
    },
    button:{
        marginTop:50,
        height:70,
        width:250,
        backgroundColor:'#145369',
        //#8e05c2
        //#9fc5e8
        
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,


    },
    buttonText:{
        color:'#fff',
        fontWeight: 'bold', 
        fontSize: 22

    }

    

})