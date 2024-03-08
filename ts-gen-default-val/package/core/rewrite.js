export function rewriteSourceCode(source, reg, list) {
  let idx = 0
  const res = source.replace(reg, (m) => {
    let replacement = list[idx]
    idx = (idx + 1) % list.length
    return replacement
  })
  return res
}