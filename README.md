# Todo App

This is a Todo App developed with [Vite](https://vitejs.dev/) and [Vue 3](https://vuejs.org/). It has basic implementation of unit testing using [Vitest](https://vitest.dev/) and end-to-end testing using [Cypress](https://www.cypress.io/). It has typescript support integrated with the app.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Project Setup

### Install project dependencies

```sh
npm install
```

### Compile and Hot-Reload for Development, starts a local dev server

```sh
npm run dev
```

### Run Unit Tests with UI preview

```sh
npm run test:ui
```

### Run Unit Tests Coverage

```sh
npm run coverage
```

### Run End-to-End Tests

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
