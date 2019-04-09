var webpack = require("webpack");

//
// Get current develop environment
//
const Environment = require("./config/ENV");
const Path = require("./config/PATHS");

const styleRules = require("./config/style-rules");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NyanProgressPlugin = require("nyan-progress-webpack-plugin");

module.exports = {
  entry: {
    app: Path.SRC.join("app.js")
  },
  
  // devtool - source map 配置详见 https://webpack.js.org/configuration/devtool
  devtool: false,
  
  output: {
    path: Path.DIST,
    publicPath: ""
  },
  
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": Path.SRC
    }
  },

  module: {
    rules: [
      //   {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   },
      //   enforce: 'pre',
      //   include: PATHS.SRC
      // },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: styleRules.vueStyleRuleLoaders
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader?cacheDirectory",
        include: Path.SRC
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: "url-loader",
        options: {
          limit: 10240, // 10KB 以下使用 base64
          name: "img/[name]-[hash:6].[ext]"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: "url-loader",
        options: {
          limit: 10240,
          name: "fonts/[name]-[hash:6].[ext]"
        }
      }
    ].concat(styleRules.basicStyleRuleLoaders)
  },

  plugins: [
    new NyanProgressPlugin(), // 进度条

    new webpack.DefinePlugin(
      Object.assign(
        {
          "process.env.NODE_ENV": JSON.stringify(Environment.current)
        },
        Environment
      )
    ),
    
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: function(module) {
        return module.context && module.context.indexOf("node_modules") !== -1;
      }
    }),
    
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: Path.SRC.join("index.html")
    })
  ]
};
