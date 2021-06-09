import React, { useState, useEffect, createContext, useCallback } from "react";
import axios from "axios";

const PokedexContext = createContext();
const GlobalContext = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [pokemonName, setPokemonName] = useState("");
  const [pokemonEndPoint, setPokemonEndPoint] = useState(12);

  // Pokemon Data
  const [pokemon, setPokemon] = useState([]);
  const [pokemonFilter, setPokemonFilter] = useState([]);
  const [pokemonSearchData, setPokemonSearchData] = useState([]);

  // Single Page Pokemon Data
  const [pokemonFullInformation, setPokemonFullInformation] = useState([]);

  // Scroll Top Position
  const [scrollTopPosition, setScrollTopPosition] = useState(0);

  // Types Color
  const typesColor = {
    grass: "#66f609",
    fire: "#fb0b0a",
    water: "#35aef5",
    normal: "#cbc8a9",
    flying: "#075663",
    bug: "#90b92d",
    poison: "#60127f",
    electric: "#fef923",
    ground: "#beab20",
    fighting: "#7f0a10",
    psychic: "#890431",
    rock: "#93824e",
    ice: "#65d0e4",
    ghost: "#462a52",
    dragon: "#8954fc",
    dark: "#2c211b",
    steel: "#bac4c3",
    fairy: "#fe9fc1",
  };

  const getData = useCallback(async () => {
    setLoading(true);

    const pokemonData = await axios
      .get(
        "https://pokedex-api-customized.netlify.app/newPokemonDataMinify.json"
      )
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      });

      console.log(pokemonData);

    const pokemonFullData = Array.isArray(pokemonData)
      ? pokemonData.map((item) => {
          return {
            id: item.id,
            name: item.name,
            height: {
              decimetres: item.height,
              centimeter: item.height * 10,
              feet: Number(item.height * 0.328084).toFixed(2),
            },
            weight: {
              killogram: Math.round(item.weight * 0.1),
              pound: Number(item.weight * 0.220462).toFixed(2),
            },
            captureRate: Math.round((100 / 255) * item.capture_rate), //convert to percentage
            genderRatio: {
              originalRate: item.gender_rate,
              femaleRate: item.gender_rate * 12.5,
              maleRate: (8 - item.gender_rate) * 12.5,
            },
            hatchSteps: 255 * (item.hatch_counter + 1),
            description: item.flavor_text_entries[0],
            EVs: item.EVs,
            abilities: item.abilities,
            egg_groups: item.egg_groups,
            stats: item.stats,
            types: item.types,
          };
        })
      : undefined;

    if (pokemonData) {
      // Pokemon Global Data
      setPokemon(pokemonData);
      setPokemonFilter(pokemonData);
      setPokemonSearchData(pokemonData);
      // Pokemon Single Page Data
      setPokemonFullInformation(pokemonFullData);
    } else {
      setPokemonFilter(undefined);
      setPokemonSearchData([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <PokedexContext.Provider
      value={{
        loading,
        setLoading,
        pokemon,
        setPokemon,
        pokemonSearchData,
        setPokemonSearchData,
        pokemonName,
        setPokemonName,
        pokemonFilter,
        setPokemonFilter,
        pokemonEndPoint,
        setPokemonEndPoint,

        // Pokemon Single Page Data
        pokemonFullInformation,
        // Types Color
        typesColor,

        // Scroll Top Position
        scrollTopPosition,
        setScrollTopPosition,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
};

export { PokedexContext, GlobalContext };
