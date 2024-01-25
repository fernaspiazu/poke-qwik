import {
  $,
  component$,
  useOnDocument,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { getSmallPokemons } from "~/helpers/get-small-pokemon";
import type { SmallPokemon } from "~/interfaces";

interface PokemonPageState {
  currentPage: number;
  isLoading: boolean;
  pokemons: SmallPokemon[];
}

export default component$(() => {
  const pokemonState = useStore<PokemonPageState>({
    currentPage: 0,
    isLoading: false,
    pokemons: [],
  });

  // used only by the client
  // useVisibleTask$(async ({ track }) => {
  //   track(() => pokemonState.currentPage);

  //   const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
  //   // pokemonState.pokemons = pokemons;
  //   pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
  // });

  useTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);

    const pokemons = await getSmallPokemons(pokemonState.currentPage * 10, 30);
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];

    pokemonState.isLoading = false;
  });

  useOnDocument(
    "scroll",
    $(() => {
      const maxScroll = document.body.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight;

      if (currentScroll + 200 > maxScroll && !pokemonState.isLoading) {
        pokemonState.isLoading = true;
        pokemonState.currentPage++;
      }
    }),
  );

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Current page: {pokemonState.currentPage}</span>
        <span>Loading page: </span>
      </div>

      <div class="mt-10">
        {/* <button
          onClick$={() => pokemonState.currentPage--}
          class="btn btn-primary mr-2"
        >
          Previous
        </button> */}
        <button
          onClick$={() => pokemonState.currentPage++}
          class="btn btn-primary mr-2"
        >
          Next
        </button>
      </div>

      <div class="mt-5 grid sm:grid-cols-2 md:grid-cols-6 xl:grid-cols-7">
        {pokemonState.pokemons.map(({ id, name }) => (
          <div key={name} class="m-5 flex flex-col items-center justify-center">
            <PokemonImage id={id} isVisible />
            <span class="capitalize">{name}</span>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "List Client",
};
