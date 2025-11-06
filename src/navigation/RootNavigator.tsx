// src/navigation/AppNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View } from 'react-native';

// Import des écrans (on les créera après)
import HomeScreen from '../screen/HomeScreen';
import ProductDetailsScreen from '../screen/ProductDetailsScreen';
import FavoritesScreen from '../screen/FavoritesScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';


// Définition des types de navigation
export type RootStackParamList = {
  HomeTabs: undefined;
  ProductDetails: { id: number };
};

export type BottomTabParamList = {
  Home: undefined;
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

// Badge pour afficher le nombre de favoris
function FavoritesBadge() {
  const favoritesCount = useSelector((state: RootState) => state.favorites.items.length);
  
  if (favoritesCount === 0) return null;
  
  return (
    <View style={{
      position: 'absolute',
      right: -6,
      top: -3,
      backgroundColor: 'red',
      borderRadius: 10,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
        {favoritesCount}
      </Text>
    </View>
  );
}

// Tabs du bas
function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Products',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>🏠</Text>,
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: () => (
            <View>
              <Text style={{ fontSize: 24 }}>❤️</Text>
              <FavoritesBadge />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Navigation principale
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="HomeTabs" 
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ProductDetails" 
          component={ProductDetailsScreen}
          options={{ title: 'Product Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}