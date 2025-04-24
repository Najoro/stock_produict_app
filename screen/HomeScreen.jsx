import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getProductInDataBase } from '../services/dataBaseServices';

const PRODUCTS = [
  {
    id: '1',
    name: 'T-Shirt',
    stock: 25,
    image: 'https://img.icons8.com/color/96/t-shirt.png',
  },
  {
    id: '2',
    name: 'Smartphone',
    stock: 10,
    image: 'https://img.icons8.com/color/96/iphone13.png',
  },
  {
    id: '3',
    name: 'Running Shoes',
    stock: 8,
    image: 'https://img.icons8.com/color/96/running-shoes.png',
  },
  {
    id: '4',
    name: 'Chair',
    stock: 4,
    image: 'https://img.icons8.com/color/96/chair.png',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const getProductInDB = await getProductInDataBase();
      if (getProductInDB) {
        setProducts(getProductInDB);
      }
    })();
  }, []);

  const handleClick = () => {
    navigation.navigate('AddProduct');
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardStock}>In Stock: {item.stock}</Text>
      </View>
      <Text style={styles.cardArrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2979FF" barStyle="light-content" />

      <Text style={styles.header}>📦 Stock Manager</Text>

      <TouchableOpacity style={styles.addButton} onPress={handleClick} activeOpacity={0.9}>
        <Text style={styles.addButtonText}>+ Add Product</Text>
      </TouchableOpacity>

      <FlatList
        data={PRODUCTS}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  cardImage: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  cardStock: {
    fontSize: 14,
    color: '#777',
  },
  cardArrow: {
    fontSize: 24,
    color: '#aaa',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
