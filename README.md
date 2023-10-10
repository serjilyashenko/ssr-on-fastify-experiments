# 🦐 ssr-on-fastify Experiments

This repo contains my random experiments with SSR(Server-Side Rendering) technology, purely for fun.\
I've used `Fastify` as a backend server and `React` as a rendering engine.

### Stack

- Fastify
- React (but without `jsx` 😅)
- git-hooks and lint-staged _(read the notes section why)_
- Prettier
- eslint

### Experiments themselves

So, we have a backend server with Fastify on board.
`/public` folder is registered as static and exposed by the http server.

### Notes

- Although it's not directly related to the repository's main topic, I've added pre-commit checks for the project.
  This implementation involves the following steps:
  - A simple bash `pre-commit` git-hook is copied from the `/git-hooks` folder to `./git/hooks` using the `postinstall`
    npm script during the npm installation process. **This is done to avoid the dependency on the husky package**.
  - Then, the `pre-commit` hook executes the `pre-commit-hook` npm script every time we attempt to commit changes.
  - The `pre-commit-hook` npm script runs `lint-staged`, which in turn performs Prettier and ESLint checks
    on files that have been modified but not yet committed.
