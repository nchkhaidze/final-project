import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// items, status and error are related to PokemonGallery and CaughtPokemon components

// currentPokemonStatus, currentPokemon, currentPokemonError are used in PokemonPage

const initialState = {
  items: [],
  status: "idle",
  error: null,
  caught: [],
  caughtPokemonCount: 0,
  currentPokemonStatus: "idle",
  currentPokemon: {},
  currentPokemonError: null,
};

export const fetchPokemonById = createAsyncThunk("pokemon/fetchPokemonById", async ( pokeId ) => {
  const response = await fetch(`http://localhost:3004/pokemons/${pokeId}`);
  const pokemon = await response.json();
  
  return pokemon;
});

// is executed once by index.js
export const initializeCaughtPokemon = createAsyncThunk("pokemon/initializeCaughtPokemon", async (dispatch) => {
  const response = await fetch(`http://localhost:3004/caught/`);
  const caughtPokemon = await response.json();
  return caughtPokemon;
});


// counts total amount of caught pokemon for pagination in CaughtPokemon component 
export const setCaughtPokemonCount = createAsyncThunk("pokemon/setCaughtPokemonCount", async (dispatch) => {
  const response = await fetch(`http://localhost:3004/caught/`);
  const caughtPokemon = await response.json();
  return caughtPokemon.length;
});

export const fetchCaughtPokemon = createAsyncThunk("pokemon/fetchCaughtPokemon", async ({ currentPage, perPage }) => {
  const response = await fetch(`http://localhost:3004/caught?_page=${currentPage}&_limit=${perPage}`);
  const caughtPokemon = await response.json();

  return caughtPokemon;
});

export const fetchPokemon = createAsyncThunk("pokemon/fetchPokemon", async ({ currentPage, perPage }, { getState }) => {
  const response = await fetch(`http://localhost:3004/pokemons?_page=${currentPage}&_limit=${perPage}`);
  let pokemon = await response.json();

  const caughtPokemon = getState().pokemon.caught[0];
  
  // updating the view to make sure caught pokemon buttons are displayed correctly in PokemonGallery component

  for (let i = 0; i < pokemon.length; i++) {
    for (let j = 0; j < caughtPokemon.length; j++) {
      if (pokemon[i].id === caughtPokemon[j].id) {
        pokemon[i].caught = caughtPokemon[j].caught;
      }
    } 
  }

  return pokemon;
});

export const addCaughtPokemon = createAsyncThunk("pokemon/addCaughtPokemon", async pokemon => {
  const response = await fetch("http://localhost:3004/caught/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(pokemon),
  });

  const result = await response.json();
  return result;
});

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    pokemonCaught(state, action) {
      state.caught[0].push(action.payload);
    }
  },
  extraReducers: {
    [fetchPokemon.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchPokemon.fulfilled]: (state, action) => {
      state.status = "complete";
      state.items = action.payload;
    },
    [fetchPokemon.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchCaughtPokemon.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchCaughtPokemon.fulfilled]: (state, action) => {
      state.status = "complete";
      state.items = action.payload;
    },
    [fetchCaughtPokemon.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [setCaughtPokemonCount.fulfilled]: (state, action) => {
      state.caughtPokemonCount = action.payload;
    },
    [initializeCaughtPokemon.fulfilled]: (state, action) => {
      state.caught.push(action.payload);
    },
    [fetchPokemonById.pending]: (state, action) => {
      state.currentPokemonStatus = "loading";
    },
    [fetchPokemonById.fulfilled]: (state, action) => {
      state.currentPokemonStatus = "complete";
      state.currentPokemon = action.payload;
    },
    [fetchPokemonById.rejected]: (state, action) => {
      state.currentPokemonStatus = "failed";
      state.currentPokemonError = action.error.message;
    },
  }
});

export const { pokemonCaught } = pokemonSlice.actions;
export default pokemonSlice.reducer;