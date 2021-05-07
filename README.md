# basic-redux
Simple React app using Redux for state management. Typescrypt is used as programming language.

**Why can this project be useful?**

1. It implements a very simple use case of React state management using the Redux library.
1. The app utilizes React's function components and relies on Typescript for code typing, therefore typescript configuration is required.
1. Usage of Babel is discouraged and thus I try to rely on `ts-loader` for code transpiling and JSX handling. This configuration is tightly coupled with webpacks' config.

**Interesting parts to look at in the codebase**

* Redux creates and initializes a [store](./src/redux/store/store.ts).
* Reducers take care of modifying a **specific** part of the state.
* If a store fails to initialize a particular part of the state, then the responsibility of initializing that part falls into the **related** reducer. This case happens for the [visibility](./src/redux/reducers/visibilityReducer.ts) reducer as the visibility is not specified as part of the [store's](./src/redux/store/store.ts) initial state.

## ts-loader

As mentioned, I am avoiding babel, therefore `ts-loader` is in charge of all the tasks babel is in charge of like javascript and JSX transpiling.
The reasons I wanted to move away from babel:

1. We need to compile typescript code into a version of javascript that can be handled by all (or a majority of) browsers and that's done by `ts-loader` so why having babel as well?
1. Babel can deal with typescript compiling but seems we still need to use `ts-loader` no matter what. Also, some documentation mentions while babel does check code for typing, it still allows us to compile the code withouth enforcing typing, so I wanted to avoid that.

## webpack configuration

Webpack is using `ts-loading` as the compiler to go through before bundling the codebase. Simple.

However, after inspecting the webpack config we can find two configurations that will ultimately create two bundles: one for the client (front-end) and another for the back-end (the server).

The reason behind this is that the `target` property inside webpack's config specifies where the bundle is to be used and thus uses different rules to include library dependencies.
The targets we need to use are `web` for client bundle code (default) and `node` for back-end. Since those targets cannot be mixed in one, we need to create two different configs.
Look at the [official docs](https://webpack.js.org/concepts/targets/) where this is documented.

## server
I am avoiding using `babel-node` to run the server as it is mentioned in the [babel docs](https://babeljs.io/docs/en/babel-node) that it should be avoided in production since the library is heavy.
Since we take care of compiling the `server.ts` file into javascript code in the `dist` file, then `node` can be used to run the server.

## notes on dependencies
Version 4 of `html-webpack-plugin` is required instead of version 5 as the latter presents an error when specifying the plugin configuration to move the `src/index.html` file into `dist`
