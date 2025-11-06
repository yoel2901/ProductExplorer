// src/screens/HomeScreen.tsx
import React, { useCallback } from 'react';
import { SafeAreaView, View, Text, Button, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useLazyGetProductsQuery } from '../api/productsApi';
import ProductItem from '../components/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { toggleFavorite } from '../features/favoritesSlice';

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [trigger, { data: products, isFetching, isUninitialized, isError }] = useLazyGetProductsQuery();
  const favorites = useSelector((s: RootState) => (s.favorites as any).items);
  const dispatch = useDispatch();

  const onLoad = useCallback(() => trigger(), [trigger]);
  const onPress = useCallback((id: number) => navigation.navigate('ProductDetails', { id }), [navigation]);
  const onToggleFavorite = useCallback((id: number) => dispatch(toggleFavorite(id)), [dispatch]);

  const keyExtractor = useCallback((item: any) => String(item.id), []);
  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <ProductItem
        product={item}
        onPress={onPress}
        onToggleFavorite={onToggleFavorite}
        isFavorite={favorites.includes(item.id)}
      />
    ),
    [onPress, onToggleFavorite, favorites]
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Button title="Fetch products" onPress={onLoad} />
        <Button title="Favorites" onPress={() => navigation.navigate('Favorites')} />
      </View>

      {isUninitialized && <View style={styles.center}><Text>Press "Fetch products" to load items</Text></View>}
      {isFetching && <ActivityIndicator style={{ marginTop: 20 }} size="large" />}
      {isError && <View style={styles.center}><Text>Error loading products</Text></View>}

      {products && (
        <FlatList
          data={products}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          initialNumToRender={8}
          maxToRenderPerBatch={10}
          windowSize={6}
          removeClippedSubviews
          getItemLayout={(_, index) => ({ length: 100, offset: 100 * index, index })}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, backgroundColor: '#fafafa' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
