module.exports = (api) => {
  const NODE_ENV = api.cache(() => process.env.NODE_ENV);
  const presets = [];
  const plugins = [];
  if (process.env.NODE_ENV === 'test') {
    plugins.concat([
      '@babel/plugin-transform-modules-commonjs',      
    ]);
  }
  presets.push([
    '@babel/preset-env', {
      useBuiltIns: "usage",
      corejs: '2',
    }
  ]);
  return { presets, plugins };
}