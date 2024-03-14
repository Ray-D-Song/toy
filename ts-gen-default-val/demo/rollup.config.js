import createDefault from '../package/main.js'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/output.ts',
  },
  plugins: [typescript(), createDefault()],
}