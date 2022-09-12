/* global React, isServerCode */
import { RouterContext } from "../../App.js";

const { createElement, useContext } = React;

export function SuperLink({ href, children }) {
  const { navigate } = useContext(RouterContext);

  if (isServerCode) {
    return createElement("a", { href }, children);
  }

  function onClick(e) {
    e.preventDefault();
    navigate(href);
  }

  return createElement("a", { href, onClick }, children);
}

export default SuperLink;
