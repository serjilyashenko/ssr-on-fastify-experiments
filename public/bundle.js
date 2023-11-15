// ReactComponents in this project are platform-agnostic and are implemented as follows:
// The components do not import React and ReactDOM in any way.
// If a component is executed on the client side, it retrieves React srcs from the window object.
// React for client-side components is loaded via CDN (see renderer.js file).
// If a component is executed on the server side, it retrieves React sources from the global node object.
// react-globals.js adds React from the node_modules to the global node object.
// ⚠️ Please note that there may be a version inconsistency with React, and it is generally not recommended for real projects.

// This particular file executes only on client side. So, React, ReactDOM are from window object.

/* global React, ReactDOM */
import { App } from "./react-modules/App.js";
import { SuperRouter } from "./react-modules/pages/components/SuperRouter.js";

const { createElement } = React;
const { hydrateRoot } = ReactDOM;

(async function () {
  hydrateRoot(
    document.getElementById("root"),
    createElement(SuperRouter, { path: location.pathname }, createElement(App)),
  );
})();
