import { createUnplugin } from 'unplugin'
import type { UnpluginFactory } from 'unplugin'
import { minimatch } from 'minimatch'
import type { Options } from './types'
import createGenerator from './core/generator'

export const unpluginFactory: UnpluginFactory<Options> = (options = {
	macroName: 'createDefault',
	include: ['src/*'],
	exclude: [],
}) => {
	const { macroName, include, exclude } = options
	const generateDefaultValue = createGenerator(macroName)

	return {
		name: 'unplugin-default-value-generator',
		enforce: 'pre',
		transformInclude(id) {
			const isInclude = include.some(pattern => minimatch(id, pattern))
			const isExclude = exclude.some(pattern => minimatch(id, pattern))
			if (isInclude && !isExclude)
				return true
			else
				return false
		},
		async transform(raw) {
			try {
				return generateDefaultValue(raw)
			}
			catch (e: any) {
				this.error(e)
			}
		},
	}
}

export default /* #__PURE__ */ createUnplugin(unpluginFactory)
