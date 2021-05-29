import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

// Context
import { PokedexContext } from "../context/PokedexContext";

// Images
import pokemonBackground2 from "../images/pokemon_bg2-2.jpg";
import pokemonBackgroundBottom from "../images/main_sp_bg_bottom.jpg";
import pokemonFrontCircleBackground from "../images/pokemon_front_circle_bg.png";
import pokemonBackCircleBackground from "../images/pokemon_back_circle_bg.png";
import maleGender from "../images/icon_male.png";
import femaleGender from "../images/icon_female.png";
import genderless from "../images/genderless-gray.png";

// Loading Image
import loadingIMG from "../images/loading-img/loading250x250-2.gif";
import loadingIMG2 from "../images/loading-img/pokemon-loading6.gif";

// Navigator Images
import navLeft from "../images/arrow_pc_left.png";
import navLeftMobile from "../images/arrow_pc_left_mobile.png";
import arrowLeft from "../images/arrow_left_btn.png";
import arrowLeftActive from "../images/arrow_left_btn_on.png";

import navRight from "../images/arrow_pc_right.png";
import navRightMobile from "../images/arrow_pc_right_mobile.png";
import arrowRight from "../images/arrow_right_btn.png";
import arrowRightActive from "../images/arrow_right_btn_on.png";

