import { createUnplugin } from 'unplugin'
import type { UnpluginFactory } from 'unplugin'
import type { Options } from './types'
import createGenerator from './core/generator'

export const unpluginFactory: UnpluginFactory<Options> = (options = {
	macroName: 'createDefault',
	include: ['src'],
	exclude: [],
}) => {
	const generateDefaultValue = createGenerator(options)

	return {
		name: 'unplugin-default-value-generator',
		enforce: 'pre',
		// TODO
		transformInclude(id) {
			return id
		},
		async transform(raw, id) {
			try {
				return generateDefaultValue(raw, id)
			}
			catch (e: any) {
				this.error(e)
			}
		},
	}
}

export default /* #__PURE__ */ createUnplugin(unpluginFactory)
