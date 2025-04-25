import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useCallback, useState } from 'react'
import { useSQLiteContext } from 'expo-sqlite';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const editProduct = ({id, navigation}) =>{
  navigation.navigate("AddProduct", {id : id})
}

const deleteProduct = async({id,dataBase}) =>{  
  try{
    await dataBase.runAsync("DELETE FROM products WHERE id = ?", id)
  }catch(e){
    console.log("erreur lors de la suppression :", e);
    
  }
}

const ProductScreen = ({route}) => {
  const {id} = route.params;
  const [product, setProduct] = useState({});
  const dataBase = useSQLiteContext();
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      (async() => {
        const getProductInDB = await dataBase.getAllAsync("SELECT * FROM products WHERE id = ?", id)
        setProduct(getProductInDB[0]);
      })()
    }, [])
  )

  const goHome =() => {
    navigation.navigate('Home')
  }
  
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Image
        source={{uri :product.image}} // remplace par ton image locale ou URI
        style={styles.image}
      />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.stock}>nombre de stock : {product.stock}</Text>

      <View style={styles.prixContainer}>
        <Text style={styles.descriptionTitle}>Prix</Text>
        <Text style={styles.descriptionText}>{product.amount} Ar</Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{product.description}</Text>
      </View>

      <View style={styles.actionsButtons}>  
        <TouchableOpacity style={styles.editButton} onPress={() => {editProduct({id,navigation}, goHome())}}>
          <Text style={styles.editButtonText}>Editer</Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={[styles.editButton, styles.buttonDelete]} onPress={() => { deleteProduct({id,dataBase}), goHome() }}>
          <Text style={styles.editButtonText}>Supprimer</Text>
        </TouchableOpacity>
        
      </View>
    </ScrollView>
  );
}

export default ProductScreen

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  backText: {
    color: '#007AFF',
    fontSize: 17,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
  },
  stock: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  prixContainer :{
    width: '100%',
    display: "flex",
    flexDirection: "row",
    gap:10,
  },
  descriptionContainer: {
    width: '100%',
    marginBottom: 20,
    gap:10,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
  },
  actionsButtons : {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  buttonDelete: {
    backgroundColor: "red",
  }
});