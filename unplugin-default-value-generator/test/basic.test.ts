import { describe, expect, it } from 'vitest'
import createGenerator from '../src/core/generator'

describe('basic test', () => {
	it.skip('generate default values', () => {
		const sample = `
const obj = createDefault<{
  name: string
  age: number
}>()
    `
		const generateDefaultValue = createGenerator({
			macroName: 'createDefault',
			include: ['src'],
			exclude: [],
		})
		expect(generateDefaultValue(sample, '')).toBe(`
const obj = {name: '', age: 0,};
    `)
	})
})
