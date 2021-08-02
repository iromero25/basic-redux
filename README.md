# basic-redux

Simple React app using Redux for state management. Typescrypt is used as programming language.

The working app is available at this [url](https://iromero-basic-redux.herokuapp.com/).

**Why can this project be useful?**

1. It implements a very simple use case of React state management using the Redux library.
1. The app utilizes React's function components and relies on Typescript for code typing, therefore typescript configuration is required.
1. We go a little step further and use typescript with Redux-related functions as well.
1. Usage of Babel is discouraged and thus I try to rely on `ts-loader` for code transpiling and JSX handling. This configuration is tightly coupled with webpacks' config.

**Interesting parts to look at in the codebase**

- Redux creates and initializes a [store](./src/redux/store/store.ts).
- Reducers take care of modifying a **specific** part of the state.
- If a store fails to initialize a particular part of the state, then the responsibility of initializing that part falls into the **related** reducer. This case happens for the [visibility](./src/redux/reducers/visibilityReducer.ts) reducer as the visibility is not specified as part of the [store's](./src/redux/store/store.ts) initial state.

## ts-loader

As mentioned, I am avoiding babel, therefore `ts-loader` is in charge of all the tasks babel is in charge of like javascript and JSX transpiling.
The reasons I wanted to move away from babel:

1. We need to compile typescript code into a version of javascript that can be handled by all (or a majority of) browsers and that's done by `ts-loader` so why having babel as well?
1. Babel can deal with typescript compiling but some documentation suggests while it checks code for typing, it still allows us to compile the code (by removing the types) and thus, not enforcing typing. I wanted to avoid that.

## webpack configuration

Webpack is using `ts-loader` as the compiler to go through before bundling the codebase. Simple.

However, after inspecting the webpack config we can find two configurations that will ultimately create two bundles: one for the client (front-end) and another for the back-end (the server).

The reason behind this is that the `target` property inside webpack's config specifies where the bundle is to be used and thus uses different rules to include library dependencies.
The targets we need to use are `web` for client bundle code (default) and `node` for back-end. Since those targets cannot be mixed in one, we need to create two different configs.
Look at the [official docs](https://webpack.js.org/concepts/targets/) where this is documented.

## tsconfig

**Updated**: I no longer depend on webpack to compile the server code as this was creating a bundle (and as a consequence, a bigger than required file) for the server. I understood the following:

1. I only need the server file compiled, not bundled.
1. That task is tackled by the `build:server` script which in turn, relies on the `tsconfig.server.json`
1. The `tsconfig.server.json` is a separate config from `tsconfig.json` since the latter is related to the configuration used by `ts-loader` in the webpack config.
1. The `tsconfig.server.json` specifies `"module":"CommonJS"` since I want the ES6 module imports to be compiled to CommonJS so `node` can be used to run the generated `server.js` without trouble.

## server

I avoid using `babel-node` to run the server as it is mentioned in the [babel docs](https://babeljs.io/docs/en/babel-node) that it should be avoided in production since the library is heavy.
Since we take care of compiling the `server.ts` file into javascript code in the `dist` file, then `node` can be used to run the server.

## notes on dependencies

Version 4 of `html-webpack-plugin` is required instead of version 5 as the latter presents an error when specifying the plugin configuration to move the `src/index.html` file into `dist`

## Testing

I am introducing a little bit of component testing using the Tesing-Library library for React.

The reason behind being using this library intead of others (like Enzyme) is its approach to test what is seen by the user (this is, the UI) and getting to test the updates to the DOM by the user's interaction with the UI such as clicking buttons and filling forms.

For this app, I am introducing very simple, yet powerful testing:

1. [Example.test.tsx](./src/components/Example.test.tsx) tests rendering a simple React component and checks that the DOM is effectively updated after its state is updated.
1. [AllNotes.test.tsx](./src/components/AllNotes.test.tsx) tests a component that is hooked up with Redux for state management and thus shows the initial values. We also check the DOM is updated when manually triggering an action.
1. [App.test.tsx](./src/components/App.test.tsx) goes a little bit further and checks that the DOM is updated accordingly after filling the values of the Note Form component and clicking the button provided (that in turn, triggers the action updating the store). We can think if this "little" test as an example of an end-to-end test.

## NPM Registry and Library dependencies

The _npm registry_ is the repository location used as source to install all the library dependencies specified in `package.json`. Often, the registy points to a corporate (and thus private) repository that is managed by the company we work for. To have a look at the registry's configuration, we can use `yarn config get registry`. If this is the case, all dependencies in the `yarn.lock` file will be pointing to a place in that private registry URL where the libraries reside.

This is bad thing to do specially when deploying to Heroku as it doesn't (and should never) have access to a corporate registry, therefore, the libraries won't be found nor installed.

To avoid this, the registry is overridden at the `package.json` file but it is also possible to install all dependencies specifying the registry manually as a one-off to point to npm's public repo with the following command:

`YARN_REGISTRY=https://registry.npmjs.org yarn install`
