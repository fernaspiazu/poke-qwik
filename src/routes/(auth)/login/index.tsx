import { component$, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./login.css?inline";
import { Form, routeAction$, zod$, z } from "@builder.io/qwik-city";

export const useLoginUserAction = routeAction$(
  (data, { cookie, redirect }) => {
    const { email, password } = data;

    if (email === "fe.aspiazu@gmail.com" && password === "123456") {
      cookie.set("jwt", "This is my JWT", { secure: true, path: "/" });
      throw redirect(302, "/");
    }

    return {
      success: false,
    };
  },
  zod$({
    email: z.string().email("Wrong email format"),
    password: z
      .string()
      .min(6, "The password must be at least 6 characters long"),
  }),
);

export default component$(() => {
  useStylesScoped$(styles);

  const action = useLoginUserAction();

  return (
    <Form action={action} class="login-form mt-8">
      <div class="relative">
        <input name="email" type="text" placeholder="Email address" />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button>Ingresar</button>
      </div>

      <code>{JSON.stringify(action.value, undefined, 2)}</code>
    </Form>
  );
});
