const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base');

const context = __dirname;

module.exports = merge(baseConfig(context), {
  devtool: process.env.BUILD_ANALYZE ? 'source-map' : false,
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ICgames | discover Your favorite web3 Game on icgames.',
      inject: true,
      template: path.join(context, 'src/index.html')
    })
  ],
  resolve: {
    alias: {
      'magic-sdk': path.resolve(__dirname, 'node_modules/magic-sdk/dist/cjs/index.js')
    }
  }
});
