import { StyleSheet, Text, View } from "react-native";
import React from "react";

const EditProduct = ({ id, navigation }) => {
  navigation.navigate("formScreen", { id });
};

export default EditProduct;

const styles = StyleSheet.create({});
