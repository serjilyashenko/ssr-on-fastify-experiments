/* global React */
import SuperLink from "./components/SuperLink.js";

const { createElement, Fragment } = React;

export function Empty() {
  return createElement(
    Fragment,
    null,
    createElement("h1", null, "404"),
    createElement("div", null, createElement(SuperLink, { href: "/" }, "Home"))
  );
}
