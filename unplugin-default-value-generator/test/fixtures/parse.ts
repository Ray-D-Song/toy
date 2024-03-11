export const parseInput = `
createDefault<{
  name: string
  age: number
}>()
`
export const singleTypeParseInput = `
createDefault<string>()
`

export const notypeArgInput_1 = 'createDefault'
export const notypeArgInput_2 = 'createDefault()'
export const notypeArgInput_3 = 'createDefault<>()'
