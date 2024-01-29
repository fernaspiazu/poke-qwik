import {
  Slot,
  component$,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";

import {
  type PokemonGameState,
  PokemonGameContext,
} from "./pokemon-game.context";

import {
  type PokemonListState,
  PokemonListContext,
} from "./pokemon-list.context";

export const PokemonProvider = component$(() => {
  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 1,
    isPokemonVisible: true,
    showBackImage: false,
  });

  const pokemonList = useStore<PokemonListState>({
    currentPage: 1,
    isLoading: false,
    pokemons: [],
  });

  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(PokemonListContext, pokemonList);

  return <Slot />;
});
