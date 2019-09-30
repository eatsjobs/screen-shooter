// rollup.config.js
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import camelCase from 'camelcase';
const isProduction = process.env.NODE_ENV === 'production';

export default [
  {
    input: 'src/main.js',
    output: [
      /* {
        file: pkg.browser,
        format: 'umd',
        name: camelCase(pkg.name, {pascalCase: true}),
      },*/
      {
        file: pkg.module,
        format: 'es',
      },
    ],
    external: [
      (id) => id.includes('@babel-runtime'),
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: ['node_modules/**'],
        runtimeHelpers: true,
      }),
      //isProduction && terser(),
    ],
  },
];
