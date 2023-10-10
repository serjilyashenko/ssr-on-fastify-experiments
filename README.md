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
There are a favicon, a JS bundle and component modules there.

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

Just for fun I decided to skip a static building stage 🙈. So, I'm not using `jsx`, `webpack`, etc. in the project.
So, I'm forced to create my components with `createElement` function. As follows:

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

Now, we have few pages created with React.createElement.
They are consumed by the router, and basically we have classic MPA(Multi Page Application)
with react rendering on the server side.

🚧👷🏼‍ If we disable JS, it will be working as MPA application...

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