const PokemonInfo = () => {
  const { loading, typesColor, pokemonFullInformation } =
    useContext(PokedexContext);

  const [isImgLoading, setIsImgLoading] = useState(true);

  const { id: id_url } = useParams();
  const pokemonIndex = parseInt(id_url - 1);

  const pokemonImage =
    id_url < 10
      ? `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${id_url}.png`
      : id_url < 100
      ? `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${id_url}.png`
      : `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id_url}.png`;

  const prevPokemon = pokemonFullInformation
    ? pokemonFullInformation[pokemonIndex - 1]
    : undefined;
  const nextPokemon = pokemonFullInformation
    ? pokemonFullInformation[pokemonIndex + 1]
    : undefined;
  const errorImg = `/public_images/pokemon-notfound/poke${id_url}.png`;

  const errorCondition =
    !Array.isArray(pokemonFullInformation) ||
    pokemonFullInformation.length <= 0;

  const deleteAnimationBar = () => {
    // Scroll
    let scrollTop = window.pageYOffset;
    let scrollBottom = scrollTop + window.innerHeight;

    const elem = document.querySelector(".wrap-status");
    const elemTop = elem.getBoundingClientRect().top;
    if (scrollBottom < elemTop) {
      if (elem.classList.contains("active")) {
        elem.classList.remove("active");
      }
    }
  };

  useEffect(() => {
    // Scroll
    let scrollTop = window.pageYOffset;
    let scrollBottom = scrollTop + window.innerHeight;

    if (!loading && errorCondition === false) {
      // Elem
      const elem = document.querySelector(".wrap-status");
      const elemTop = elem.getBoundingClientRect().top;
      document.addEventListener("scroll", function () {
        scrollTop = window.pageYOffset;
        scrollBottom = scrollTop + window.innerHeight;
        if (scrollBottom >= elemTop) {
          elem.classList.add("active");
        }
      });
      if (scrollTop === 0) {
        elem.classList.remove("active");
      }
      if (scrollBottom >= elemTop) {
        elem.classList.add("active");
      }
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <WrapPokemonInfoSection className="wrap-pokemon-info-section">
      <PokemonInfoSection className="pokemon-info">
        {errorCondition ? null : (
          <div className="pokemon-info-navigator">
            {prevPokemon && (
              <div className="pokemon-info-navigator-left">
                <img src={navLeft} alt="nav-left" className="nav-left" />
                <div className="prev-pokemon">
                  <div className="id">No.{prevPokemon.id}</div>
                  <div className="name">{prevPokemon.name}</div>
                </div>
                <Link
                  to={`/pokemon/${parseInt(id_url) - 1}`}
                  className="wrap-arrow-left"
                  onClick={() => {
                    setIsImgLoading(true);
                    deleteAnimationBar();
                  }}
                >
                  <img
                    src={arrowLeft}
                    alt="arrow-left"
                    className="arrow-left"
                  />
                  <img
                    src={arrowLeftActive}
                    alt="arrow-left-active"
                    className="arrow-left-active"
                  />
                </Link>
              </div>
            )}

            {nextPokemon && (
              <div className="pokemon-info-navigator-right">
                <img src={navRight} alt="nav-right" className="nav-right" />
                <div className="next-pokemon">
                  <div className="id">No.{nextPokemon.id}</div>
                  <div className="name">{nextPokemon.name}</div>
                </div>
                <Link
                  to={`/pokemon/${parseInt(id_url) + 1}`}
                  className="wrap-arrow-right"
                  onClick={() => {
                    setIsImgLoading(true);
                    deleteAnimationBar();
                  }}
                >
                  <img
                    src={arrowRight}
                    alt="arrow-right"
                    className="arrow-right"
                  />
                  <img
                    src={arrowRightActive}
                    alt="arrow-right-active"
                    className="arrow-right-active"
                  />
                </Link>
              </div>
            )}
          </div>
        )}

        <div className="pokemon-container">
          {loading ? (
            <WrapLoading>
              <img src={loadingIMG} alt="loading-img" />
            </WrapLoading>
          ) : errorCondition ? (
            <ErrorWarning>
              <h4>
                An error has occured,&nbsp;
                <span></span>
                please try again.
              </h4>
            </ErrorWarning>
          ) : (
            <>
              <div className="pokemon-info-section1">
                <div className="wrap-image">
                  <div className="pokemon-info-title">
                    <h3 className="pokemonID">
                      No. {pokemonFullInformation[pokemonIndex].id}
                    </h3>
                    <h1 className="name">
                      {pokemonFullInformation[pokemonIndex].name}
                    </h1>
                  </div>
                  <div className="wrap-pokemon-image">
                    <img
                      src={pokemonFrontCircleBackground}
                      className="pokemon-front-circle-background"
                      alt=""
                    />
                    <img
                      src={pokemonBackCircleBackground}
                      className="pokemon-back-circle-background"
                      alt=""
                    />
                    <img
                      src={isImgLoading ? loadingIMG2 : pokemonImage}
                      className="pokemon-image-info"
                      alt=""
                      onLoad={() => setIsImgLoading(false)}
                      onError={(e) => (e.target.src = errorImg)}
                    />
                  </div>
                </div>
              </div>
              <div className="pokemon-info-section2">
                <div className="info height">
                  <span>Height</span>
                  <div className="wrap-height">
                    <span className="cm">
                      {pokemonFullInformation[pokemonIndex].height.centimeter}{" "}
                      cm
                    </span>
                    <span className="seperate">&nbsp;/&nbsp;</span>
                    <span className="ft">
                      {pokemonFullInformation[pokemonIndex].height.feet} ft
                    </span>
                  </div>
                </div>
                <div className="info weight">
                  <span>Weight</span>
                  <div className="wrap-weight">
                    <span className="kg">
                      {pokemonFullInformation[pokemonIndex].weight.killogram} kg
                    </span>
                    <span className="seperate">&nbsp;/&nbsp;</span>
                    <span className="lbs">
                      {pokemonFullInformation[pokemonIndex].weight.pound} lbs
                    </span>
                  </div>
                </div>
                <div className="info capture-rate">
                  <span>Capture Rate</span>
                  <span>
                    {pokemonFullInformation[pokemonIndex].captureRate}
                  </span>
                </div>
                <div className="info hatch-steps">
                  <span>Hatch Steps</span>
                  <span>{pokemonFullInformation[pokemonIndex].hatchSteps}</span>
                </div>
                <div className="info abilities">
                  <span>Abilities</span>
                  <div className="wrap-abilities">
                    {pokemonFullInformation[pokemonIndex].abilities.map(
                      (ability) => {
                        return <span key={ability}>{ability}</span>;
                      }
                    )}
                  </div>
                </div>
              </div>
              <div className="pokemon-info-section3">
                <div className="types">
                  <h4 className="thicker">Types</h4>
                  <div className="wrap-types">
                    {pokemonFullInformation[pokemonIndex].types.map((type) => {
                      const typeLowerCase = type.toLowerCase();
                      return (
                        <span
                          className="types thicker"
                          style={{
                            backgroundColor: `${typesColor[typeLowerCase]}`,
                          }}
                          key={typeLowerCase}
                        >
                          {type}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="gender-ratio">
                  <h4>Gender Ratio</h4>
                  <div className="wrap-line">
                    {/* Male */}
                    {pokemonFullInformation[pokemonIndex].genderRatio
                      .originalRate > -1 &&
                      pokemonFullInformation[pokemonIndex].genderRatio
                        .maleRate > 0 && (
                        <div
                          className="gender male"
                          style={{
                            width: `${pokemonFullInformation[pokemonIndex].genderRatio.maleRate}%`,
                          }}
                        >
                          <div className="graph">
                            <img src={maleGender} alt="male-gender" />
                          </div>
                        </div>
                      )}

                    {/* Female */}
                    {pokemonFullInformation[pokemonIndex].genderRatio
                      .originalRate > -1 &&
                      pokemonFullInformation[pokemonIndex].genderRatio
                        .femaleRate > 0 && (
                        <div
                          className="gender female"
                          style={{
                            width: `${pokemonFullInformation[pokemonIndex].genderRatio.femaleRate}%`,
                          }}
                        >
                          <div className="graph">
                            <img src={femaleGender} alt="female-gender" />
                          </div>
                        </div>
                      )}

                    {/* Unknown Gender */}
                    {pokemonFullInformation[pokemonIndex].genderRatio
                      .originalRate === -1 && (
                      <div
                        className="gender unknown"
                        style={{
                          width: "100%",
                        }}
                      >
                        <div className="graph">
                          <img src={genderless} alt="genderless" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="ratio-percent">
                    {pokemonFullInformation[pokemonIndex].genderRatio
                      .originalRate >= 0 ? (
                      <>
                        {pokemonFullInformation[pokemonIndex].genderRatio
                          .maleRate > 0 && (
                          <span className="male thicker">
                            Male:&nbsp;
                            {
                              pokemonFullInformation[pokemonIndex].genderRatio
                                .maleRate
                            }
                            %
                          </span>
                        )}

                        {pokemonFullInformation[pokemonIndex].genderRatio
                          .femaleRate > 0 && (
                          <span className="female thicker">
                            Female:&nbsp;
                            {
                              pokemonFullInformation[pokemonIndex].genderRatio
                                .femaleRate
                            }
                            %
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="unknown thicker">
                        None (Unknown Gender)
                      </span>
                    )}
                  </div>
                </div>
                <div className="wrap-group-and-evs">
                  <div className="egg-group">
                    <h4>
                      {pokemonFullInformation[pokemonIndex].egg_groups.length >
                      1
                        ? "Egg Groups"
                        : "Egg Group"}
                    </h4>
                    {pokemonFullInformation[pokemonIndex].egg_groups.length >
                    0 ? (
                      pokemonFullInformation[pokemonIndex].egg_groups.map(
                        (group, index) => {
                          return <span key={group}>{group}</span>;
                        }
                      )
                    ) : (
                      <span>Undiscovered</span>
                    )}
                  </div>
                  <div className="EVs">
                    <h4>EVs</h4>
                    {/* <span>{pokemonFullInformation[pokemonIndex].EVs}</span> */}
                    {pokemonFullInformation[pokemonIndex].EVs.map((evs) => {
                      return <span key={evs}>{evs}</span>;
                    })}
                  </div>
                </div>
              </div>
              <div className="pokemon-info-section4">
                <div className="info description">
                  <h4 className="thicker">Description</h4>
                  <p>{pokemonFullInformation[pokemonIndex].description}</p>
                </div>
              </div>
              <div className="pokemon-info-section5">
                <h4>Status</h4>
                <div className="wrap-status">
                  <div className="status hp">
                    <div className="description">HP:</div>
                    <div className="status-bar">
                      <div
                        className="bar-value"
                        style={{
                          width: `${pokemonFullInformation[pokemonIndex].stats.hp}%`,
                        }}
                      >
                        <div className="bar-value2">
                          <span className="text-value">
                            {pokemonFullInformation[pokemonIndex].stats.hp}
                          </span>
                        </div>
                        <span className="dummy-block">2</span>
                      </div>
                    </div>
                  </div>

                  <div className="status attack">
                    <div className="description">Attack:</div>
                    <div className="status-bar">
                      <div
                        className="bar-value"
                        style={{
                          width: `${pokemonFullInformation[pokemonIndex].stats.attack}%`,
                        }}
                      >
                        <div className="bar-value2">
                          <span className="text-value">
                            {pokemonFullInformation[pokemonIndex].stats.attack}
                          </span>
                        </div>
                        <span className="dummy-block">2</span>
                      </div>
                    </div>
                  </div>
                  <div className="status defense">
                    <div className="description">Defense:</div>
                    <div className="status-bar">
                      <div
                        className="bar-value"
                        style={{
                          width: `${pokemonFullInformation[pokemonIndex].stats.defense}%`,
                        }}
                      >
                        <div className="bar-value2">
                          <span className="text-value">
                            {pokemonFullInformation[pokemonIndex].stats.defense}
                          </span>
                        </div>
                        <span className="dummy-block">2</span>
                      </div>
                    </div>
                  </div>

                  <div className="status speed">
                    <div className="description">Speed:</div>
                    <div className="status-bar">
                      <div
                        className="bar-value"
                        style={{
                          width: `${pokemonFullInformation[pokemonIndex].stats.speed}%`,
                        }}
                      >
                        <div className="bar-value2">
                          <span className="text-value">
                            {pokemonFullInformation[pokemonIndex].stats.speed}
                          </span>
                        </div>
                        <span className="dummy-block">2</span>
                      </div>
                    </div>
                  </div>

                  <div className="status special-attack">
                    <div className="description">Special Attack:</div>
                    <div className="status-bar">
                      <div
                        className="bar-value"
                        style={{
                          width: `${pokemonFullInformation[pokemonIndex].stats["special-attack"]}%`,
                        }}
                      >
                        <div className="bar-value2">
                          <span className="text-value">
                            {
                              pokemonFullInformation[pokemonIndex].stats[
                                "special-attack"
                              ]
                            }
                          </span>
                        </div>
                        <span className="dummy-block">2</span>
                      </div>
                    </div>
                  </div>

                  <div className="status special-defense">
                    <div className="description">Special Defense:</div>
                    <div className="status-bar">
                      <div
                        className="bar-value"
                        style={{
                          width: `${pokemonFullInformation[pokemonIndex].stats["special-defense"]}%`,
                        }}
                      >
                        <div className="bar-value2">
                          <span className="text-value">
                            {
                              pokemonFullInformation[pokemonIndex].stats[
                                "special-defense"
                              ]
                            }
                          </span>
                        </div>
                        <span className="dummy-block">2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="return-button">
                <Link to="/">Home</Link>
              </div>
            </>
          )}
        </div>
        <div className="background-bottom"></div>
      </PokemonInfoSection>
    </WrapPokemonInfoSection>
  );
};

const WrapLoading = styled.div`
  position: relative;
  top: 24vw;
  img {
    display: block;
    margin: 0 auto;
  }

  @media (max-width: 968px) {
    top: 20vw;
  }

  @media (max-width: 400px) {
    img {
      width: 50vw;
    }
  }
`;
const WrapPokemonInfoSection = styled.div`
  max-height: 290vw;
  /* Android Only */
  @media (min-resolution: 192dpi) {
    @media (orientation: landscape) {
      height: 300vw;
    }
  }
`;
const PokemonInfoSection = styled.section`
  position: relative;
  background-image: url(${pokemonBackground2});
  background-repeat: no-repeat;
  background-position: top;
  background-size: 100% auto;
  top: -8vw;
  min-height: 70vw;

  .pokemon-info-navigator {
    position: absolute;
    padding-top: 14%;
    width: 100%;

    .prev-pokemon,
    .next-pokemon {
      font-size: 1.8vw;
      letter-spacing: 1px;
    }
    .id {
      color: #b3eafe;
    }
    .name {
      text-transform: capitalize;
      margin-left: 10px;
    }
    .pokemon-info-navigator-left {
      position: absolute;
      top: 100%;
      left: 0;

      .prev-pokemon {
        position: absolute;
        display: flex;
        top: 15%;
        right: -30%;
        width: 100%;
      }
      .nav-left {
        width: 30vw;
        height: auto;
      }
      .arrow-left {
        position: absolute;
        top: 15%;
        left: 7%;
        width: 5vw;
        height: 5vw;
        cursor: pointer;
        z-index: 1;
      }
      .arrow-left-active {
        position: absolute;
        top: 15%;
        left: 7%;
        width: 5vw;
        height: 5vw;
        cursor: pointer;
        z-index: 1;
        opacity: 0;
        transition: 0.3s;
        &:hover {
          opacity: 1;
        }
      }
    }
    .pokemon-info-navigator-right {
      position: absolute;
      top: 100%;
      right: 0;
      .next-pokemon {
        position: absolute;
        display: flex;
        top: 15%;
        left: 20%;
      }
      .nav-right {
        width: 30vw;
        height: auto;
      }
      .arrow-right {
        position: absolute;
        top: 15%;
        right: 7%;
        width: 5vw;
        height: 5vw;
        cursor: pointer;
        z-index: 1;
      }
      .arrow-right-active {
        position: absolute;
        top: 15%;
        right: 7%;
        width: 5vw;
        height: 5vw;
        cursor: pointer;
        z-index: 1;
        opacity: 0;
        transition: 0.3s;
        &:hover {
          opacity: 1;
        }
      }
    }
  }

  .pokemon-header-title {
    position: absolute;
    top: 10%;
    z-index: 1;
    width: 100%;
    a {
      color: inherit;
      text-decoration: none;
    }
  }
  .pokemon-info-section1 {
    position: relative;
    padding-top: 15%;

    .name {
      text-transform: capitalize;
    }
    .pokemon-info-title {
      position: absolute;
      top: -5%;
      width: 100%;
      text-align: center;
      z-index: 1;
      .pokemonID {
        color: #b3eafe;
      }
      .name {
        font-size: 3.5vw;
        letter-spacing: 0.5px;
        color: #fff;
        text-shadow: 0 0 3px #000, 2px 2px 7px #9be1ff, -2px -2px 7px #9be1ff;
      }
    }
    .wrap-image {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);

      .wrap-pokemon-image {
        position: relative;
        top: 0vw;
      }
      .pokemon-front-circle-background {
        width: 42.5vw;
        height: 39.5vw;
        animation: rotateImage 3s linear infinite;
      }
      .pokemon-back-circle-background {
        position: absolute;
        padding-top: 12%;
        left: 50%;
        transform: translateX(-50%);
        height: 34vw;
        width: auto;
      }
      .pokemon-image-info {
        position: absolute;
        padding-top: 18%;
        left: 50%;
        transform: translateX(-50%);
        height: 30vw;
      }
    }
  }
  .pokemon-info-section2 {
    position: absolute;
    top: 182%;
    right: -18%;
    width: 40vw;
    display: flex;
    flex-wrap: wrap;
    .info {
      display: grid;
      grid-template-columns: 1fr;
      flex-basis: 35%;
      margin-bottom: 10px;
      span {
        font-size: 1.5vw;
        color: #b3eafe;
        letter-spacing: 0.5px;
      }
      span:nth-child(2) {
        font-size: 1.4vw;
        color: #fff;
      }
    }
    .info:nth-child(odd) {
      flex-basis: 30%;
    }
    .info:nth-child(even) {
      flex-basis: 70%;
    }
    .info .seperate {
      display: none;
    }
    .info {
      .wrap-height {
        display: grid;
        grid-template-columns: 1fr;
      }
      .wrap-weight {
        display: grid;
        grid-template-columns: 1fr;
      }
      .cm,
      .ft {
        position: relative;
        left: 13px;
        padding-left: 0.5vw;
        &:before {
          content: "-";
          position: absolute;
          left: -13px;
        }
      }
      .kg,
      .lbs {
        position: relative;
        left: 13px;
        padding-left: 0.5vw;
        &:before {
          content: "-";
          position: absolute;
          left: -13px;
        }
      }
    }
    .wrap-height {
      span {
        color: #fff !important;
      }
    }
    .wrap-weight {
      span {
        color: #fff !important;
      }
    }
    .abilities {
      flex-basis: 100% !important;
      .wrap-abilities {
        max-width: 20vw;
        line-height: 1.5vw;
        span {
          position: relative;
          font-size: 1.4vw;
          color: #fff;
          &:after {
            content: ", ";
          }
        }
        span:last-child {
          &:after {
            content: none;
          }
        }
      }
    }
  }
  .pokemon-info-section3 {
    position: absolute;
    top: 165%;
    .types {
      h4 {
        color: #b3eafe;
        letter-spacing: 0.5px;
        font-size: 1.9vw;
      }
      .wrap-types {
        margin-top: 2vw;
        span {
          font-size: 1.3vw;
          padding: 1vw 2vw;
          margin-right: 1.1vw;
          border-radius: 25px;
        }
      }
    }
    .gender-ratio {
      margin-top: 7%;
      width: 25vw;
      h4 {
        color: #b3eafe;
        letter-spacing: 0.5px;
        font-size: 1.9vw;
      }
      .wrap-line {
        display: flex;
        flex-wrap: wrap;
        height: 2.5vw;
        .gender {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
          img {
            height: 2vw;
            width: 2vw;
          }
          span {
            font-size: 1.4vw;
            letter-spacing: 0.5px;
          }
        }
        .male {
          background: #3355ff;
          height: 100%;
        }
        .female {
          background: #c2185b;
          position: relative;
          top: 0.6px;
          height: 100%;
        }
        .unknown {
          background: dimgray;
          height: 30px;
        }
      }
      .ratio-percent {
        span {
          font-size: 1.25vw;
          letter-spacing: 0.5px;
          margin-right: 2vw;
        }
      }
      .graph {
        display:flex;
        justify-content: center;
        align-items: center;
      }
    }
    .wrap-group-and-evs {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2vw;
      margin-top: 5%;
      .egg-group {
        h4 {
          color: #b3eafe;
          letter-spacing: 0.5px;
          font-size: 1.9vw;
          margin-bottom: 0.5vw;
        }
        span {
          font-size: 1.4vw;
          &:after {
            content: ", ";
          }
        }
        span:last-child {
          &:after {
            content: none;
          }
        }
      }
      .EVs {
        h4 {
          color: #b3eafe;
          letter-spacing: 0.5px;
          font-size: 1.9vw;
          margin-bottom: 0.5vw;
        }
        span {
          font-size: 1.4vw;
          &:after {
            content: ", ";
          }
        }
        span:last-child {
          &:after {
            content: none;
          }
        }
      }
    }
  }
  .pokemon-info-section4 {
    position: absolute;
    top: 380%;
    .description {
      h4 {
        color: #b3eafe;
        letter-spacing: 0.5px;
        font-size: 1.9vw;
      }
      p {
        font-size: 1.3vw;
        max-width: 28vw;
      }
    }
  }
  .pokemon-info-section5 {
    position: absolute;
    top: 54.2vw;
    right: 0%;
    h4 {
      color: #b3eafe;
      letter-spacing: 0.5px;
      font-size: 1.9vw;
      position: absolute;
      top: -2.8vw;
      right: 45%;
    }
    .wrap-status {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 3vw;
      margin-top: 3vw;

      .status {
        display: grid;
        grid-template-columns: 11vw 1fr;
        align-items: center;
        margin-bottom: 4%;
        .description {
          font-size: 1.3vw;
          letter-spacing: 0.5px;
        }
        .status-bar {
          width: 12vw;
          height: 1.5vw;
          .bar-value {
            position: relative;
            text-align: center;

            height: 100%;
            max-width: 100%;
            border-radius: 10px;
            transition: 1s;

            .bar-value2 {
              position: absolute;
              width: 100%;
              height: 100%;
              background: indianred;
              border-radius: 10px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .text-value {
              position: relative;
              font-size: 1.2vw;
              text-shadow: 0 1px 0 black, 0 0 1px rgb(0, 0, 0),
                0 0 2px rgb(0, 0, 0), 0 0 3px rgb(0, 0, 0), 0 0 4px rgb(0, 0, 0);
            }
            .dummy-block {
              visibility: hidden;
              opacity: 0;
            }
          }
        }
      }
    }
    .wrap-status.active .bar-value2 {
      animation: increaseBar 1s;
    }
  }

  .return-button {
    position: absolute;
    top: 520%;
    width: 100%;
    text-align: center;
    a {
      color: #fff;
      background: transparent;
      text-decoration: none;
      padding: 10px 50px;
      border-radius: 20px;
      border: 2px solid #436a96;
      transition: 0.3s;
      font-size: 2.2vw;
      letter-spacing: 1px;
      &:hover {
        background: #000;
      }
    }
  }

  .background-bottom {
    display: none;
    position: absolute;
    background: url(${pokemonBackgroundBottom}) no-repeat;
    height: 100%;
    width: 100%;
    top: 227vw;
    background-size: 100% auto;
  }

  /* Animation */
  @keyframes rotateImage {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(1turn);
    }
  }
  @keyframes increaseBar {
    0% {
      width: 0px;
    }
    100% {
      width: 100%;
    }
  }

  /* Media Responsive */
  @media (max-width: 1333px) {
    min-height: 70vw;
    .pokemon-info-section5 h4 {
      top: -3vw;
    }
  }
  @media (max-width: 1339px) and (min-height: 935px) {
    .pokemon-info-section5 {
      top: 54.8vw;
    }
  }

  @media (max-width: 1300px) {
    .return-button {
      top: 540%;
      padding: 0 0 50px 0;
    }
  }
  @media (max-width: 1000px) {
    .pokemon-info-section5 h4 {
      top: -3.1vw;
    }
  }
  @media (max-width: 900px) {
    top: -3vw;
    .pokemon-info-section1 .pokemon-info-title {
      top: -22%;
    }
    .wrap-group-and-evs h4 {
      margin: 0 !important;
    }
  }

  @media (max-width: 850px) {
    min-height: 70vw;
  }

  @media (max-width: 800px) {
    .return-button {
      top: 535%;
    }
  }
  @media (max-width: 768px) {
    .nav-left {
      background: url(${navLeftMobile});
      padding: 12vw;
      background-size: contain;
      background-position: initial;
      background-repeat: no-repeat;
      width: 0 !important;
      height: 0 !important;
    }
    .nav-right {
      background: url(${navRightMobile});
      padding: 12vw;
      background-size: contain;
      background-position: initial;
      background-repeat: no-repeat;
      width: 0 !important;
      height: 0 !important;
    }
    .pokemon-info-navigator .id,
    .pokemon-info-navigator .name {
      display: none;
    }
    .pokemon-info-navigator .pokemon-info-navigator-left .arrow-left,
    .pokemon-info-navigator .pokemon-info-navigator-left .arrow-left-active {
      top: 12%;
      left: 3%;
      width: 8vw;
      height: 8vw;
    }
    .pokemon-info-navigator .pokemon-info-navigator-right .arrow-right,
    .pokemon-info-navigator .pokemon-info-navigator-right .arrow-right-active {
      top: 12%;
      right: 3%;
      width: 8vw;
      height: 8vw;
    }
    .pokemon-info-section3 .gender-ratio .wrap-line {
      height: 5.5vw;
    }
    .pokemon-info-section3 .gender-ratio .wrap-line .gender img {
      height: 4vw;
      width: 4vw;
    }
    .pokemon-info-section5 .wrap-status .status .status-bar {
      height: 3vw;
    }
  }
`;

const ErrorWarning = styled.section`
  position: absolute;
  top: 30vw;
  right: 28vw;
  h4 {
    font-size: 2.2vw;
  }
  @media (max-width: 768px) {
    position: absolute;
    top: 30vw;
    right: -2vw;
    width: 100%;
    text-align: center;
    h4 {
      font-size: 7vw;
      letter-spacing: 1px;
      span {
        display: block;
      }
    }
  }
`;

export default PokemonInfo;
