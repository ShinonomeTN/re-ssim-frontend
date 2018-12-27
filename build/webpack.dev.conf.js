const webpack = require('webpack');

const Ports = require('./config/PORTS');
const Config = require('./webpack.base.conf');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

Config.output.filename = '[name].js';
Config.output.chunkFilename = '[id].js';

// add hot-reload related code to entry chunk
Config.entry.app = [
  'eventsource-polyfill',
  'webpack-hot-middleware/client?reload=true',
  Config.entry.app
];

Config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new FriendlyErrorsPlugin(),
  new ExtractTextPlugin('[name].css'),
  new BrowserSyncPlugin({
    host: 'localhost',
    port: Ports.forBrowserSync,
    proxy: 'localhost:' + Ports.forDevServer,
    notify: false
  }, {
    reload: false
  })
);

module.exports = Config;
