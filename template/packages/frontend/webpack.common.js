const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
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
    path: resolve('../backend/public/webpack/'),
    publicPath: '/webpack/',
    filename: '[name].[hash].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      MAGIC_WEBPACK_ENVIRONMENT: JSON.stringify(dotenv.config(envFile).parsed)
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath: resolve('../backend/public/webpack/'),
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [resolve(''), 'node_modules'],
  },
});
