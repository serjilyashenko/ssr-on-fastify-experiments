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
      createElement(SuperRoute, { path: "*" }, createElement(Empty))
    )
  );
}
