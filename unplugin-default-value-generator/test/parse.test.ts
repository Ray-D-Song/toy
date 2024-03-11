import { expect, it } from 'vitest'
import { parse } from '../src/core/generator'
import { notypeArgInput_1, notypeArgInput_2, notypeArgInput_3, parseInput, singleTypeParseInput } from './fixtures/parse'

const path = './__snapshots__/parse.test.ts.snap'

it('parse code return meta data', () => {
	expect(parse(parseInput)).toMatchSnapshot(path)
	expect(parse(singleTypeParseInput)).toMatchSnapshot(path)
})

it('no type arg input, should throw err', () => {
	expect(() => parse(notypeArgInput_1)).toThrowError('macro should be called with expressions')
	expect(() => parse(notypeArgInput_2)).toThrowError('macro calls must input type parameter')
	expect(() => parse(notypeArgInput_3)).toThrowError()
})
