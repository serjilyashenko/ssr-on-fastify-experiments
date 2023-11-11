// ReactComponents in this project are platform-agnostic and are implemented as follows:
// The components do not import React and ReactDOM in any way.
// If a component is executed on the client side, it retrieves React srcs from the window object.
// React for client-side components is loaded via CDN (see renderer.js file).
// If a component is executed on the server side, it retrieves React sources from the global node object.
// react-globals.js adds React from the node_modules to the global node object.
// ⚠️ Please note that there may be a version inconsistency with React, and it is generally not recommended for real projects.

/* global React */
import SuperLink from "./components/SuperLink.js";

const { createElement, useState, useEffect } = React;

export function Index() {
  const [count, setCount] = useState(1);
  const [inputValue, setInputValue] = useState("");

  const [isClientRendered, setIsClientRendered] = useState(false);
  const renderMessage = isClientRendered
    ? "<-- hydrated"
    : "<-- server rendered";
  const renderColor = isClientRendered
    ? "var(--client-rendered-color)"
    : "var(--server-rendered-color)";

  useEffect(() => {
    setIsClientRendered(true);
  }, []);

  return createElement(
    "div",
    null,
    createElement("h1", null, "Hello Fastify And React 🦐"),
    createElement(
      "div",
      null,
      createElement(SuperLink, { href: "/about" }, "About   "),
      createElement("span", { style: { color: renderColor } }, renderMessage),
    ),
    createElement(
      "p",
      null,
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias cum eum ex explicabo magni modi mollitia numquam tempora. Eligendi eveniet harum modi, necessitatibus nemo omnis quaerat sequi vel veniam voluptatem.  ",
      createElement("span", { style: { color: renderColor } }, renderMessage),
    ),
    createElement(
      "div",
      { style: { display: "flex", gap: "10px", marginBottom: "14px" } },
      createElement(
        "button",
        { onClick: () => setCount((prev) => prev + 1) },
        "count: ",
        count,
      ),
      createElement(
        "div",
        { style: { color: renderColor } },
        (isClientRendered ? "works fine" : "counter doesn't work") +
          " (" +
          renderMessage +
          ")",
      ),
    ),
    createElement(
      "div",
      null,
      createElement("div", null, "Controlled input"),
      createElement("input", {
        value: inputValue,
        onChange: (e) => setInputValue(e.target.value),
      }),
      createElement(
        "button",
        { onClick: () => console.log(">> ", inputValue) },
        "Go",
      ),
      createElement(
        "span",
        { style: { color: renderColor, marginLeft: "10px" } },
        renderMessage,
      ),
    ),
    createElement(
      "div",
      null,
      createElement("div", null, "Uncontrolled input"),
      createElement(
        "form",
        {
          onSubmit: function (e) {
            e.preventDefault();
            console.log(">>", e.target.input1.value);
          },
        },
        createElement("input", { name: "input1" }),
        createElement("input", { type: "submit", value: "Go" }),
        createElement(
          "span",
          { style: { color: renderColor, marginLeft: "10px" } },
          renderMessage,
        ),
      ),
    ),
  );
}
