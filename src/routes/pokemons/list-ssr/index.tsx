import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { type PokemonListResponse } from "~/interfaces";

export const usePokemonList = routeLoader$(async () => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=10&offset=10`,
  );

  const data = (await response.json()) as PokemonListResponse;

  return data.results;
});

export default component$(() => {
  const pokemonResponse = usePokemonList();

  console.log(pokemonResponse.value);

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Current Offset: xxx</span>
        <span>Loading page: xxx</span>
      </div>

      <div class="mt-10">
        <Link class="btn btn-primary mr-2">Anteriores</Link>
        <Link class="btn btn-primary mr-2">Siguientes</Link>
      </div>

      <div class="mt-5 grid grid-cols-5">
        {pokemonResponse.value.map(({ name }) => (
          <div key={name} class="m-5 flex flex-col items-center justify-center">
            <span class="capitalize">{name}</span>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "List SSR",
};
