interface Human {
  name: string
  age: number
}

const human = createDefault<Human>()

console.log(human)