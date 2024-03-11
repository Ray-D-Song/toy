export const simple = `
const obj = createDefault<{
  name: string
  age: number
}>()
`
export const simpleResult = `
const obj = {name:'',age:0,}
`

const singleTypeList = ['string', 'number', 'boolean']
export const singleTypeInputList = singleTypeList.map(val => `const val = createDefault<${val}>()`)
const singleValueList = [`''`, '0', 'true']
export const singleTypeResultList = singleValueList.map(val => `const val = ${val}`)

export const functionType = `
const handler = createDefault<Function>()
`
export const functionTypeResult = `
const handler = function(){}
`

export const arrayType = `
const arr = createDefault<Array>()
`
export const arrayTypeResult = `
const arr = []
`

export const tupleType = `
const arr = createDefault<[string, number]>()
`
export const tupleTypeResult = `
const arr = ['',0]
`
