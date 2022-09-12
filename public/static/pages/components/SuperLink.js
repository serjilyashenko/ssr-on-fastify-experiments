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
