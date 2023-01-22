const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: path.join(__dirname, './client/src/index.jsx'),
  output: {
    path: path.join(__dirname, './client/dist'),
    filename:'bundle.js',
    sourceMapFilename: "bundle.js.map"
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: "client/src/index.html", // to import index.html file inside index.js
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}