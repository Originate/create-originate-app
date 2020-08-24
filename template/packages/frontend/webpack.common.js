const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const resolve = (subdir) => path.resolve(__dirname, subdir);

const configurationOfEnv = (env) => ({
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
    path: resolve('../backend/public/'),
    publicPath: '/public/',
    filename: '[name].[hash].webpack.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      MAGIC_WEBPACK_ENVIRONMENT: JSON.stringify(env)
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath: resolve('../backend/public/'),
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [resolve(''), 'node_modules'],
  },
});

module.exports = (envFile) => {
  // Watch out: dotenv.config() secretly mutates process.env.
  const keys = Object.keys(dotenv.config(envFile).parsed)
  const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => keys.includes(key)))
  return configurationOfEnv(env)
}
