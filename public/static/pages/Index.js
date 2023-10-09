/* global React */
import SuperLink from "./components/SuperLink.js";

const { createElement, useState, Fragment } = React;

export function Index() {
  const [count, setCount] = useState(1);
  const [inputValue, setInputValue] = useState("");

  return createElement(
    Fragment,
    null,
    createElement("h1", null, "Hello Fastify And React 🦐"),
    createElement(
      "div",
      null,
      createElement(SuperLink, { href: "/about" }, "About"),
    ),
    createElement(
      "p",
      null,
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias cum eum ex explicabo magni modi mollitia numquam tempora. Eligendi eveniet harum modi, necessitatibus nemo omnis quaerat sequi vel veniam voluptatem.",
    ),
    createElement(
      "div",
      null,
      createElement(
        "button",
        { onClick: () => setCount((prev) => prev + 1) },
        "count: ",
        count,
      ),
    ),
    createElement(
      "div",
      null,
      createElement(
        Fragment,
        null,
        createElement("input", {
          value: inputValue,
          onChange: (e) => setInputValue(e.target.value),
        }),
        createElement(
          "button",
          { onClick: () => console.log(">> ", inputValue) },
          "Go",
        ),
      ),
    ),
  );
}
