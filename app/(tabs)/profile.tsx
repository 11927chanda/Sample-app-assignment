import { View, Text, StyleSheet, Image, Pressable,  } from 'react-native'
import { useContext,useState } from 'react'
import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import {onAuthStateChanged, signOut} from '@firebase/auth'
import { useNavigation, router} from 'expo-router'

export default function ProfileScreen () {
    const[ currentUser, setCurrentUser ] = useState<any | null>()
    const fbauth = useContext( AuthenticationContext )
    const navigation = useNavigation()

    onAuthStateChanged( fbauth, (user:any | null) => {
        if(user){
            //user is signed in
            setCurrentUser(user)
            console.log(user)
        }
        else{
            //user is not signed in
            setCurrentUser(null)
            console.log("signed out!!")
           router.replace("../")//homepage
        }
    })

    //sign user out of firebase
    const SignOutUser = () =>{
        signOut(fbauth)
        .then(()=>{
            //signout successfully
        })
        .catch(()=>{
            //error occured
        })
    }

    return (
        <View>
            <Text> Profile Screen</Text>
            <Pressable onPress={ ()=> SignOutUser()}>
                <Text>
                    Sign Out
                </Text>
            </Pressable>
        </View>
    );
}