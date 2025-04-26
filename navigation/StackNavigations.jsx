import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screen/HomeScreen';
import FormScreen from '../screen/FormScreen';
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import { initDB } from '../services/dataBaseServices';
import ProductScreen from '../screen/ProductScreen';


const Stack = createNativeStackNavigator();

const StackNavigations = () => {
  return (
    <SQLiteProvider databaseName='products.db' onInit={initDB}>
      <Stack.Navigator initialRouteName='HomeScreen'>
        <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown : false}} />
        <Stack.Screen name='formScreen' component={FormScreen} options={{headerShown : true , headerTitle:"Formulation de Produit", headerStyle:styles.headerStyle}} />
        <Stack.Screen name='Product' component={ProductScreen} options={{headerTitle: "Produit"}} />
      </Stack.Navigator>
    </SQLiteProvider>
  )
}

export default StackNavigations

const styles = StyleSheet.create({
  headerStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  }
})