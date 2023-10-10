// ReactComponents in this project are platform-agnostic and are implemented as follows:
// The components do not import React and ReactDOM in any way.
// If a component is executed on the client side, it retrieves React srcs from the window object.
// React for client-side components is loaded via CDN (see renderer.js file).
// If a component is executed on the server side, it retrieves React sources from the global node object.
// react-globals.js adds React from the node_modules to the global node object.
// ⚠️ Please note that there may be a version inconsistency with React, and it is generally not recommended for real projects.

/* global React */
const {
  createContext,
  createElement,
  useCallback,
  useEffect,
  useState,
  useContext,
} = React;

const RouterContext = createContext();

export function SuperRouter({ path, children }) {
  const [route, setRoute] = useState(path || location.pathname);

  const navigate = useCallback((path) => {
    history.pushState({}, null, path);
    setRoute(path);
  }, []);

  useEffect(() => {
    function render() {
      setRoute(location.pathname);
    }

    window.addEventListener("popstate", render);

    render();

    return () => window.removeEventListener("popstate", render);
  }, []);

  return createElement(
    RouterContext.Provider,
    { value: { route, navigate } },
    children,
  );
}

export function useSuperRouter() {
  const context = useContext(RouterContext);
  if (context === undefined) {
    throw new Error("useSuperRouter must be used within a SuperRouter");
  }
  return context;
}

export function SuperSwitch({ children }) {
  const { route } = useSuperRouter();

  return React.Children.toArray(children).find((superRoute) => {
    const superRoutePath = superRoute.props.path;

    return superRoutePath === route || superRoutePath === "*";
  });
}

// this path prop is required by SuperSwitch component.
// eslint-disable-next-line no-unused-vars
export function SuperRoute({ path, children }) {
  return children;
}
