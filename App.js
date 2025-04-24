import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigations from './navigation/StackNavigations';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigations />
    </NavigationContainer>
  );
}
