import {
  $,
  component$,
  useComputed$,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import {
  Link,
  type DocumentHead,
  routeLoader$,
  useLocation,
} from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { Modal } from "~/components/shared";
import { getSmallPokemons } from "~/helpers/get-small-pokemon";
import type { SmallPokemon } from "~/interfaces";

export const usePokemonList = routeLoader$<SmallPokemon[]>(
  async ({ query, redirect, pathname }) => {
    const offset = Number(query.get("offset"));

    if (offset < 0) {
      throw redirect(301, pathname);
    }

    if (isNaN(offset)) {
      throw redirect(301, pathname);
    }

    return await getSmallPokemons(offset);
  },
);

export default component$(() => {
  const pokemonResponse = usePokemonList();
  const location = useLocation();

  const modalVisible = useSignal(false);
  const modalPokemos = useStore({
    id: "",
    name: "",
  });

  // Modal functions
  const showModal = $((id: string, name: string) => {
    modalPokemos.id = id;
    modalPokemos.name = name;
    modalVisible.value = true;
  });

  const closeModal = $(() => {
    modalVisible.value = false;
  });

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
        {pokemonResponse.value.map(({ name, id }) => (
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
        <div q:slot="title">{modalPokemos.name}</div>
        <div q:slot="content" class="flex flex-col items-center justify-center">
          <PokemonImage id={modalPokemos.id} isVisible />
          <span>Asking to ChatGPT</span>
        </div>
      </Modal>
    </>
  );
});

export const head: DocumentHead = {
  title: "List SSR",
};
