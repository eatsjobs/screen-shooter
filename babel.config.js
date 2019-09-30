module.exports = (api) => {
  const presets = [];
  const plugins = [];
  const NODE_ENV = api.cache(() => process.env.NODE_ENV);
  if (NODE_ENV === 'test') {
    presets.push('@babel/preset-env');
  } else {
    plugins.push([
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: false,
        useESModules: true,
      },
    ]);
    presets.push([
      '@babel/preset-env', {
        useBuiltIns: 'usage',
        corejs: '3',
      },
    ]);
  }
  return {presets, plugins};
};
