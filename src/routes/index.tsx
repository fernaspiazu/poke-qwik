import { $, component$ } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { usePokemonGame } from "~/hooks/use-pokemon-game";

export default component$(() => {
  const nav = useNavigate();

  const goToPokemon = $((id: number) => {
    nav(`/pokemon/${id}`);
  });

  const {
    isPokemonVisible,
    showBackImage,
    nextPokemon,
    pokemonId,
    prevPokemon,
    toggleVisible,
    toggleFromBack,
  } = usePokemonGame();

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemonId}</span>

      <div onClick$={() => goToPokemon(pokemonId.value)}>
        <PokemonImage
          id={pokemonId.value}
          backImage={showBackImage.value}
          isVisible={isPokemonVisible.value}
        />
      </div>

      <div class="mt-2">
        <button onClick$={prevPokemon} class="btn btn-primary mr-2">
          Anterior
        </button>
        <button onClick$={nextPokemon} class="btn btn-primary mr-2">
          Siguiente
        </button>
        <button onClick$={toggleFromBack} class="btn btn-primary mr-2">
          Voltear
        </button>
        <button onClick$={toggleVisible} class="btn btn-primary mr-2">
          {isPokemonVisible.value ? "Esconder" : "Revelar"}
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "This is my first application in Qwik",
    },
  ],
};
