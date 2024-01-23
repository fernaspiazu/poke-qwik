import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

export default component$(() => {
  const location = useLocation();

  const pokemonId = location.params.id;

  return (
    <>
      <span class="text-5xl">Pokemon: {location.params.id} </span>
      <PokemonImage id={pokemonId} />
    </>
  );
});
