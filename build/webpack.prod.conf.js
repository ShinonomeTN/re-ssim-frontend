const Webpack = require('webpack');
const Config = require('./webpack.base.conf');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

Config.output.filename = 'js/[name].[chunkhash:6].js';
Config.output.chunkFilename = 'js/[id].[chunkhash:6].js';

Config.plugins.push(
  new Webpack.optimize.OccurrenceOrderPlugin(),
  new Webpack.optimize.UglifyJsPlugin({
    beautify: false,
    comments: false,
    compress: {
      warnings: false,
      collapse_vars: true,
      reduce_vars: true
    }
  }),
  new Webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity
  }),
  new Webpack.optimize.AggressiveMergingPlugin(),
  new Webpack.optimize.MinChunkSizePlugin({
    minChunkSize: 30000
  }),
  new ExtractTextPlugin({
    filename: 'css/[name].[contenthash:6].css',
    allChunks : true // 若要按需加载 CSS 则请注释掉该行
  }),
  new OptimizeCssAssetsPlugin({
    cssProcessorOptions: {
      safe: true
    }
  })
);

module.exports = Config;
