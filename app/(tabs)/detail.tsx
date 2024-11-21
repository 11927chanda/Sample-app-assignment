import { Text, View, StyleSheet, FlatList, Modal, Pressable, Switch } from 'react-native'
import { useLocalSearchParams, Link, useNavigation } from 'expo-router'
import { useContext, useEffect, useState } from 'react'
import { FirestoreContext} from '@/contexts/FirestoreContext'
import { doc, getDoc } from '@firebase/firestore'
import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import { onAuthStateChanged } from '@firebase/auth'
import { ItemPrototype } from '@/interfaces/ItemInterface'
import { TextInput } from 'react-native-gesture-handler'

export default function DetailsScreen(props:any){

    const [ documentData, setdocumentData ] = useState<ItemPrototype | any>()
    const [docName, setDocName ]= useState<string>('')
    const [ docStatus, setDocStatus ] = useState<boolean>(false)

    let dataLoaded = false
    let edited = false

    
 //access navigation object via hook
 const navigation = useNavigation()
 //set screen options
 useEffect( () => {
    navigation.setOptions({ headerShown:true})
 }, [navigation]) 

const {id} = useLocalSearchParams()
const {name} = useLocalSearchParams()

const db = useContext( FirestoreContext )
const auth = useContext( AuthenticationContext )

const getDocument = async () =>{
    const ref = doc(db, `users/${auth.currentUser.uid}/documents`, id)
    const document = await getDoc( ref )
    let data:ItemPrototype |any = document.data()
    data.id = id
    setdocumentData(data)
    setDocName(data.name)
    setDocStatus(data.status)
    dataLoaded = true

    
}
useEffect(() => {
    console.log('auth')
    if(!dataLoaded){
        getDocument()
    }
}, [auth.currentUser])


// onAuthStateChanged(auth, (user) =>{

//     if(user){
//         getDocument()
//     }
// })
if(!documentData){
    return null
}
else{
    return(
        <View style ={styles.page}>
            <View style={ styles.itemHeader }>
                <Text style={ styles.itemHeaderText }>Detail for {name}</Text>
                </View>
            <View style={ styles.container }>
                <Text>Document name</Text>
                <TextInput 
                    value ={ docName } 
                    onChangeText={(val) => {
                        setDocName(val)
                        edited = true
                        }
                    }
                />
                <Text> Document status</Text>
                <Switch 
                    value ={docStatus}
                     onValueChange={
                        () =>{ (docStatus) ? setDocStatus(false): setDocStatus(true)
                            edited = true
                        }
                     }
                />
                <Pressable>
                    <Text> save changes?</Text>
                </Pressable>


            </View>
            <Link href = "/(tabs)/list">
                <Text>
                    Go Back
                </Text>
                </Link>
                
        </View>
    )
}
    
    
}
const styles =StyleSheet.create({
    page: {
        flex:1,
    },
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