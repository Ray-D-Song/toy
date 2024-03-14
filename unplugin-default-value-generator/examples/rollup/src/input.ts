import type { Human } from './input.type'

const developer = createDefault<{
	basic: Human
	age: number
}>()

console.log(developer)
