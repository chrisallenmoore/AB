const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');

module.exports = {
  entry: './resources/styles/app.scss',
  watch: true,
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [{
      test: /\.(sass|scss)$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
    }, ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app.css',
    }),
    // tell Webpack what extra files or directories to watch
    new ExtraWatchWebpackPlugin({
      files: [],
      dirs: ['./resources'],
    }),
    // use BrowserSync to reload the browser window when changes are made to styles or .edge files
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      host: 'localhost',
      port: 3000, // port where changes will be refreshed
      // proxy is the url:port where AdonisJS is serving,
      // usually http://localhost:3333/
      proxy: 'http://localhost:3333/'
    }, {
      injectCss: true
    }),
  ],
};
