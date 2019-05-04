const webpack = require('webpack')
const path = require('path');
const autoprefixer = require("autoprefixer");
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
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      /*use: [{
          loader: 'MiniCssExtractPlugin.loader'
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: true,
            localIdentName: '[local]_[hash:base64:5]'
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: 'postcss.config.js'
            }
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ],*/
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
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({
            browsers: ['last 2 versions']
          })
        ]
      }
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
