import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Other = () => {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "red" }}>
            <Text style={{ color: '#fff', fontSize: 22 }}>Other Screen</Text>
            <Button title='Go to Setting Screen' onPress={() => navigation.navigate('Settings')} />
        </View>
    )
}

export default Other

const styles = StyleSheet.create({})