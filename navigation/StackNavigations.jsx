import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screen/HomeScreen';
import AddProductScreen from '../screen/AddProductScreen';
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import { initDB } from '../services/dataBaseServices';


const Stack = createNativeStackNavigator();

const StackNavigations = () => {
  return (
    <SQLiteProvider databaseName='products.db' onInit={initDB}>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen} options={{headerShown : false}} />
        <Stack.Screen name='AddProduct' component={AddProductScreen} options={{headerShown : false}} />
      </Stack.Navigator>
    </SQLiteProvider>
  )
}

export default StackNavigations

const styles = StyleSheet.create({})