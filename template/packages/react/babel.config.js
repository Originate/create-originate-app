module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);
  return {
    presets: [
      ['@babel/preset-env', {exclude: ['transform-regenerator']}],
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/proposal-class-properties',
      '@babel/plugin-syntax-class-properties',
      '@babel/proposal-object-rest-spread',
      !api.env('production') && 'react-refresh/babel',
    ],
  };
};
