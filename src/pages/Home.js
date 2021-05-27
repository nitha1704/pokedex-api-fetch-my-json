import React, { useContext } from "react";
import styled from "styled-components";

// Pages
import SearchBar from "../component/SearchBar";
import PokemonList from "../component/PokemonList";

// Loading Image
import loadingIMG from "../images/loading-img/loading250x250-2.gif";

// Context
import { PokedexContext } from "../context/PokedexContext";

const Home = () => {
  const { loading } = useContext(PokedexContext);
  return (
    <section className="home-section">
      <h1 className="pokemon-header-title">Pokedex</h1>
      {loading ? (
        <WrapLoadingImage>
          <img src={loadingIMG} alt="loading-img" />
        </WrapLoadingImage>
      ) : (
        <div className="pokemon-container">
          <SearchBar />
          <PokemonList />
        </div>
      )}
    </section>
  );
};

const WrapLoadingImage = styled.div`
  position: relative;
  top: 5vw;
  img {
    display: block;
    margin: 0 auto;
  }
`;

export default Home;
