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

React on the client side provides SPA functionality. We have `bundle.js` file in public folder.
And our html generated by `renderer.js` file fetches `bundle.js` from static.

```html
<!-- type="module"` means that file is esm module -->
<script type="module" src="/static/bundle.js"></script>
```

Bundle file is used by client side only. So, it gets React and ReactDOM from global window object (cdn import).
Some more details about imports in ReactComponents in _Platform-agnostic ReactComponents_ section.

```js
// bundle.js
import { App } from "./react-modules/App.js";
import { SuperRouter } from "./react-modules/pages/components/SuperRouter.js";

const { createElement } = React;
const { hydrateRoot } = ReactDOM;

(async function () {
  hydrateRoot(
    document.getElementById("root"),
    createElement(SuperRouter, null, createElement(App)),
  );
})();
```

An interesting fact is that I simply expose the React components as ES modules (esm) from static.
On the server side, they are used as-is, while the client side fetches components one by one from static files.

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

#### Hydration

The hydration step transforms the page rendered by the server into SPA (Single Page Application).
The user sees the html page generated by the server side. Meanwhile, the SPA JS bundle is in the process of loading.
Obviously, none of the JS code functionality is working yet, because the bundle is still loading.

<figure>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/serjilyashenko/ssr-on-fastify-experiments/master/images/counter_dark.gif">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/serjilyashenko/ssr-on-fastify-experiments/master/images/counter_light.gif">
  <img alt="Counter experiment gif" width="480px" src="https://raw.githubusercontent.com/serjilyashenko/ssr-on-fastify-experiments/master/images/counter_light.gif">
</picture>
<figcaption>The counter starts working only after the JS bundle is loaded.</figcaption>
</figure>

As I mentioned, this is obvious. However, this is obvious for developers, but it might be confusing for users.
They can see the counter button, but the functionality is still on its way. Usually, SPA JS bundles are rather large files.
Consequently, it can take some time to fetch them from server, especially with a slow internet connection. 🤷
Therefore, perhaps we should indicate this fact somehow to the user. More spinners ? 😜

#### One more problem

Another scenario involves using a [controlled React input](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable).

```js
function Component1() {
  const [value, setValue] = useState("");

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

Again, the server exposes an input field with an empty initial string, allowing the user to type something into the input.
However, the JS bundle is still in the process of loading. And when the JS bundle is eventually loaded,
React replaces user's typed text with the empty initial string.

<figure>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/serjilyashenko/ssr-on-fastify-experiments/master/images/input_dark.gif">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/serjilyashenko/ssr-on-fastify-experiments/master/images/input_light.gif">
  <img alt="Input experiment gif" width="480px" src="https://raw.githubusercontent.com/serjilyashenko/ssr-on-fastify-experiments/master/images/input_light.gif">
</picture>
<figcaption>The input is cleared when the JS bundle is loaded 🥲</figcaption>
</figure>

🚧👷🏼
