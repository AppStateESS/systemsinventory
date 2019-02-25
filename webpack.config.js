var setup = require('./exports.js')
var webpack = require('webpack')
var Promise = require('es6-promise').polyfill()
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
  entry: setup.entry,
  output: {
    path: setup.path.join(setup.APP_DIR, "build"),
    filename: "[name].js",
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(
      {name: 'vendor', filename: 'vendor.js',}
    ),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      files: ['./javascript/build/*.js'],
      proxy: 'localhost/phpwebsite'
    }),
  ],
  resolve: {
    extensions: [
      '.js', '.jsx',
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        loader: 'jshint-loader',
        exclude: '/node_modules/',
        include: setup.APP_DIR + "/build",
      }, {
        test: /\.jsx?/,
        include: setup.APP_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react',]
        },
      }, {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
    ]
  },
  devtool: 'source-map',
}
