import { Slot, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import Navbar from "~/components/shared/navbar/navbar";

export const useCheckAuthCookie = routeLoader$(({ cookie, redirect }) => {
  const jwtCookie = cookie.get("jwt");
  if (jwtCookie && jwtCookie.value === "This is my JWT") {
    return;
  }

  throw redirect(302, "/login");
});

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
