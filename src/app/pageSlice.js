import { createSlice } from "@reduxjs/toolkit";

//keeps track of current page for CaughtPokemon and PokemonGallery components
//as well as total count of pokemon and amount per page to implement pagination 

const initialState = {
  currentPage: 1,
  caughtPage: 1,
  totalCount: 949,
  perPage: 24,
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setTotalCount(state, action) {
      state.totalCount = action.payload;
    },
    setCaughtPage(state, action) {
      state.caughtPage = action.payload;
    },
  },
});

export const { setCurrentPage, setTotalCount, setCaughtPage } = pageSlice.actions;

export default pageSlice.reducer;