const setup = require('./exports.js')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env, argv) => {
  const inProduction = argv.mode === 'production'
  const inDevelopment = argv.mode === 'development'

  const settings = {
    entry: setup.entry,
    output: {
      path: setup.path.join(setup.APP_DIR, "dev"),
      filename: "[name].js"
    },
    externals: {
      $: 'jQuery',
      jquery: 'jQuery'
    },
    optimization: {
      minimizer: [new TerserPlugin()],
      splitChunks: {
        minChunks: 2,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            minChunks: 2,
            name: 'vendor',
            enforce: true,
            chunks: 'all'
          }
        }
      }
  },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    plugins: [],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          enforce: 'pre',
          loader: 'jshint-loader',
          exclude: '/node_modules/',
          include: setup.APP_DIR + "/build"
        }, {
          test: /\.jsx?/,
          include: setup.APP_DIR,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }, {
          test: /\.css$/,
          loader: "style-loader!css-loader"
        }
      ]
    }
  }

  if (inDevelopment) {
    const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
    settings.plugins.push(
      new BrowserSyncPlugin({host: 'localhost', notify: false, port: 3000, files: ['./javascript/dev/*.js'], proxy: 'localhost/canopy'})
    )
    settings.devtool = 'inline-source-map'
    settings.output = {
      path: setup.path.join(setup.APP_DIR, 'dev'),
      filename: '[name].js'
    }
  }

  if (inProduction) {
    // const BundleAnalyzerPlugin =
    // require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    // settings.plugins.push(new BundleAnalyzerPlugin()) const AssetsPlugin =
    // require('assets-webpack-plugin')
    settings.plugins.push(
      new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')})
    )

    // settings.plugins.push(  new AssetsPlugin({filename: 'assets.json',
    // prettyPrint: true,}) )
    settings.output = {
      path: setup.path.join(setup.APP_DIR, 'build'),
      filename: '[name].js',
      chunkFilename: '[name].js'
    }
  }
  return settings
}
