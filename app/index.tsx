import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'

export default function AuthenticationScreen(){
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState ('')
    //validating password
    const [validPassword, setValidPassword ] = useState( false )

    useEffect( () => {
        if( password.length < 8 ){
            setValidPassword( true )
        }
        else{
            setValidPassword( false )
        }
    },[password])


  return (
    <View style={ styles.container }>
        <Text style ={ styles.title }> Authentication </Text>
        {/* email address */}
        <Text style ={ styles.label }>Email address</Text>
        <TextInput
         style ={ styles.field }
         value={ email }
         onChangeText={ ( txt ) => setEmail( txt )}
         placeholder= 'email@example.com'
         />

        {/* password */}
        <Text style ={ styles.label }>Password</Text>
        <TextInput
        style ={ (validPassword == true ) ? styles.validField: styles.field }
        secureTextEntry={ true } 
        value={ password }
         onChangeText={ ( txt ) => setPassword( txt )}
         placeholder= 'min 8 characters'
        />
        <Pressable style ={ styles.button }>
            <Text style ={ styles.buttonText }>Login</Text>
        </Pressable>
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
})