const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const fs = require('fs');

const envFile = path.resolve(__dirname, '.env');
if (!fs.existsSync(envFile)) {
  fs.copyFileSync(path.resolve(__dirname, '.env.example'), envFile);
}

module.exports = merge(common('.env'), {
  mode: 'development',
  devtool: 'inline-source-map',
  stats: 'errors-only',
  devServer: {
    hot: true,
    compress: true,
    contentBase: path.resolve(__dirname, '../server/public/'),
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  plugins: [new ReactRefreshPlugin()],
  output: {
    path: path.resolve(__dirname, '../server/public/_/'),
    publicPath: '/',
    filename: '[name].[hash].js',
  },
});
