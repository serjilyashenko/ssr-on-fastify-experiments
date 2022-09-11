const { createElement } = window.React;
const { hydrateRoot } = window.ReactDOM;

(async function () {
  const { default: Component } = await import(
    `./pages/${window.pageComponentName}.js`
  );

  hydrateRoot(document.getElementById("root"), createElement(Component));
})();
