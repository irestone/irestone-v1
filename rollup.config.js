import resolve from 'rollup-plugin-node-resolve'
import cjs from 'rollup-plugin-commonjs'
// import { terser } from 'rollup-plugin-terser'

const scriptsDir = 'public/scripts'
console.log('rollup config')

export default {
  input: `${scriptsDir}/main.js`,
  output: {
    file: `${scriptsDir}/bundle.min.js`,
    format: 'esm',
  },
  // plugins: [resolve(), cjs(), terser()],
  plugins: [resolve(), cjs()],
  watch: { clearScreen: false },
}
