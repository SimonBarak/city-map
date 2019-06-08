const path = require("path");

module.exports = {
  entry: path.join(__dirname, "production", "main"),
  output: {
    filename: "main-bundle.js",
    path: path.resolve(__dirname, "assets/js")
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env"]
        }
      }
    ]
  }
};
