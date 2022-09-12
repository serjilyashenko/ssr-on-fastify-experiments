/* global React */
import { Index } from "./pages/Index.js";
import { About } from "./pages/About.js";
import { Empty } from "./pages/Empty.js";

const { createElement, useEffect, createContext, useCallback, useState } =
  React;

export const RouterContext = createContext();

export function App({ path }) {
  const [pathname, setPathname] = useState(path || location.pathname);

  const navigate = useCallback((path) => {
    history.pushState({}, null, path);
    setPathname(path);
  }, []);

  useEffect(() => {
    function render() {
      setPathname(location.pathname);
    }

    window.addEventListener("popstate", render);

    render();

    return () => window.removeEventListener("popstate", render);
  }, []);

  return createElement(
    RouterContext.Provider,
    { value: { navigate } },
    createElement(
      (function () {
        switch (pathname) {
          case "/":
            return Index;
          case "/about":
            return About;
          default:
            return Empty;
        }
      })()
    )
  );
}
