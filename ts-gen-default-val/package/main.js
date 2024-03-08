import compile from './core/compiler.js'

export default function pluginFactory() {
  return {
    name: 'rollup-plugin-default-value',
    transform(code, id) {
      return compile(code, id)
    }
  }
}