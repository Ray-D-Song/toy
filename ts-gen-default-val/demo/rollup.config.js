import createDefault from '../package/main.js'

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/output.ts',
  },
  plugins: [createDefault()],
}