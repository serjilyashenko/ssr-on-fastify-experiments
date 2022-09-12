import { App } from "./static/App.js";
import { SuperRouter } from "./static/pages/components/SuperRouter.js";

const { createElement } = window.React;
const { hydrateRoot } = window.ReactDOM;

window.isServerCode = false;

(async function () {
  hydrateRoot(
    document.getElementById("root"),
    createElement(SuperRouter, null, createElement(App))
  );
})();
