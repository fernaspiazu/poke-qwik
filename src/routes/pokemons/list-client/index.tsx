import { component$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import type { SmallPokemon } from "~/interfaces";

interface PokemonPageState {
  currentPage: number;
  pokemons: SmallPokemon[];
}

export default component$(() => {
  const pokemonState = useStore<PokemonPageState>({
    currentPage: 0,
    pokemons: [],
  });

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Current page: {pokemonState.currentPage}</span>
        <span>Loading page: </span>
      </div>

      <div class="mt-10">
        <button
          onClick$={() => pokemonState.currentPage--}
          class="btn btn-primary mr-2"
        >
          Previous
        </button>
        <button
          onClick$={() => pokemonState.currentPage++}
          class="btn btn-primary mr-2"
        >
          Next
        </button>
      </div>

      <div class="mt-5 grid grid-cols-5">
        {/* {pokemonResponse.value.map(({ id, name }) => (
          <div key={name} class="m-5 flex flex-col items-center justify-center">
            <PokemonImage id={id} isVisible />
            <span class="capitalize">{name}</span>
          </div>
        ))} */}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "List Client",
};
