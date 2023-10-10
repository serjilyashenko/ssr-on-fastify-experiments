// ReactComponents in this project are platform-agnostic and are implemented as follows:
// The components do not import React and ReactDOM in any way.
// If a component is executed on the client side, it retrieves React srcs from the window object.
// React for client-side components is loaded via CDN (see renderer.js file).
// If a component is executed on the server side, it retrieves React sources from the global node object.
// react-globals.js adds React from the node_modules to the global node object.
// ⚠️ Please note that there may be a version inconsistency with React, and it is generally not recommended for real projects.

/* global React */
import { useSuperRouter } from "./SuperRouter.js";

const { createElement } = React;

export function SuperLink({ href, children }) {
  const { navigate } = useSuperRouter();

  function onClick(e) {
    e.preventDefault();
    navigate(href);
  }

  return createElement("a", { href, onClick }, children);
}

export default SuperLink;
