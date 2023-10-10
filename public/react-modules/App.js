// ReactComponents in this project are platform-agnostic and are implemented as follows:
// The components do not import React and ReactDOM in any way.
// If a component is executed on the client side, it retrieves React srcs from the window object.
// React for client-side components is loaded via CDN (see renderer.js file).
// If a component is executed on the server side, it retrieves React sources from the global node object.
// react-globals.js adds React from the node_modules to the global node object.
// ⚠️ Please note that there may be a version inconsistency with React, and it is generally not recommended for real projects.

/* global React */
import { Index } from "./pages/Index.js";
import { About } from "./pages/About.js";
import { Empty } from "./pages/Empty.js";
import { SuperRoute, SuperSwitch } from "./pages/components/SuperRouter.js";

const { createElement, Fragment } = React;

export function App() {
  return createElement(
    Fragment,
    null,
    createElement(
      SuperSwitch,
      null,
      createElement(SuperRoute, { path: "/" }, createElement(Index)),
      createElement(SuperRoute, { path: "/about" }, createElement(About)),
      createElement(SuperRoute, { path: "*" }, createElement(Empty)),
    ),
  );
}
