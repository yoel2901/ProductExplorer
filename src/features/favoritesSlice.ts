import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState  {
    items: number[];
}

const initialState: FavoritesState ={
    items:[],
};

const favoritesSlices = createSlice({
    name:'favorites',initialState,
reducers:{

    addFavorite(state, action: PayloadAction<number>){
        if(!state.items.includes(action.payload)){
            state.items.push(action.payload);
        }
    },

    removeFavorite(state, action: PayloadAction<number>){
       
           state.items = state.items.filter((id) => id !== action.payload);
    },

    toggleFavorite(state, action: PayloadAction<number>){
        const id = action.payload;
        if(state.items.includes(id)){
            state.items = state.items.filter((i) => i !==id);
        }else{
            state.items.push(id);
        }
    },

    clearFavorites(state){
        state.items = [];
    },
},
});

export const { addFavorite, removeFavorite, toggleFavorite, clearFavorites } = favoritesSlices.actions;
export default favoritesSlices.reducer;