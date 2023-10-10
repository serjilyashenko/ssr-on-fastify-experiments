import { App } from "./react-modules/App.js";
import { SuperRouter } from "./react-modules/pages/components/SuperRouter.js";

const { createElement } = window.React;
const { hydrateRoot } = window.ReactDOM;

(async function () {
  hydrateRoot(
    document.getElementById("root"),
    createElement(SuperRouter, null, createElement(App)),
  );
})();
