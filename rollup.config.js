import resolve from 'rollup-plugin-node-resolve'
import cjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

const inputDir = 'app/scripts'
const outputDir = 'app/static/scripts'

const bundle = (...fileNames) =>
  fileNames.map((fileName) => ({
    input: `${inputDir}/${fileName}.js`,
    output: {
      file: `${outputDir}/${fileName}.bundle.min.js`,
      format: 'esm',
      sourcemap: true,
    },
    plugins: [resolve(), cjs(), terser()],
    watch: { clearScreen: false },
  }))

export default bundle('main', 'admin.main', 'admin.page')
