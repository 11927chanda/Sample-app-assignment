import { Text, View, StyleSheet, FlatList, Modal, Pressable } from 'react-native'
import { useLocalSearchParams, Link } from 'expo-router'
import { useContext, useEffect, useState } from 'react'
import { FirestoreContext} from '@/contexts/FirestoreContext'
import { doc, getDoc } from '@firebase/firestore'
import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import { onAuthStateChanged } from '@firebase/auth'

export default function DetailsScreen(props:any){
const[ loaded, setLoaded ] = useState(false)

const {id} = useLocalSearchParams()
const {name} = useLocalSearchParams()

const db = useContext( FirestoreContext )
const auth = useContext( AuthenticationContext )

const getDocument = async () =>{
    const ref = doc(db, `users/${auth.currentUser.uid}/documents`, id)
    const document = await getDoc( ref )
   
}

onAuthStateChanged(auth, (user) =>{
    if(user){
        getDocument()
    }
})
    return(
        <View style={ styles.container }>
            <View style={ styles.itemHeader }>
            <Text style={ styles.itemHeaderText }>Detail with {name}</Text>
            </View>
            <Text>Detail for documents with {name}</Text>
            <Link href = "/(tabs)/list">
            <Text>
                Go Back
            </Text>
            </Link>
        </View>
    )
    
}
const styles =StyleSheet.create({
    container:{
        flex: 1,
        padding:10,
    },
    itemHeader:{
        backgroundColor: "black",
        padding:10,
    },
    itemHeaderText:{
        fontSize:16,
        color: "white",
    },
})