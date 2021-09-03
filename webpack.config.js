const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const outputPath = path.resolve(__dirname, "dist");

const config = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: ["ts-loader", "eslint-loader"],
        exclude: /node_modules/,
      },
    ],
  },
};

// CAREFUL!  `Object.assign` takes  an empty object as first param to create a
// new object. If the `config` object were  specied instead,  we'd be mutating
// it, and thus not achieving what we want (separate client and server configs)
const serverConfig = Object.assign({}, config, {
  // this is the reason why we have separate configs: as per official webpack
  // docs, targets cannot be mixed (e.g.: [web,node]) so we separate them.
  target: "node", // means the output bundle's target is a node backend
  entry: "./src/server.ts",
  output: {
    path: outputPath,
    filename: "server.js",
  },
});

const clientConfig = Object.assign({}, config, {
  devtool: "eval-source-map",
  entry: "./src/index.tsx",
  output: {
    path: outputPath,
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
});

// I do not longer use the server config but I'd like  to  leave it
// around as an example of how to use two configs onw webpack filer

// module.exports = [serverConfig, clientConfig];
module.exports = clientConfig;
