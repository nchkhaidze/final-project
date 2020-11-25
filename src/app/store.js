import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './pokemonSlice';
import pageReducer from './pageSlice';

export default configureStore({
  reducer: {
    pokemon: pokemonReducer,
    page: pageReducer
  },
});
