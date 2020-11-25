import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import PokemonCard from './pokemonCard/PokemonCard';
import { fetchPokemon } from "./../../app/pokemonSlice"
import { setCurrentPage } from "./../../app/pageSlice"
import { createPageNumbers } from "./createPageNumbers"
import './PokemonGallery.css';

// PokemonGallery is the main component which renders PokemonCard components, which have a link to PokemonPage
// Pagination is implemented by dispatching setCurrentPage action
// createPageNumbers imported function forms the correct page navigation

export default function PokemonGallery() {
  const dispatch = useDispatch();
  
  const pokemon = useSelector(state => state.pokemon.items);
  const pokemonStatus = useSelector(state => state.pokemon.status);
  const error = useSelector(state => state.pokemon.error);
  
  const perPage = useSelector(state => state.page.perPage);
  const currentPage = useSelector(state => state.page.currentPage);
  const totalCount = useSelector(state => state.page.totalCount);
  const pagesCount = Math.ceil(totalCount / perPage);

  const pages = createPageNumbers(pagesCount, currentPage);
  const renderedPages = pages.map((page, index) => {
    return <span
      key={index}
      className={currentPage === page ? "pokemon-gallery__page pokemon-gallery__page_current" : "pokemon-gallery__page"}
      onClick={() => dispatch(setCurrentPage(page))}
    >{page}</span>
  });

  useEffect(() => {
    dispatch(fetchPokemon({ currentPage, perPage }));
  }, [dispatch, currentPage, perPage]);

  let content;

  if (pokemonStatus === "loading") {
    content = <div className="pokemon-gallery__loader">Loading pokemon...</div>;
  } else if (pokemonStatus === "complete") {
    content = pokemon.map(poke => {
      return (
        <PokemonCard key={poke.id} pokeId={poke.id} />
      )
    });
  } else if (pokemonStatus === "failed") {
    content = <div className="pokemon-gallery__loader">{error}</div>;
  }


  return (
    <section className="pokemon-gallery">
      <h1 className="pokemon-gallery__heading">Pokemon Gallery</h1>
      <ul className='pokemon-gallery__items'>
        {content}
      </ul>
      <div className="pokemon-gallery__pages">
        {renderedPages}
      </div>
    </section>
  );
}