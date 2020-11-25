import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { capitalize } from '../../capitalize'
import { addCaughtPokemon, pokemonCaught } from "../../../app/pokemonSlice"
import './PokemonCard.css';

// PokemonCard renders itself via id passed from PokemonGallery or CaughtPokemon
// PokemonCard has link to PokemonPage via image
// PokemonCard updates the server and the store when "catch" button is clicked

export default function PokemonCard({ pokeId }) {
  const pokemon = useSelector((state) => state.pokemon.items.find((poke) => poke.id === pokeId));
  const { id, name, caught } = pokemon;

  const buttonClass = "pokemon-card__button";
  const disabledButtonClass = "pokemon-card__button pokemon-card__button_disabled";

  const catchButtonInitialState = {
    value: caught ? "Caught" : "Catch!",
    disabled: caught,
    className: caught ? disabledButtonClass : buttonClass
  }

  const [buttonState, setButtonState] = useState(catchButtonInitialState);

  const dispatch = useDispatch();

  const onCaughtClicked = (e) => {
    dispatch(addCaughtPokemon({...pokemon, caught: new Date().toString()}));
    dispatch(pokemonCaught({...pokemon, caught: new Date().toString()}));
    setButtonState({
      value: "Caught",
      disabled: true,
      className: disabledButtonClass
    });
  }

  return (
    <article className="pokemon-card">
      <div className="pokemon-card__name"><p>{capitalize(name)}</p></div>
      <Link to={`/pokemon-page/${id}`} className="pokemon-card__image-container">
        <img src={`https://raw.githubusercontent.com/js-training-sep-2020/final-project/main/pokemons/${id}.png`} alt={name} />
      </Link>
      <div className="pokemon-card__button-container">
        <input type="button" 
          onClick={onCaughtClicked} 
          className={buttonState.className} 
          value={buttonState.value} 
          disabled={buttonState.disabled}>
        </input>
      </div>
    </article>
  )
}
