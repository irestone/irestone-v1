import resolve from 'rollup-plugin-node-resolve'
import cjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

const sourceDir = 'public/scripts/src'
const publicDir = 'public/scripts'

export default [
  {
    input: `${sourceDir}/main.js`,
    output: {
      file: `${publicDir}/main.bundle.min.js`,
      format: 'esm',
      sourcemap: true,
    },
    plugins: [resolve(), cjs(), terser()],
    watch: { clearScreen: false },
  },
  {
    input: `${sourceDir}/admin.js`,
    output: {
      file: `${publicDir}/admin.bundle.min.js`,
      format: 'esm',
      sourcemap: true,
    },
    plugins: [resolve(), cjs(), terser()],
    watch: { clearScreen: false },
  },
  {
    input: `${sourceDir}/admin.page.js`,
    output: {
      file: `${publicDir}/admin.page.bundle.min.js`,
      format: 'esm',
      sourcemap: true,
    },
    plugins: [resolve(), cjs(), terser()],
    watch: { clearScreen: false },
  },
]
