import { App } from "./static/App.js";

const { createElement } = window.React;
const { hydrateRoot } = window.ReactDOM;

window.isServerCode = false;

(async function () {
  hydrateRoot(document.getElementById("root"), createElement(App));
})();
