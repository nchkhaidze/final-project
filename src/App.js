import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navigation from './features/navigation/Navigation';
import PokemonGallery from './features/pokemonGallery/PokemonGallery';
import CaughtPokemon from './features/caughtPokemon/CaughtPokemon';
import PokemonPage from './features/pokemonPage/PokemonPage'
import Footer from './features/footer/Footer';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main>
          <Switch>
            <Route exact path="/pokemon-page/:pokeId" component={PokemonPage} />
            <Route exact path="/caught/:page" component={CaughtPokemon}/>
            <Route path="/caught" component={CaughtPokemon}/> 
            <Route path="/" component={PokemonGallery}>
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
