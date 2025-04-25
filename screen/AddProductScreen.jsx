import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { insertProduct } from '../services/dataBaseServices';
import { useSQLiteContext } from 'expo-sqlite';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';


const AddProductScreen = ({route}) => {
  const id = route?.params?.id;
  const navigation = useNavigation();
  const [image, setImage] = useState("");
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const dataBase = useSQLiteContext();
  console.log("id :", id);


  
  const handleAddProduct = async() => {
    try {
      await dataBase.runAsync(`
        INSERT INTO 
        products (name, stock, description, image,amount) 
        VALUES (?, ?, ?, ?,?);`, [name,`${stock}`, description, image, amount]);

      alert('Produit ajouté avec succès !');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      alert('Erreur lors de l’ajout du produit.');
    }
  };
  const handleImagePick = async () => {
    // Demande les permissions
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (!permissionResult.granted) {
      alert('Permission d’accès aux photos refusée.');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      setImage(result.assets[0].uri); // Chemin de l'image
    }
  };
  const formatAmount = (value) => {
    // Retirer tout ce qui n'est pas chiffre
    const cleaned = value.replace(/\D/g, '');
    // Ajouter les espaces tous les 3 chiffres
    return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Add Product</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.plus}>+</Text>
            <Text style={styles.addImageText}>Add Image</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Stock"
        keyboardType="numeric"
        value={stock}
        onChangeText={setStock}
      />
      <View style={styles.inputWithUnit}>
        <TextInput
          style={styles.inputAmount}
          placeholder="Prix en vente"
          keyboardType="numeric"
          value={amount}
          onChangeText={(text) => setAmount(formatAmount(text))}
        />
        <Text style={styles.unit}>Ar</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
        <Text style={styles.addButtonText}>ajouter</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  cancel: {
    fontSize: 16,
    color: '#2979FF',
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    borderRadius: 10,
    height: 250,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    fontSize: 30,
    color: '#999',
  },
  addImageText: {
    color: '#999',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 20,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#2979FF',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  inputWithUnit: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 20,
    height: 50,
  },
  
  inputAmount: {
    flex: 1,
    fontSize: 16,
  },
  
  unit: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
  },
});

export default AddProductScreen;
