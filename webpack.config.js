const path = require("path");

module.exports = {
  mode: "production",
  entry: path.join(__dirname, "src", "index"),
  output: {
    filename: "main-bundle.js",
    path: path.resolve(__dirname, "assets/js")
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env"]
        }
      }
    ]
  }
};
