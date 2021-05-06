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
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
    ],
  },
};

const serverConfig = Object.assign(config, {
  // this is the reason why we have separate configs: as per official webpack
  // docs, targets cannot be mixed (e.g.: [web,node]) so we separate them.
  target: "node", // means the output bundle's target is a node backend
  entry: "./server.ts",
  output: {
    path: outputPath,
    filename: "server.js",
  },
});

const clientConfig = Object.assign(config, {
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

module.exports = [clientConfig, serverConfig];
