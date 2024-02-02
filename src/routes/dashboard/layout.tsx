import { Slot, component$ } from "@builder.io/qwik";
import Navbar from "~/components/shared/navbar/navbar";

export default component$(() => {
  return (
    <>
      <Navbar />
      <div class="mt-5 flex flex-col items-center justify-center">
        <span class="text-5xl">Dashboard Layout</span>
        <Slot />
      </div>
    </>
  );
});
