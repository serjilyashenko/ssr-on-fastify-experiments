import { createElement, Fragment } from "react";

export function Index() {
  return createElement(
    Fragment,
    null,
    createElement("h1", null, "Hello Fastify 🦐"),
    createElement(
      "p",
      null,
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias cum eum ex explicabo magni modi mollitia numquam tempora. Eligendi eveniet harum modi, necessitatibus nemo omnis quaerat sequi vel veniam voluptatem."
    )
  );
}
