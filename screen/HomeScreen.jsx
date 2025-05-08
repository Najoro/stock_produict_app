import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import AddProduct from "../src/Products/AddProduct";
import ListProduct from "../src/Products/ListProduct";
import { ButtonXl } from "../src/components/ButtonsComponent";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const dataBase = useSQLiteContext();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const getProductInDB = await dataBase.getAllAsync(
          "SELECT * FROM products"
        );
        setProducts(getProductInDB);
      })();
    }, [])
  );
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2C3E50" barStyle="light-content" />
      <Text style={styles.header}>📦 Gestion de Stock</Text>

      <ButtonXl onPress={() => {navigation.navigate("formScreen")}} label="+ Ajouter un produit" bg="#3498DB"/>
      <ListProduct products={products} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF0F1",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2C3E50",
    textAlign: "center",
    marginVertical: 20,
  },
  addButton: {
    backgroundColor: "#3498DB",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default HomeScreen;
