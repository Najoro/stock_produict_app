import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { InsertProduct, insertProduct, UpdateProduct } from '../services/dataBaseServices';
import { useSQLiteContext } from 'expo-sqlite';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { ButtonXl } from '../src/components/ButtonsComponent';
import ImagePickerComponent from '../src/components/ImagePickerComponent';
import InputComponent from '../src/components/InputComponent';

const formatAmount = (value) => {
  // Retirer tout ce qui n'est pas chiffre
  const cleaned = value.replace(/\D/g, '');
  // Ajouter les espaces tous les 3 chiffres
  return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
const FormScreen = ({route}) => {
  const id = route?.params?.id || null;
  const navigation = useNavigation();
  const [isEditMode, setIsEditMode] = useState(false);
  const [image, setImage] = useState("");
  const [name, setName] = useState('');
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const dataBase = useSQLiteContext();
  
  useEffect(() => {
    if(id != null) {
      setIsEditMode(true);
      (async() => {
        await dataBase.getAllAsync("SELECT * FROM products WHERE id = ?", id)
        .then((resp) => resp[0])
        .then((data) => {
          console.log(data.stock)
          setImage(data.image);
          setName(data.name);
          setStock(data.stock);
          setDescription(data.description);
          setAmount(data.amount);
        });
      
      })()
    }
  }, [isEditMode])
  console.log("is edit stock :", stock);

  const handleSubmit = async () => {
    try {
      if (name === "") {
        Alert.alert('Donnez un nom à votre produit');
        return;
      }
  
      if (isEditMode) {
        await UpdateProduct(dataBase, [name, stock, description, image, amount, id]);
      } else {
        await InsertProduct(dataBase, [name, stock, description, image, amount]);
        alert('Produit ajouté avec succès !');
      }
  
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.error(error);
      alert('Erreur lors de l’ajout ou de la modification du produit.');
    }
  };
  

  return (
    <ScrollView style={styles.container}>

      <ImagePickerComponent image={image} onImagePicked={setImage} />

      <InputComponent value={name} onChangeText={setName} placeholder="Name" />
      <InputComponent value={`${stock}`} onChangeText={setStock} placeholder="Stock" keyboardType="numeric" />
      <InputComponent value={amount} onChangeText={(text) => setAmount(formatAmount(text))} placeholder="Prix en vente" keyboardType="numeric" suffix="Ar" />
      <InputComponent value={description} onChangeText={setDescription} placeholder="Description" />
      
      <ButtonXl onPress={handleSubmit} label={isEditMode ? 'Modifier' : "Ajouter" }/>

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

export default FormScreen;
