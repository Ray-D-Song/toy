import pkg from '@babel/parser'
import { logWarn, logError } from './util.js'
import { inferDefaultValue } from './inferRuntime.js'
import { rewriteSourceCode } from './rewrite.js'

const { parse: babelParse, ParserOptions, ParserPlugin } = pkg

function extractParameters(paramMembers) {
  let valueStr = '{'
  for(const p of paramMembers) {
    const keyName = p.key.name
    const defaultValue = inferDefaultValue(p.typeAnnotation.typeAnnotation)
    const str = `${keyName}: ${defaultValue},`
    valueStr = valueStr + str
  }
  valueStr = valueStr + '}'
  return valueStr
}

export default function compile(str, id) {
  try {
    // const meta = babelParse(str, {
    //   plugins: ['typescript']
    // })

    
    return str

  } catch (e) {
    logError('compile error: \n')
    logError(e)
  }
}