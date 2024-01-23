import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return <span>Hello World - List SSR</span>;
});

export const head: DocumentHead = {
  title: "List SSR",
};
