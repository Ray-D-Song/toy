function reactive(target) {
  const p = new Proxy(target, () => {

  })

  return p
}