import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemonById } from "./../../app/pokemonSlice"
import './PokemonPage.css';
import { capitalize } from '../capitalize';

// gets the pokemon id as parameter 
// fetches the pokemon info from server
// compares server info against caught pokemon in the store to display current info about being caught

export default function PokemonPage({ match }) {
  const id = match.params.pokeId;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemonById(id));
  }, [dispatch, id]);

  const pokemon = useSelector(state => state.pokemon.currentPokemon);
  const caughtPokemon = useSelector(state => state.pokemon.caught[0]);
  const pokemonStatus = useSelector(state => state.pokemon.currentPokemonStatus);
  const error = useSelector(state => state.pokemon.error);
  let content;

  if (pokemonStatus === "loading") {
    content = <div className="pokemon-page__loader">Loading pokemon...</div>;
  } else if (pokemonStatus === "complete") {
    let caught;

    for (let i = 0; i < caughtPokemon.length; i++) {
      if (caughtPokemon[i].id === pokemon.id) {
        caught = caughtPokemon[i].caught;
        break;
      }
    }

    content = 
    <article className="pokemon-page">
      <div className="pokemon-page__name"><h2>{capitalize(pokemon.name)}</h2></div>
      <div className="pokemon-page__image">
        <img src={`https://raw.githubusercontent.com/js-training-sep-2020/final-project/main/pokemons/${pokemon.id}.png`} alt={pokemon.name}></img>
      </div>
      <div className="pokemon-page__caption">
        <div className="pokemon-page__id">Id: {pokemon.id}</div>
        <div className="pokemon-page__caught">{caught ? `Caught: ${caught.slice(4, 24)}` : "Not yet caught"}</div>
      </div>
    </article>
  } else if (pokemonStatus === "failed") {
    content = <div className="pokemon-page__loader">{error}</div>;
  }

  return (
    <div>{content}</div>
  );
}

