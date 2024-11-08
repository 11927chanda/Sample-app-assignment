import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native'
import { useState, useEffect, useContext } from 'react'
import { CheckMark } from '@/components/CheckMark'
import { FirebaseError } from '@/components/FirebaseError'
import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import { createUserWithEmailAndPassword, onAuthStateChanged } from '@firebase/auth'
import { Link, router } from 'expo-router'



export default function AuthenticationScreen(){
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState ('')
    //validating password
    const [validPassword, setValidPassword ] = useState( false )
    const [ validEmail, setValidEmail ] = useState (false)
    const [ error, setError ]= useState('')

    const fbauth = useContext( AuthenticationContext )
   
    //to sign up the new user
    const SignUpUser = () => {
        createUserWithEmailAndPassword( fbauth, email, password )
        //.then((user) => console.log(user))
        .then((user) => {
            router.navigate("/(tabs)")
        })
        .catch((error) => console.log(error))
    }

    useEffect( () => {
        if( password.length > 7 ){
            setValidPassword( true )
        }
        else{
            setValidPassword( false )
        }
    },[password])

    useEffect(() => {
        if(
            email.includes('@')&&
            email.includes('.')&&
            email.indexOf('@')> 0
        )
        {
            setValidEmail( true )
        }
        else{
            setValidEmail( false )
        }
    },[email])

    onAuthStateChanged( fbauth, ( user) => {
        if(user){
            //user is currently authenticated
            //redirect user
            router.navigate("/(tabs)")
        }
        else{
            //user is not authenticated

        }
    })

  return (
    <View style={ styles.container }>
        <Text style ={ styles.title }> Sign up for an account </Text>
        {/* email address */}
        <Text style ={ styles.label }>
            Email address
            <CheckMark show ={ validEmail }/>
            </Text>
        <TextInput
         style ={ styles.field }
         value={ email }
         onChangeText={ ( txt ) => setEmail( txt )}
         placeholder= 'email@example.com'
         />

        {/* password */}
        <Text style ={ styles.label }>
            Password
            <CheckMark show ={ validPassword }/>
        </Text>

        <TextInput
        style ={ (validPassword == true ) ? styles.validField: styles.field }
        secureTextEntry={ true } 
        value={ password }
         onChangeText={ ( txt ) => setPassword( txt )}
         placeholder= 'min 8 characters'
        />
        <Pressable
             style ={ (validEmail && validPassword) ? styles.button : styles.buttonDisabled}
             disabled = {(validEmail && validPassword) ? false : true }
             onPress={ () =>SignUpUser() }
             >
            <Text style ={ styles.buttonText }>Sign Up</Text>
        </Pressable>
        <Link href ="/login">
        <Text>Go to sign in page</Text></Link>
        <FirebaseError error= { error }/>
    </View>
  )  
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30,
        marginTop: 100,
        backgroundColor: "#a19b8f",
        padding: 10,
    },
    title: {
        fontSize: 20,
        marginVertical: 20,
    },


    label: {
        fontSize: 16
    },
    field:{
        backgroundColor: "#ebe7df",
        padding: 5,
        borderColor: "#0d0b06",
        borderWidth: 2,
        marginBottom: 20,
        borderRadius: 4,
    },
    validField: {
        backgroundColor: "#ebe7df",
        padding: 5,
        borderColor: "#ed0505",
        borderWidth: 2,
        marginBottom: 20,
        borderRadius: 4,

    },
    button:{
        backgroundColor: "#9e7409",
        padding: 8,

    },
    buttonText:{
        color: "#080807",
        textAlign: "center",
        fontSize: 16
    },
    buttonDisabled:{
        backgroundColor: "#ccc3b1",
        padding: 8,
    }
   
})