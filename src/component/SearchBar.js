import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

// Lazy Loading
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../../node_modules/react-lazy-load-image-component/src/effects/blur.css";

// Context
import { PokedexContext } from "../context/PokedexContext";
// Image
import searchIMG from "../images/icon_magnifying_glass.png";

// Loading Image
import spinLoading from "../images/loading-img/Spin-1s-200px.gif";

const SearchBar = () => {
  const {
    pokemon,
    pokemonSearchData,
    setPokemonFilter,
    pokemonName,
    setPokemonName,
    setPokemonEndPoint,
    pokemonFullInformation,
  } = useContext(PokedexContext);

  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearch = (pokemonName) => {
    setPokemonName(pokemonName);
    if (pokemonName.length > 0) {
      setShowSearchBar(true);
    } else {
      setShowSearchBar(false);
    }
  };

  const handleCloseSearch = (event) => {
    const elem = document.querySelector(".searchbar-container");
    if (elem && !elem.contains(event.target)) {
      setShowSearchBar(false);
    }
  };

  const handleSubmitSearch = () => {
    const filterPokemon = pokemon.filter((value, index) => {
      return value.name.toLowerCase().includes(pokemonName.toLowerCase());
    });
    setPokemonFilter(filterPokemon);
    setPokemonEndPoint(12);
    setShowSearchBar(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseSearch);
    return () => {
      document.removeEventListener("mousedown", handleCloseSearch);
    };
  }, []);

  if (!pokemonFullInformation || pokemonFullInformation.length <= 0) {
    return null;
  }

  return (
    <WrapSearchBar className="searchbar-container">
      <input
        type="text"
        value={pokemonName}
        placeholder="Search for Pokemon"
        className="searchbar"
        onClick={() => {
          pokemonName ? setShowSearchBar(true) : setShowSearchBar(false);
        }}
        onChange={(event) => {
          handleSearch(event.target.value);
        }}
        onKeyDown={(event) => event.key === "Enter" && handleSubmitSearch()}
      />
      <div className="wrap-search-image" onClick={() => handleSubmitSearch()}>
        <img src={searchIMG} alt="search-icon" />
      </div>

      {pokemonName && showSearchBar && (
        <div className="pokemon-search-list">
          {pokemonSearchData
            .filter((value) =>
              value.name.toLowerCase().includes(pokemonName.toLowerCase())
            )
            .map((value) => {
              const firstCharUpperCase = value.name.split(" ").map((char) => {
                return char.charAt(0).toUpperCase() + char.substring(1);
              });
              return (
                <div
                  className="pokemon-item"
                  onClick={() => {
                    setPokemonName(value.name);
                    setShowSearchBar(false);
                  }}
                  key={value.name}
                >
                  <div className="pokemon-thumbnail">
                    <LazyLoadImage
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${value.id}.png`}
                      alt={firstCharUpperCase}
                      className="pokemon-sprite"
                      effect="blur"
                      placeholderSrc={spinLoading}
                    />
                  </div>
                  <div className="pokemon-name">
                    <h3>{firstCharUpperCase}</h3>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </WrapSearchBar>
  );
};

const WrapSearchBar = styled.div`
  position: relative;
  width: 90%;
  max-width: 500px;
  margin: 0 auto;

  input {
    width: 100%;
    max-height: 40px;
    outline: none;
    padding: 10px;
    font-size: 21px;
    text-transform: capitalize;
    letter-spacing: 0.5px;
  }

  .wrap-search-image {
    position: absolute;
    right: 0px;
    top: 50%;
    width: 70px;
    height: 97%;
    transform: translateY(-50%);
    background: #b4ebff;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background: #b2ecff;
    }

    img {
      height: 25px;
      width: 25px;
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
    }
  }

  .pokemon-search-list {
    background: #0d1117;
    width: 100%;
    position: absolute;
    z-index: 1;
    max-height: 389px;
    overflow-y: auto;
    ::-webkit-scrollbar {
      width: 12px;
    }
    ::-webkit-scrollbar-track {
      background: #d6dbe4;
    }
    ::-webkit-scrollbar-thumb {
      background: #6a6c71;
    }

    .pokemon-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
      cursor: pointer;
      border-top: none !important;
      border: 1.2px solid #8b949e;
    }
  }
  .pokemon-thumbnail {
    width: 100px;
    height: 100px;
  }
  .pokemon-sprite {
    width: 100%;
    height: 100%;
  }
  .lazy-load-image-background.blur {
    width: 100px;
    height: 100px;
    filter: blur(0.1px);
    background-size: 50% 50% !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
  }
  @media (max-width: 450px) {
    input {
      font-size: 5vw;
    }
  }
`;

export default SearchBar;
