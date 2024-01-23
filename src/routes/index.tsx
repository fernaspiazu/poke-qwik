import { $, component$, useSignal } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

export default component$(() => {
  const pokemonId = useSignal(1); // usar para tipos primitivos (string, number, boolean, etc)
  const showBackImage = useSignal(false);
  const isPokemonVisible = useSignal(false);

  const nav = useNavigate();

  const changePokemonId = $((value: number) => {
    if (pokemonId.value + value <= 0) return;
    pokemonId.value += value;
  });

  const flipPokemon = $(() => (showBackImage.value = !showBackImage.value));
  const unveilPokemon = $(
    () => (isPokemonVisible.value = !isPokemonVisible.value),
  );

  const goToPokemon = $(() => {
    nav(`pokemon/${pokemonId.value}`);
  });

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemonId}</span>

      <div onClick$={() => goToPokemon()}>
        <PokemonImage
          id={pokemonId.value}
          backImage={showBackImage.value}
          isVisible={isPokemonVisible.value}
        />
      </div>

      <div class="mt-2">
        <button
          onClick$={() => changePokemonId(-1)}
          class="btn btn-primary mr-2"
        >
          Anterior
        </button>
        <button
          onClick$={() => changePokemonId(1)}
          class="btn btn-primary mr-2"
        >
          Siguiente
        </button>
        <button onClick$={() => flipPokemon()} class="btn btn-primary mr-2">
          Voltear
        </button>
        <button onClick$={() => unveilPokemon()} class="btn btn-primary mr-2">
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
