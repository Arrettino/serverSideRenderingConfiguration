const path = require('path');
const TeserPlugin = require('terser-webpack-plugin');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
  name: 'server',
  target: 'node',
  mode: 'production',
  entry: './src/server/server.js',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'server.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js'],
  },
  externals: [webpackNodeExternals()],
  node: {
    fs: 'empty',
    __dirname: false,
  },
  optimization: {
    minimize: true,
    minimizer: [new TeserPlugin()],
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: 'ignore-loader',
      },
    ],
  },
};
