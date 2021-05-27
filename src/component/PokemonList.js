import React, {useContext} from "react";
import styled from "styled-components";

// Context
import {PokedexContext} from '../context/PokedexContext';
// Component
import PokemonCard from './PokemonCard';


const PokemonList = () => {
  const {pokemonFilter} = useContext(PokedexContext);
  return (
    <WrapPokemonList className="wrap-pokemon-list">   
        <PokemonCard pokemonFilter={pokemonFilter} />
    </WrapPokemonList>
  );
};

const WrapPokemonList = styled.div`
    text-align: center;
`
export default PokemonList;
