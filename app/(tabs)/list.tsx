import { Text, View, StyleSheet, FlatList, Modal, Pressable } from 'react-native'
import { useState, useEffect, useContext  } from 'react'
import { ListHeader } from '@/components/ListHeader'
import { ItemPrototype }from '@/interfaces/ItemInterface'
import { FirestoreContext } from '@/contexts/FirestoreContext'
import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import { TextInput } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import {collection, addDoc, getDocs} from '@firebase/firestore'

export default function List( props:any ){

    const db = useContext( FirestoreContext )
    const auth = useContext( AuthenticationContext )
    //path to user data collection
    const userDataPath = `users/${auth.currentUser.uid}/documents`

    const[ datastate, setDatastate ] = useState<ItemPrototype | any>([])
    const[ ModalVisible, setModalVisible ] = useState<boolean>( false )
    const[ categoryName, setCategoryName ]= useState <string | undefined>()
    const[ dataLoaded, setDataLoaded ]= useState(false)

    useEffect( ()  => {
        if( dataLoaded == false){
            getNewCategory()
            setDataLoaded( true)
        }
    },[dataLoaded])
    //custom function to add item
    const addNewCategory = async () =>{
       // console.log( auth.currentUser.uid )
       const userid = auth.currentUser.uid
       if( userid ){
            const path = collection( db, userDataPath)
            const docRef = addDoc( path,{
                name: categoryName, status: false
            })
            setCategoryName('')
            setDataLoaded (false)
       }
    }

    const getNewCategory = async () => {
        if( auth.currentUser.uid){
            const path = collection(db, userDataPath)
            const querySnapshot = await getDocs(path)
            let userData:ItemPrototype[] = []
            querySnapshot.forEach((userDocument) =>{
                let document:any = userDocument.data()
                document.id = userDocument.id
                userData.push(document)
            })
            setDatastate( userData )
        }

    }

    const renderItem = ({item}:any) =>{
        return(
            <View style = {styles.item}>
                <Text>{ item.name }</Text>
            </View>
        )

    }

    return(
        <View>
            <Text>List View Grid</Text>
            <Pressable 
                style={styles.button}
                onPress={ () => setModalVisible(true)}
            >
                <Ionicons style ={styles.buttonText} name = "add-outline" size={20}/>
                <Text style={styles.buttonText}>
                    Add Data
                </Text>
            </Pressable>
            <FlatList 
                data = { datastate }
                renderItem={ renderItem }
                keyExtractor={item=> item.id}
                ListHeaderComponent={ <ListHeader text ="List Header"/> }

            />
            {/*Modal to input data*/}
            <Modal visible={ ModalVisible }>
                <View style={ styles.container}>
                    <Text>
                        Name of Item
                    </Text>
                    {/*input category name*/}
                    <TextInput
                        value = { categoryName }
                        onChangeText = {(val) => setCategoryName(val)}
                    />
                    {/*add to firebase database*/}
                    <View style={styles.modalBar}>
                        <Pressable
                            onPress = { () => {addNewCategory()
                                setModalVisible( false )
                            } }
                            style={ styles.modalButton}
                        >
                        
                        <Text style={styles.buttonText}>Submit</Text>
                        </Pressable>
                        <Pressable onPress = { () => setModalVisible(false) }
                             style={ styles.modalButton}    
                        >
                            <Text style={styles.buttonText}>Cancel</Text>

                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    item: {
        padding: 12,
        backgroundColor: "pink",

    },

    button: {
        padding: 10,
        backgroundColor: "black",
        flexDirection: "row",
        gap: 10,

    },
    buttonText: {
        padding: 10,
        color: "white",

    },
    container:{
        flex:1,
        paddingHorizontal: 10,
        backgroundColor: "pink",
    },
    modalBar:{
        backgroundColor: "grey",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalInput:{
        backgroundColor: "white",
        padding: 8,
    },
    modalButton:{
        padding: 10,
    }

})