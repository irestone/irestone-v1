import resolve from 'rollup-plugin-node-resolve'
import cjs from 'rollup-plugin-commonjs'
// import { terser } from 'rollup-plugin-terser'

const scriptsDir = 'public/scripts'
console.log('rollup config')

export default [
  {
    input: `${scriptsDir}/main.js`,
    output: {
      file: `${scriptsDir}/main.bundle.js`,
      format: 'esm',
    },
    // plugins: [resolve(), cjs(), terser()],
    plugins: [resolve(), cjs()],
    watch: { clearScreen: false },
  },
  {
    input: `${scriptsDir}/page.js`,
    output: {
      file: `${scriptsDir}/page.bundle.js`,
      format: 'esm',
    },
    // plugins: [resolve(), cjs(), terser()],
    plugins: [resolve(), cjs()],
    watch: { clearScreen: false },
  },
]
