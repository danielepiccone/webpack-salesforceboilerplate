const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
});

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
  resolve: {
    extensions: [".wasm", ".mjs", ".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.join(__dirname, "src"),
          path.join(__dirname, "node_modules/@salesforce/design-system-react"),
        ],
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.(svg|gif|jpe?g|png)$/,
        use: {
          loader: "url-loader",
          options: { esModule: false },
        },
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        use: {
          loader: "url-loader",
          options: { esModule: false },
        },
      },
    ],
  },
  plugins: [
    htmlWebpackPlugin,
    // The assets from Lightning are served from /assets
    // Some components make this assumption hence the CopyPlugin
    new CopyPlugin([
      {
        from: path.join(
          __dirname,
          "node_modules/@salesforce-ux/design-system/assets/"
        ),
        to: path.join(__dirname, "dist/assets/"),
      },
    ]),
  ],
};
