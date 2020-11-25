import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import PokemonCard from './../pokemonGallery/pokemonCard/PokemonCard';
import { fetchCaughtPokemon, setCaughtPokemonCount } from "./../../app/pokemonSlice"
import { setCaughtPage } from "./../../app/pageSlice"
import { createPageNumbers } from "./../pokemonGallery/createPageNumbers"
import './../pokemonGallery/PokemonGallery.css';

export default function CaughtPokemon({ onlyCaught }) {
  const dispatch = useDispatch();

  const pokemon = useSelector(state => state.pokemon.items);
  const pokemonStatus = useSelector(state => state.pokemon.status);
  const error = useSelector(state => state.pokemon.error);
  const perPage = useSelector(state => state.page.perPage);

  const currentPage = useSelector(state => state.page.caughtPage);
  const totalCaughtPokemon = useSelector(state => state.pokemon.caughtPokemonCount);
  const pagesCount = Math.ceil(totalCaughtPokemon / perPage);
 

  const pages = createPageNumbers(pagesCount, currentPage);
  const renderedPages = pages.map((page, index) => {
    return <span
      key={index}
      className={currentPage === page ? "pokemon-gallery__page pokemon-gallery__page_current" : "pokemon-gallery__page"}
      onClick={() => dispatch(setCaughtPage(page))}
    >{page}</span>
  });

  useEffect(() => {
    dispatch(setCaughtPokemonCount());
    dispatch(fetchCaughtPokemon({ currentPage, perPage }));
  }, [dispatch, currentPage, perPage]);

  let content;

  if (pokemonStatus === "loading") {
    content = <div className="pokemon-gallery__loader">Loading pokemon...</div>;
  } else if (pokemonStatus === "complete") {
    content = pokemon.map(poke => {
      return (
        <PokemonCard key={poke.id} pokeId={poke.id} caught={poke.caught} />
      )
    });
  } else if (pokemonStatus === "failed") {
    content = <div className="pokemon-gallery__loader">{error}</div>;
  }

  return (
    <section className="pokemon-gallery">
      <h1 className="pokemon-gallery__heading">Caught Pokemon</h1>
      <ul className='pokemon-gallery__items'>
        {content}
      </ul>
      <div className="pokemon-gallery__pages">
        {renderedPages}
      </div>
    </section>
  );
}