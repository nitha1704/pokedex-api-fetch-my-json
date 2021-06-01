import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { animateScroll as scroll } from "react-scroll";
import { PokedexContext } from "../context/PokedexContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../../node_modules/react-lazy-load-image-component/src/effects/blur.css";

// Background
import PokemonCardBackground from "../images/pokemon_card_bg.png";
// Loading Image
import loadingIMG from "../images/loading-img/loading2-small.gif";
// Go Top Button
import topButton from "../images/arrowtop-removebg-preview.png";

const PokemonCard = ({ pokemonFilter }) => {
  const {
    pokemonEndPoint,
    setPokemonEndPoint,
    typesColor,
    scrollTopPosition,
    setScrollTopPosition,
  } = useContext(PokedexContext);
  const [pokemonChildrenLength, setPokemonChildrenLength] = useState(0);
  const handleFirstRender = useRef(true);
  const wrapPokemonItem = useRef(null);

  const handleLoadingMore = () => {
    setPokemonEndPoint(pokemonEndPoint + 12);
    const wrapPokeCard = wrapPokemonItem.current;
    const elem = wrapPokeCard.children[wrapPokeCard.children.length - 1];
    const elemTop = elem.offsetTop;
    const elemBottom = elemTop + elem.offsetHeight;
    scroll.scrollTo(elemBottom + 110, {
      duration: 500,
      delay: 300,
      smooth: true,
    });
  };

  const goTop = () => {
    scroll.scrollTo(0, {
      duration: 1500,
      delay: 100,
      smooth: true,
    });
  };

  useEffect(() => {
    if (handleFirstRender.current === true) {
      handleFirstRender.current = false;
    } else {
      if (pokemonFilter.length > 0) {
        setPokemonChildrenLength(wrapPokemonItem.current.children.length);
      }
    }
  }, [pokemonEndPoint, pokemonFilter]);

  useEffect(() => {
    window.scrollTo(0, scrollTopPosition);
  }, [scrollTopPosition]);

  if (!pokemonFilter || !Array.isArray(pokemonFilter)) {
    return (
      <NotFoundPokemon>
        <div className="wrap-notfound-pokemon">
          <h2>500: Internal Server Error, please try again.</h2>
        </div>
      </NotFoundPokemon>
    );
  }

  if (pokemonFilter.length === 0) {
    return (
      <NotFoundPokemon>
        <div className="wrap-notfound-pokemon">
          <h2>No Pokemon Match Your Search</h2>
        </div>
      </NotFoundPokemon>
    );
  }
  return (
    <>
      <WrapGoTopButton onClick={() => goTop()} className="go-top-btn" />
      <PokemonRow className="pokemon-row" ref={wrapPokemonItem}>
        {pokemonFilter.slice(0, pokemonEndPoint).map((value, index) => {
          const { id, name, types } = value;

          const pokemonImage =
            id < 10
              ? `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${id}.png`
              : id < 100
              ? `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0${id}.png`
              : `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`;

          const firstCharUpperCaseName = name
            .split(" ")
            .map((char) => {
              return char.charAt(0).toUpperCase() + char.substring(1);
            })
            .join("");

          const errorIMG = `./public_images/notfound1.png`;

          return (
            <PokeCard key={id} id={id} className="pokemon-card">
              <Link
                to={`/pokemon/${id}`}
                onClick={() => setScrollTopPosition(window.pageYOffset)}
              >
                <div className="wrap-image">
                  <LazyLoadImage
                    src={pokemonImage}
                    className="pokemon-image img-fit"
                    height="100"
                    width="100"
                    placeholderSrc={loadingIMG}
                    effect="blur"
                    threshold="10"
                    onError={(event) => (event.target.src = errorIMG)}
                  />
                </div>
                <div className="wrap-info">
                  <h4 className="number">No. {id}</h4>
                  <h3 className="name">{firstCharUpperCaseName}</h3>
                </div>
                <div className="wrap-types">
                  {types.map((item, index) => {

                    return (
                      <span
                        className="types thicker"
                        style={{ backgroundColor: typesColor[item.toLowerCase()] }}
                        key={index}
                      >
                        {item}
                      </span>
                    );
                  })}
                </div>
              </Link>
            </PokeCard>
          );
        })}
      </PokemonRow>

      <LoadingMore className="loading-more-button">
        <div className="wrap-button">
          {pokemonChildrenLength >= pokemonFilter.length ? (
            <button className="no-more-item">No More Item</button>
          ) : (
            <button
              className="loading-more"
              onClick={() => handleLoadingMore()}
            >
              Loading More...
            </button>
          )}
        </div>
      </LoadingMore>
    </>
  );
};

const PokemonRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 20px;
  column-gap: 10px;
  padding-top: 17px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 450px) {
    grid-template-columns: 1fr;
  }
`;

const PokeCard = styled.div`
  position: relative;
  background-image: url("${PokemonCardBackground}");
  background-size: auto 100%;
  background-position: center;
  background-repeat: no-repeat;
  height: 36vw;

  a {
    color: inherit;
    display: block;
    width: 100%;
    height: 100%;
  }

  .wrap-image {
    position: absolute;
    top: 10.5%;
    left: 50%;
    transform: translateX(-50%);
  }

  .wrap-info {
    position: absolute;
    top: 60%;
    left: 10%;
    text-align: left;
    .number {
      font-size: 2vw;
    }
    .name {
      font-size: 2vw;
      letter-spacing: 0.5px;
    }
  }
  .wrap-types {
    position: absolute;
    bottom: 10%;
    left: 10%;
    .types {
      margin-right: 15px;
      padding: 10px 20px;
      border-radius: 20px;
      font-size: 1.2vw;
      letter-spacing: 0.5px;
    }
  }
  .lazy-load-image-background.blur {
    width: 12vw;
    height: 12vw;
    filter: blur(0.1px);
  }

  @media (max-width: 992px) {
    height: 46vw;
    .wrap-image {
      top: 11.5%;
      .lazy-load-image-background.blur {
        width: 15vw;
        height: 15vw;
      }
    }
    .number {
      font-size: 2.7vw !important;
    }
    .name {
      font-size: 2.8vw !important;
    }
    .types {
      font-size: 1.8vw !important;
    }
  }
  @media (max-width: 768px) {
    height: 70vw;
    .wrap-image {
      top: 11.5%;
      .lazy-load-image-background.blur {
        width: 23vw;
        height: 23vw;
      }
    }
    .number {
      font-size: 3.7vw !important;
    }
    .name {
      font-size: 3.8vw !important;
    }
    .types {
      font-size: 2.8vw !important;
    }
  }
  @media (max-width: 450px) {
    height: 140vw;
    .wrap-image {
      top: 11.5%;
      .lazy-load-image-background.blur {
        width: 43vw;
        height: 43vw;
      }
    }
    .number {
      font-size: 5.7vw !important;
    }
    .name {
      font-size: 5.8vw !important;
    }
    .types {
      font-size: 4.8vw !important;
    }
  }
`;

const NotFoundPokemon = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  .wrap-notfound-pokemon {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 50px;
    background: #0a141e;
    border: 2px solid #466e9b;
    border-radius: 20px;
  }

  h2 {
    letter-spacing: 1px;
  }
`;

const LoadingMore = styled.div`
  margin: 30px 0;
  button.no-more-item {
    color: #fff;
    font-size: 22px;
    letter-spacing: 1px;
    background: gray;
    padding: 10px 20px;
    border: 2px solid gray;
    border-radius: 50px;
    outline: none;
    cursor: no-drop;
  }
  button.loading-more {
    color: #fff;
    font-size: 22px;
    letter-spacing: 1px;
    background: transparent;
    padding: 10px 20px;
    border: 2px solid #436a96;
    border-radius: 50px;
    outline: none;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background: #000;
    }
  }
`;

const WrapGoTopButton = styled.div`
  background: url(${topButton});
  background-size: cover;
  background-position: 0px;
  position: fixed;
  top: 0;
  right: 3px;
  width: 50px;
  height: 50px;
  border: 2px solid white;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
`;

export default PokemonCard;
