import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DeleteProductInSQLite } from '../../services/dataBaseServices';

const DeleteProduct = ({ id, dataBase, goHome }) => {
    Alert.alert(
      "Confirmer la suppression",
      "Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Supprimer",
          onPress: async () => {
            try {
              await DeleteProductInSQLite(dataBase, id) 
              goHome();
            } catch (e) {
              console.log("Erreur lors de la suppression :", e);
            }
          }
        }
      ]
    );
  };

export default DeleteProduct

const styles = StyleSheet.create({})