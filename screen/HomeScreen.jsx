import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getProductInDataBase } from '../services/dataBaseServices';
import { useSQLiteContext } from 'expo-sqlite';
import ListProductComponent from '../src/components/ListProductComponent';
import { SQLiteService } from '../services/dataBaseServices';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const dataBase = useSQLiteContext();
  useFocusEffect(
    useCallback(() => {
      (async() => {
        const getProductInDB = await dataBase.getAllAsync("SELECT * FROM products");
        setProducts(getProductInDB);
      })()
    }, [])
  )
  
  const handleClick = () => {
    navigation.navigate('AddProduct');
  };
    
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2979FF" barStyle="light-content" />

      <Text style={styles.header}>📦 Stock Manager</Text>

      <TouchableOpacity style={styles.addButton} onPress={handleClick} activeOpacity={0.9}>
        <Text style={styles.addButtonText}>+ Add Product</Text>
      </TouchableOpacity>

      <ListProductComponent products={products} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  headerContainer: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#2979FF',
    margin: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  
});

export default HomeScreen;
