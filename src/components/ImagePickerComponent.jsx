import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImagePickerComponent = ({ image, onImagePicked }) => {

  const handlePickImage = async () => {
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
      onImagePicked(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.plus}>+</Text>
          <Text style={styles.addImageText}>Ajouter une image</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default ImagePickerComponent;
