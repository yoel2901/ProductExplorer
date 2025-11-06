// src/screens/FavoritesScreen.tsx
import React, { useCallback, useMemo } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useLazyGetProductsQuery } from '../api/productsApi';
import ProductItem from '../components/ProductItem';

export default function FavoritesScreen({ navigation }: { navigation: any }) {
  const favoriteIds = useSelector((s: RootState) => (s.favorites as any).items);
  const [trigger, { data: products }] = useLazyGetProductsQuery();

  React.useEffect(() => {
    if (!products) trigger();
  }, [products, trigger]);

  const favoriteProducts = useMemo(() => (products ? products.filter((p) => favoriteIds.includes(p.id)) : []), [products, favoriteIds]);

  const onPress = useCallback((id: number) => navigation.navigate('ProductDetails', { id }), [navigation]);
  const keyExtractor = useCallback((item: any) => String(item.id), []);

  if (favoriteProducts.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>No favorites yet</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={favoriteProducts}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => <ProductItem product={item} onPress={onPress} isFavorite />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});