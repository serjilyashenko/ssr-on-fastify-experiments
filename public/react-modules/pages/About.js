// ReactComponents in this project are platform-agnostic and are implemented as follows:
// The components do not import React and ReactDOM in any way.
// If a component is executed on the client side, it retrieves React srcs from the window object.
// React for client-side components is loaded via CDN (see renderer.js file).
// If a component is executed on the server side, it retrieves React sources from the global node object.
// react-globals.js adds React from the node_modules to the global node object.
// ⚠️ Please note that there may be a version inconsistency with React, and it is generally not recommended for real projects.

/* global React */
import SuperLink from "./components/SuperLink.js";

const { createElement, Fragment, useState } = React;

export function About() {
  const [count, setCount] = useState(10);

  return createElement(
    Fragment,
    null,
    createElement("h1", null, "About"),
    createElement("div", null, createElement(SuperLink, { href: "/" }, "Home")),
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
  );
}
