import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// import moduleStyles from "../../styles.css?inline";

export default component$(() => {
  // useStylesScoped$(moduleStyles);
  return <span>Hello World - List Client</span>;
});

export const head: DocumentHead = {
  title: "List Client",
};
