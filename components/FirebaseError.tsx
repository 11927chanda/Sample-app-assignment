import { Text, View, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'

export function FirebaseError( props:any ){
    
    const[ message, setMessage ] = useState('')

    if( props.error ){
        console.log( props.error)
    }
    return(
        <View>
            <Text>{message}</Text>
        </View>
    )
}