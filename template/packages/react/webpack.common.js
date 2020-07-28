const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const resolve = (subdir) => path.resolve(__dirname, subdir);

module.exports = (envFile) => ({
  entry: {
    main: resolve('index.tsx'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(gif|svg|jpg|png|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]-[hash].[ext]',
            publicPath: '_',
          },
        },
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    path: resolve('../server/public/_/'),
    publicPath: '/_/',
    filename: '[name].[hash].js',
  },
  plugins: [
    new Dotenv({systemvars: true, safe: true, path: envFile}),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath: resolve('../server/public/_/'),
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [resolve(''), 'node_modules'],
  },
});
