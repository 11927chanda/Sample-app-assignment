import { Text, View, StyleSheet, FlatList, Modal, Pressable } from 'react-native'
import { useState, useEffect, useContext  } from 'react'
import { ListHeader } from '@/components/ListHeader'
import { ItemPrototype }from '@/interfaces/ItemInterface'
import { FirestoreContext } from '@/contexts/FirestoreContext'
import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import { TextInput } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'

export default function List( props:any ){

    const db = useContext( FirestoreContext )
    const auth = useContext( AuthenticationContext )
    
    const listData:ItemPrototype[] = [
        { id:1, name: "item 1", status: "in"},
        { id:2, name: "item 2", status: "in"},
        { id:3, name: "item 3", status: "in"},
        { id:4, name: "item 4", status: "in"},
    ]

    const[ datastate, setDatastate ] = useState<ItemPrototype | any>([])
    const[ ModalVisible, setModalVisible ] = useState<boolean>( false )
    const[ categoryName, setCategoryName ]= useState <string | undefined>()

    useEffect( ()  => {
        if( datastate.length == 0){
            setDatastate( listData )
        }
    })

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
                <Text style={styles.buttonText}>
                    <Ionicons name = "add-outline" size={20}/>
                    Add Data</Text>
            </Pressable>
            <FlatList 
                data = {datastate}
                renderItem={ renderItem }
                keyExtractor={item=> item.id}
                ListHeaderComponent={ <ListHeader text ="List Header"/> }

            />
            //Modal to input data
            <Modal visible={ ModalVisible }>
                <View>
                    <Text>
                        Name of Item
                    </Text>
                    //input category name
                    <TextInput
                        value = { categoryName }
                        onChangeText = {(val) => setCategoryName(val)}
                    />
                    //add to firebase database
                    <Pressable>
                        <Text>Submit</Text>
                    </Pressable>
                    <Pressable onPress = { () => setModalVisible(false) }>
                        <Text>Cancel</Text>
                    </Pressable>
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

    },
    buttonText: {
        padding: 10,
        backgroundColor: "white",

    }

})