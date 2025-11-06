// src/components/ProductItem.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  product: { id: number; title: string; price: number; image: string };
  onPress: (id: number) => void;
  onToggleFavorite?: (id: number) => void;
  isFavorite?: boolean;
};

const ProductItem: React.FC<Props> = React.memo(({ product, onPress, onToggleFavorite, isFavorite }) => {
  const handlePress = React.useCallback(() => onPress(product.id), [onPress, product.id]);
  const handleToggle = React.useCallback(() => onToggleFavorite && onToggleFavorite(product.id), [onToggleFavorite, product.id]);

  return (
    <TouchableOpacity style={styles.row} onPress={handlePress} activeOpacity={0.8}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
      {onToggleFavorite && (
        <TouchableOpacity onPress={handleToggle} style={styles.favBtn}>
          <Text style={{ color: isFavorite ? 'red' : '#333', fontSize: 18 }}>{isFavorite ? '♥' : '♡'}</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
});

export default ProductItem;

const styles = StyleSheet.create({
  row: { flexDirection: 'row', padding: 12, alignItems: 'center', borderBottomWidth: 1, borderColor: '#eee', backgroundColor: '#fff' },
  image: { width: 64, height: 64, resizeMode: 'contain', marginRight: 12 },
  info: { flex: 1 },
  title: { fontSize: 14, fontWeight: '600' },
  price: { marginTop: 6, color: '#333' },
  favBtn: { padding: 8 },
});
