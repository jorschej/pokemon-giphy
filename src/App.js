import _ from 'lodash';
import $ from 'jquery';

import React, { Component } from 'react';

import SearchBar from './components/search_bar';
import PokeList from './components/poke_list';
import GifDisplay from './components/gif_display';
import PokeInfo from './components/poke_info';

import './App.css';

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

const Pokedex = require('pokedex-promise-v2');
const options = {
  protocol: 'https',
  versionPath: '/api/v2/',
  cacheLimit: 100 * 1000, // 100s
  timeout: 10 * 1000 // 10s
}
const P = new Pokedex(options);


class App extends Component {
  constructor(props){
      super(props);

      this.state = { 
                      pokemon: [],
                      listLeft: [],
                      listRight: [],
                      gif: []
                  };

      let self = this;
      let firstSearch = Math.floor(Math.random()*803);
      this.pokemonSearch(firstSearch,self);
  }
  
  pokemonSearch(pokemon,self){
      let hero = self;
      if(!pokemon){
          return;
      }
      P.getPokemonByName(pokemon)
          .then(function(pokemon){
              hero.setState({
              pokemon: pokemon
              });

              let xhr = $.get(`https://api.giphy.com/v1/gifs/search?q=${pokemon.name}&api_key=${API_KEY}&limit=1`);
              xhr.done( gif => { 
                  hero.setState({gif});
              });
              
              let left = pokemon.id-1;
              hero.leftSearch(left,hero);
              let right = pokemon.id+1;
              hero.rightSearch(right,hero);
          })
          .catch(function(error){
          console.log('There was an ERROR: ', error);
          });
  }

  leftSearch(pokemon,self){
      let hero = self;
      if(pokemon === 0){
          pokemon = 802;
      }
      P.getPokemonByName(pokemon)
          .then(function(pokemon){
              hero.setState({
              listLeft: pokemon
              });
          })
          .catch(function(error){
          console.log('There was an ERROR: ', error);
          });
  }

  rightSearch(pokemon,self){
      let hero = self;
      if(pokemon === 803){
          pokemon = 1;
      }
      P.getPokemonByName(pokemon)
          .then(function(pokemon){
              hero.setState({
              listRight: pokemon
              });
          })
          .catch(function(error){
          console.log('There was an ERROR: ', error);
          });
  }

  render(){
      const pokemonSearch = _.debounce((term,self) => { this.pokemonSearch(term,self) }, 300);

      return (
          <div className="app">
              <SearchBar onSearchTermChange={term => {pokemonSearch(term,this)}} />
              <PokeList onPokemonClick={clicked => {pokemonSearch(clicked,this)}} listLeft={this.state.listLeft} listRight={this.state.listRight} />
              <GifDisplay gif={this.state.gif} />
              <PokeInfo pokemon={this.state.pokemon} />
          </div>
      );
  }
  
}

export default App;
