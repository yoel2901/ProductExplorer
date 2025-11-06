// src/screens/ProductDetailsScreen.tsx
import React, { useCallback } from 'react';
import { SafeAreaView, ScrollView, Text, Image, ActivityIndicator, Button, StyleSheet, View } from 'react-native';
import { useGetProductByIdQuery } from '../api/productsApi';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../features/favoritesSlice';
import { RootState } from '../app/store';

export default function ProductDetailsScreen({ route }: { route: any }) {
  const { id } = route.params as { id: number };
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);
  const dispatch = useDispatch();
  const favorites = useSelector((s: RootState) => (s.favorites as any).items);
  const isFavorite = favorites.includes(id);

  const onToggle = useCallback(() => dispatch(toggleFavorite(id)), [dispatch, id]);

  if (isLoading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  if (isError || !product) return <SafeAreaView style={styles.center}><Text>Unable to load product</Text></SafeAreaView>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={{ marginTop: 12 }}>{product.description}</Text>
        <View style={{ marginTop: 20 }}>
          <Button title={isFavorite ? "Remove from favorites" : "Add to favorites"} onPress={onToggle} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', height: 300, resizeMode: 'contain', backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: '700', marginTop: 12 },
  price: { fontSize: 16, color: '#333', marginTop: 8 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
