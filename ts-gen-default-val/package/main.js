// import compile from './core/compiler.js'
import compile from './core/compilerV2.js'
import { logWarn } from './core/util.js'

export default function pluginFactory() {
  return {
    name: 'rollup-plugin-default-value',
    transform(code, id) {
      logWarn(this.parse(code))
      // return compile(code, id)
    }
  }
}