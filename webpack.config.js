var webpack = require('webpack');
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var HtmlWebpackConfig = {
  title: 'demo',
  filename: 'index.html',
  template: "./src/example.html",
  hash: true,
  showErrors: true
};

module.exports = {
  entry: [
    "./src/main.ts"
  ],
  output: {
    filename: "main.js",
    path: __dirname + "/dist"
  },

  devtool: "source-map",

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new HtmlWebpackPlugin(HtmlWebpackConfig)
  ],

  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              useBabel: true
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, "node_modules"),
        use: [{
          loader: 'babel-loader'
        }],
      },
      {
        test: /\.(ts|js)$/,
        enforce: "pre",
        use: [{ loader: 'source-map-loader' }]
      }
    ]
  },

  devServer: {
    port: process.env.PORT || 8888,
    host: 'localhost',
    publicPath: '/',
    contentBase: './src',
    historyApiFallback: true,
    open: true,
    proxy: {
      // OPTIONAL: proxy configuration:
      // '/optional-prefix/**': { // path pattern to rewrite
      //   target: 'http://target-host.com',
      //   pathRewrite: path => path.replace(/^\/[^\/]+\//, '')   // strip first path segment
      // }
    }
  }
}