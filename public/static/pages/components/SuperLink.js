/* global React, isServerCode */
import { useSuperRouter } from "./SuperRouter.js";

const { createElement } = React;

export function SuperLink({ href, children }) {
  const { navigate } = useSuperRouter();

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
