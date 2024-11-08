import { Text, View, StyleSheet, FlatList, Modal, Pressable } from 'react-native'
import { useState, useEffect, useContext  } from 'react'
import { ListHeader } from '@/components/ListHeader'
import { ListItemSeperator } from '@/components/ListItemSeperator'
import { ItemPrototype }from '@/interfaces/ItemInterface'
import { FirestoreContext } from '@/contexts/FirestoreContext'
import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import { TextInput } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, Link } from 'expo-router'
import {collection, addDoc, getDocs} from '@firebase/firestore'

export default function List( props:any ){

    const db = useContext( FirestoreContext )
    const auth = useContext( AuthenticationContext )
    const navigation = useNavigation()
    //path to user data collection
    let userDataPath:  string = ''

    const[ datastate, setDatastate ] = useState<ItemPrototype | any>([])
    const[ ModalVisible, setModalVisible ] = useState<boolean>( false )
    const[ categoryName, setCategoryName ]= useState <string | undefined>()
    const[ dataLoaded, setDataLoaded ]= useState<boolean>(false)

    useEffect( ()  => {
        if( dataLoaded == false && auth.currentUser){   
            getNewCategory()
            setDataLoaded( true)
        }
    },[dataLoaded])
    //custom function to add item
    const addNewCategory = async () =>{
       // console.log( auth.currentUser.uid )
       const userid = auth.currentUser.uid
       if( userid ){
            const path = collection( db, `users/${auth.currentUser.uid}/documents`)
            const docRef = addDoc( path,{
                name: categoryName, status: false
            })
            setCategoryName('')
            setDataLoaded (false)
       }
    }

    const getNewCategory = async () => {
        if( auth.currentUser.uid){
            const path = collection(db, `users/${auth.currentUser.uid}/documents`)
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
            //navigate to itemDetails
            <Link href = {{
                pathname: '/detail',
                params: {id: item.id, name: item.name}
            }}>
                <View style = {styles.item}>
                    <Text>{ item.name }</Text>
                </View>
            </Link>
        )
    }

    return(
        <View>
            <Text>List View </Text>
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
                ItemSeparatorComponent={ ListItemSeperator }

            />
            {/*Modal to input data*/}
            <Modal visible={ ModalVisible }>
                <View style={ styles.container}>
                    <Text style={styles.title}>
                        Name of Item
                    </Text>
                    {/*input category name*/}
                    <TextInput
                        value = { categoryName }
                        onChangeText = {(val) => setCategoryName(val)}
                        style={styles.field}
                    />
                    {/*add to firebase database*/}
                    <View style={styles.modalBar}>
                        <Pressable
                            onPress = { () => {
                                addNewCategory()
                                setModalVisible( false )
                            } }
                            style={ styles.modalButton}
                        >
                        
                        <Text style={styles.buttonText}>Submit</Text>
                        </Pressable>
                        <Pressable
                             onPress = { () => setModalVisible(false) }
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
        minWidth: '99%',
        marginLeft: 2,
        height: 40,
        justifyContent: 'flex-start',

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
        //backgroundColor: "grey",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalInput:{
        backgroundColor: "white",
        padding: 8,
    },
    modalButton:{
        backgroundColor:"black",
        padding: 10,
        borderRadius: 4,
    },
    field:{
        backgroundColor: "#ebe7df",
        padding: 5,
        borderColor: "#0d0b06",
        borderWidth: 2,
        marginBottom: 20,
        borderRadius: 4,
    },
    title: {
        fontSize: 20,
        marginVertical: 5,
        fontWeight: '500'
    },

})