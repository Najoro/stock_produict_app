import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  StatusBar,
  Animated,
} from "react-native";
import React, { useCallback, useRef } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
const EachProductComponent = ({ item }) => {
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate("Product", { id: item.id });
  };
  return (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.name}</Text>
        {/* <Text style={styles.productDescription}>{item.description}</Text> */}
        <Text style={styles.productstock}>stock disponible : {item.stock}</Text>
        <Text style={styles.productPrice}>{item.amount} Ar</Text>
        <TouchableOpacity style={styles.productButton} onPress={handleClick}>
          <Text style={styles.productButtonText}>Détails</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ListProduct = ({ products }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useFocusEffect(
    useCallback(() => {
      (async () => {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      })();
    }, [])
  );
  const renderItem = ({ item }) => {
    return <EachProductComponent item={item} />;
  };
  console.log(products);
  if (!products || products.length === 0) {
    // 👉 Si aucun produit
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucun produit enregistré pour le moment.</Text>
      </View>
    );
  }
  return (
    <Animated.FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.productList}
      style={{ opacity: fadeAnim }}
    />
  );
};

export default ListProduct;

const styles = StyleSheet.create({
  productList: {
    paddingBottom: 20,
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#BDC3C7",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    overflow: "hidden",
  },
  productImage: {
    width: 120,
    height: "90%",
    borderRadius: 5,
    resizeMode: "cover",
    margin: 5,
  },
  productInfo: {
    padding: 10,
    justifyContent: "center",
    flex: 1,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: "#7F8C8D",
    marginBottom: 10,
  },
  productstock : {
    fontSize: 14,
    color: "#7F8C8D",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3498DB",
    marginBottom: 15,
  },
  productButton: {
    backgroundColor: "#3498DB",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  productButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: "#7F8C8D",
    textAlign: "center",
  },
});
