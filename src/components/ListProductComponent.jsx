import { Image, StyleSheet, Text, TouchableOpacity, View,FlatList, Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const EachProductComponent = ({ item }) => {
  const navigation  = useNavigation();

  const handleClick = () => {
    navigation.navigate('Product', {id : item.id});
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={handleClick}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <View style={styles.cardLabelValue}>
          <Text style={styles.label}>Prix : </Text>
          <Text style={styles.value}>{item.amount ? item.amount : 0}</Text>
          <Text style={styles.label}> Ar</Text>
        </View>
        <View style={styles.cardLabelValue}>
          <Text style={styles.label}>stock : </Text>
          <Text style={styles.value}>{item.stock}</Text>
        </View>
      </View>
      <Text style={styles.cardArrow}>›</Text>
    </TouchableOpacity>
  );
};

const ListProductComponent = ({products}) => {
  const renderItem = ({item}) => {
    return <EachProductComponent  item={item}/>
  }
  return <FlatList
    data={products}
    renderItem={renderItem}
    keyExtractor={(item) => item.id}
    contentContainerStyle={{ paddingBottom: 20 }}
    showsVerticalScrollIndicator={false}
  />;
};

export default ListProductComponent;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  cardImage: {
    width: 100,
    height: "100%",
    marginRight: 15,
    borderRadius: 10,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
  },
  cardLabelValue: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    color: "#777",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    opacity: 0.7,
  },
  cardArrow: {
    fontSize: 24,
    color: "#aaa",
    fontWeight: "bold",
  },
});
