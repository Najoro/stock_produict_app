import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Animated, ActivityIndicator, Alert } from 'react-native';
import { useCallback, useState, useRef, useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import EditProduct from '../src/Products/EditProduct';
import DeleteProduct from '../src/Products/DeleteProduct';


const ProductScreen = ({ route }) => {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const dataBase = useSQLiteContext();
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const getProductInDB = await dataBase.getAllAsync("SELECT * FROM products WHERE id = ?", id);
        setProduct(getProductInDB[0]);
      })();
    }, [])
  );

  useEffect(() => {
    if (product) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [product]);

  const goHome = () => {
    navigation.navigate('HomeScreen');
  };

  if (!product) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <BlurView intensity={80} tint="light" style={styles.blurContainer}>

          <Image
            source={{ uri: product.image }}
            style={styles.image}
          />

          <Text style={styles.title}>{product.name}</Text>

          <View style={styles.separator} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Stock :</Text>
            <Text style={styles.detailValue}> {product.stock} unités</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Prix :</Text>
            <Text style={styles.detailValue}>{product.amount} Ar</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Catégorie :</Text>
            <Text style={styles.detailValue}>{product.category || 'Non spécifiée'}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Marque :</Text>
            <Text style={styles.detailValue}>{product.brand || 'Non spécifiée'}</Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{product.description || 'Aucune description.'}</Text>
          </View>

          <View style={styles.actionsButtons}>
            <TouchableOpacity style={styles.editButton} onPress={() => EditProduct({ id, navigation })}>
              <Text style={styles.editButtonText}>Éditer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.editButton, styles.buttonDelete]} onPress={() => DeleteProduct({ id, dataBase, goHome })}>
              <Text style={styles.editButtonText}>Supprimer</Text>
            </TouchableOpacity>
          </View>

        </BlurView>
      </Animated.View>
    </ScrollView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f0f4f7',
    flexGrow: 1,
  },
  card: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 20,
    backgroundColor: '#ffffffcc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  blurContainer: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  stock: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  detailValue: {
    fontSize: 16,
    color: '#222',
  },
  descriptionContainer: {
    marginTop: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
    color: '#333',
  },
  descriptionText: {
    fontSize: 15,
    color: '#555',
  },
  actionsButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDelete: {
    backgroundColor: '#FF3B30',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f7',
  },
});
