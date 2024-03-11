import { parse as babelParse } from '@babel/parser'
import type { Statement, TSType } from '@babel/types'
import type { Options } from '../types'

function extractCodeBlock(reg: RegExp, raw: string) {
	return raw.match(reg)
}

export function extractTypeParameters(meta: Statement) {
	if (meta.type !== 'ExpressionStatement')
		throw new Error('macro should be called with expressions')
	if (meta.expression.type !== 'CallExpression')
		throw new Error('macro should be called with expressions')
	if (!meta.expression.typeParameters)
		throw new Error('macro calls must input type parameter')
	if (meta.expression.typeParameters.params.length !== 1)
		throw new Error('macro can only have 1 type parameter')

	return meta.expression.typeParameters.params[0]
}

export function inferDefaultValue(typeParamAST: TSType) {
	switch (typeParamAST.type) {
		case 'TSStringKeyword':
			return `''`
		case 'TSNumberKeyword':
			return '0'
		case 'TSBooleanKeyword':
			return 'false'
    case 'TSObjectKeyword':
      return '{}'
    case 'TSNullKeyword':
      return 'null'
    case 'TSTypeLiteral':
      return handleLiteralType:
	}
}

export function parse(code: string) {
	const meta = babelParse(code, {
		plugins: ['typescript'],
	}).program.body[0]

	const typeParam = extractTypeParameters(meta)

	return typeParam
}

export default function createGenerator(options: Options) {
	const macroNameReg = new RegExp(`${options.macroName}<([\s\S]*)+>\(\)`, 'g')

	function generateDefaultValue(raw: string) {
		const codeBlockList = extractCodeBlock(macroNameReg, raw)
		if (!codeBlockList)
			return raw
		for (const code of codeBlockList)
			parse(code)
	}

	return generateDefaultValue
}
