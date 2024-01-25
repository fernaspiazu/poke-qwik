import { component$, useComputed$ } from "@builder.io/qwik";
import {
  Link,
  type DocumentHead,
  routeLoader$,
  useLocation,
} from "@builder.io/qwik-city";
import type { BasicPokemonInfo, PokemonListResponse } from "~/interfaces";

export const usePokemonList = routeLoader$<BasicPokemonInfo[]>(
  async ({ query, redirect, pathname }) => {
    const offset = Number(query.get("offset"));

    if (offset < 0) {
      throw redirect(308, pathname);
    }

    if (isNaN(offset)) {
      throw redirect(308, pathname);
    }

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`,
    );

    const data = (await response.json()) as PokemonListResponse;

    return data.results;
  },
);

export default component$(() => {
  const pokemonResponse = usePokemonList();
  const location = useLocation();

  const currentOffset = useComputed$<number>(() => {
    // const offsetString = location.url.searchParams.get('offset');
    const offsetString = new URLSearchParams(location.url.search);
    return Number(offsetString.get("offset") || 0);
  });

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Current Offset: {currentOffset}</span>
        <span>Loading page: {location.isNavigating ? "Yes" : "No"}</span>
      </div>

      <div class="mt-10">
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
          class="btn btn-primary mr-2"
        >
          Previous
        </Link>
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
          class="btn btn-primary mr-2"
        >
          Next
        </Link>
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
