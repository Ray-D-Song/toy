import pkg from '@babel/parser'
import { logWarn, logError } from './util.js'
import { inferDefaultValue } from './inferRuntime.js'
import { rewriteSourceCode } from './rewrite.js'

const { parse: babelParse, ParserOptions, ParserPlugin } = pkg

const reg = /createDefault<([\s\S]*)+>\(\)/g;

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
  if(!reg.test(str)) {
    logWarn('method not detected')
    return str
  }

  let generateCodeBlocks = []
  const matches = str.match(reg)
  try {
    for(const m of matches) {
      const meta = babelParse(m, {
        plugins: ['typescript']
      }).program.body[0]

      if(!meta.expression.typeParameters) 
        throw logError('type parameters not exist')
      if(meta.expression.typeParameters.params.length > 1)
        throw logError('accept only one parameter.')
      const param = meta.expression.typeParameters.params[0]
      if(param.type !== 'TSTypeLiteral')
        throw logError('type can only be TSTypeLiteral')
      const paramMembers = param.members
      const extractResults = extractParameters(paramMembers)
      generateCodeBlocks.push(extractResults)
    }

    return rewriteSourceCode(str, reg, generateCodeBlocks)

  } catch (e) {
    logError('compile error: \n')
    logError(e)
  }
}