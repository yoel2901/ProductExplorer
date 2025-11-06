import { configureStore } from "@reduxjs/toolkit";
import{setupListeners} from "@reduxjs/toolkit/query";
import {productsApi} from "../api/productsApi";
import favoritesReducer from "../features/favorites/favoritesSlices";

export const store =  configureStore({
    reducer:{
        [productsApi.reducerPath]: productsApi.reducer,
    favorites: favoritesReducer,
    },
middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware),
    devTools: __DEV__,
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;