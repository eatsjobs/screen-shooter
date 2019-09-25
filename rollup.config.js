// rollup.config.js
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';
export default [
    {
        input: 'src/main.js',
        output: [{
            file: pkg.browser,
            format: 'umd',
            name: 'OdigeoErrorReporting'
        }],
        plugins: [
            resolve(),
            commonjs(),
            babel({
                exclude: 'node_modules/**'
            }),
            //terser()
        ]
    },
    {
        input: 'src/main.js',
        output: [{
            file: pkg.module,
            format: 'es'
        }],
        plugins: [
            resolve(),
            commonjs(),
            /*babel({
                exclude: 'node_modules/**'
            }),*/
            // terser()
        ]
    }
]