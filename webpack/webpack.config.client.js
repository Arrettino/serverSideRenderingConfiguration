const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TeserPlugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
require('dotenv').config();

const isDevelopment = process.env.NODE_ENV === 'development';
const entry = ['./src/client/index.js'];

if (isDevelopment) {
  entry.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true');
}

module.exports = {
  name: 'client',
  mode: isDevelopment ? 'development' : 'production',
  entry,
  output: {
    path: path.resolve(__dirname, '../build/public'),
    filename: isDevelopment ? 'assets/app.js' : 'assets/app-[hash].js',
    publicPath: '/',

  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
  },
  optimization: {
    minimize: true,
    minimizer: [new TeserPlugin()],
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(s*)css$/,
        use: [isDevelopment ?
          (
            'style-loader'
          ) :
          (
            { loader: MiniCssExtractPlugin.loader }
          ),
        'css-loader',
        'sass-loader',
        ],
      },
      {
        test: /\.jpg|png|gif|woff|eot|ttf|svg|mp4|webm$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/[hash].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    isDevelopment ?
      (
        new webpack.HotModuleReplacementPlugin()
      ) :
      (
        new ManifestPlugin()
      ),
    isDevelopment ? (() => {}) :
      (
        new MiniCssExtractPlugin({
          filename: isDevelopment ? 'assets/app.css' : 'assets/app-[hash].css',
        })
      ),
  ],
};
