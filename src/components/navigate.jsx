import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export const goTo = (screen) => {
   const navigation  = useNavigation();
   console.log("go to : ", screen);
   navigation.navigate(screen);
   
}


const styles = StyleSheet.create({})