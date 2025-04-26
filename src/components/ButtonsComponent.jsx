import React from "react";
import { TouchableOpacity, Text, Alert, StyleSheet } from "react-native";

export const ButtonXl = ({onPress, bg="#2979FF" , colorText= "#fff", label="asa"}) => {
  return (
    <TouchableOpacity style={[styles.addButton, {backgroundColor: bg}]} onPress={onPress}>
      <Text style={[styles.addButtonText, {color: colorText}]}>{label}</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
    addButton: {
      padding: 15,
      borderRadius: 15,
      alignItems: 'center',
      marginTop: 30,
      marginBottom: 20,
    },
    addButtonText: {
      fontSize: 18,
      fontWeight: '600',
    },
  });
  