import {
  $,
  component$,
  useContext,
  useOnDocument,
  useSignal,
  useStore,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { Modal } from "~/components/shared";
import { PokemonListContext } from "~/context";
import { getFunFactAboutPokemon } from "~/helpers/get-chat-gpt-response";
import { getSmallPokemons } from "~/helpers/get-small-pokemon";

export default component$(() => {
  const pokemonState = useContext(PokemonListContext);

  useTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);

    const pokemons = await getSmallPokemons(pokemonState.currentPage * 10, 30);
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
    pokemonState.isLoading = false;
  });

  const modalVisible = useSignal(false);
  const modalPokemon = useStore({
    id: "",
    name: "",
  });

  const chatGptPokemonFact = useSignal("");

  // Modal functions
  const showModal = $((id: string, name: string) => {
    modalPokemon.id = id;
    modalPokemon.name = name;
    modalVisible.value = true;
  });

  const closeModal = $(() => {
    modalVisible.value = false;
  });

  // TODO: test async
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => modalPokemon.name);

    chatGptPokemonFact.value = "";

    if (modalPokemon.name.length > 0) {
      getFunFactAboutPokemon(modalPokemon.name).then(
        (resp) => (chatGptPokemonFact.value = resp),
      );
    }
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
        <button
          onClick$={() => pokemonState.currentPage++}
          class="btn btn-primary mr-2"
        >
          Next
        </button>
      </div>

      <div class="mt-5 grid sm:grid-cols-2 md:grid-cols-6 xl:grid-cols-7">
        {pokemonState.pokemons.map(({ id, name }) => (
          <div
            key={name}
            onClick$={() => showModal(id, name)}
            class="m-5 flex flex-col items-center justify-center"
          >
            <PokemonImage id={id} isVisible />
            <span class="capitalize">{name}</span>
          </div>
        ))}
      </div>

      <Modal
        showModal={modalVisible.value}
        closeFn={closeModal}
        size="md"
        persistent
      >
        <div q:slot="title">{modalPokemon.name}</div>
        <div q:slot="content" class="flex flex-col items-center justify-center">
          <PokemonImage id={modalPokemon.id} isVisible />
          <span>
            {chatGptPokemonFact.value === ""
              ? "Asking to ChatGPT..."
              : chatGptPokemonFact.value}
          </span>
        </div>
      </Modal>
    </>
  );
});

export const head: DocumentHead = {
  title: "List Client",
};
