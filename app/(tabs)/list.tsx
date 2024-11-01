import { Text, View, StyleSheet, FlatList } from 'react-native'
import { useState, useEffect } from 'react'
import { ListHeader } from '@/components/ListHeader'

export default function List( props:any ){
    interface ItemPrototype{
        id: number,
        name: string,
        status: string,

    }
    const listData:ItemPrototype[] = [
        { id:1, name: "item 1", status: "in"},
        { id:2, name: "item 2", status: "in"},
        { id:3, name: "item 3", status: "in"},
        { id:4, name: "item 4", status: "in"},
    ]

    const[ datastate, setDatastate ] = useState<ItemPrototype | any>([])

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
            <FlatList 
                data = {datastate}
                renderItem={ renderItem }
                keyExtractor={item=> item.id}
                ListHeaderComponent={ <ListHeader text ="List Header"/> }

            />
        </View>
    )
}
const styles = StyleSheet.create({
    item: {
        padding: 12,
        backgroundColor: "pink",

    }
})