# 🦐 ssr-on-fastify Experiments

This repo contains my random experiments with SSR(Server-Side Rendering) technology, purely for fun.\
I've used `Fastify` as a backend server and `React` as a rendering engine.

### Stack

- Fastify
- React (but without `jsx` 😅)
- git-hooks and lint-staged _(read the notes section why)_
- Prettier
- eslint

### Story

#### Pre-commit hook

Although it's not directly related to the repository's main topic, I've added pre-commit checks for the project.
This implementation involves the following steps:

- A simple bash `pre-commit` git-hook is copied from the `/git-hooks` folder to `./git/hooks` using the `postinstall`
  npm script during the npm installation process. **This is done to avoid the dependency on the husky package**.
- Then, the `pre-commit` hook executes the `pre-commit-hook` npm script every time we attempt to commit changes.
- The `pre-commit-hook` npm script runs `lint-staged`, which in turn performs Prettier and ESLint checks
  on files that have been modified but not yet committed.

#### Fastify

So, we have a backend server with Fastify on board.
`/public` folder is registered as static and exposed by the http server.
It contains a favicon, a JS bundle, and component modules.

Also, there is a router registered.
It returns html pages as a http response with help of a `renderReactElement` (`renderer.js` file)

```js
fastify.get("/about", async (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(renderReactElement(About));
});
```

Basically, the renderer takes a react component and turns it to a corresponding html code
with common wrapper. The wrapper just adds `<html/>`, `<head/>` and `<body/>` (it even includes dark/light modes 🙈).

#### Server Side React

Just for fun, I decided to skip the static building stage 🙈. Therefore, I'm not using `jsx`, `webpack`, etc., in the project.
Consequently, I'm forced to create my components using `createElement` function, as shown below:

```js
export function About() {
  return createElement(
    Fragment,
    null,
    createElement("h1", null, "About"),
    createElement("p", null, "Lorem ipsum dolor sit amet,..."),
  );
}
```

We also have a few pages created with `React.createElement`.
These pages are consumed by the router, and, essentially, we have classic MPA(Multi Page Application)
with react rendering on the server side. And this works even if JavaScript is disabled in the browser.

#### Client Side React

And I just expose the react components as `esm` modules

🚧👷🏼‍

#### Platform-agnostic ReactComponents

ReactComponents in this project are platform-agnostic and are implemented as follows:

- The components do not import React and ReactDOM in any way. They are exposed as global variables.
- If a component is executed on the client side, it retrieves React srcs from the window object.
  React for client-side components is loaded via CDN (see `renderer.js` file).

```html
<!-- html template -->
<script
  crossorigin
  src="https://unpkg.com/react@18/umd/react.development.js"
></script>
<script
  crossorigin
  src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
></script>
```

- If a component is executed on the server side, it retrieves React sources from the global node object.
- react-globals.js adds React from the node_modules to the global node object.

```js
// Server side code
import React from "react";
import ReactDom from "react-dom";

global.React = React;
global.ReactDOM = ReactDom;
```

- ⚠️ Please note that there may be a version inconsistency of React. Such an approach is generally not recommended for real projects.
