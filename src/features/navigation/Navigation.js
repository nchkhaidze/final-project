import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  return (
    <header className="navigation">
      <Link to="/" className="navigation__container navigation__logo-container">
        <div>
          <img src="/images/pokemon_icon.png" alt="pokemon icon" className="navigation__image"></img>
        </div>
        <div className="navigation__container navigation__text-container">
          <h1 className="navigation__title">Pokedex</h1>
        </div>
      </Link>
      <div className="navigation__container navigation__nav-container">
        <NavLink exact to="/" className="navigation__nav-link" activeClassName="navigation__nav-link_disabled">
          Home
        </NavLink>
        <NavLink to="/caught" className="navigation__nav-link" activeClassName="navigation__nav-link_disabled">
          See caught pokemon
        </NavLink>
      </div>
    </header>
  );   
}

