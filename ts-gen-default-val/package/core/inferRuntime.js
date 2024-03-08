export function inferDefaultValue(node, declaredTypes) {
  switch (node.type) {
    case 'TSStringKeyword':
      return `''`
    case 'TSNumberKeyword':
      return '0'
    case 'TSBooleanKeyword':
      return 'false'
    case 'TSObjectKeyword':
      return '{}'
    case 'TSTypeLiteral':
      // TODO recursive calls
      return '{}'
    case 'TSFunctionType':
      return 'function() {}'
    case 'TSArrayType':
      return '[]'
    case 'TSTupleType':
      return '[]'

    case 'TSLiteralType':
      switch (node.literal.type) {
        case 'StringLiteral':
          return ['String']
        case 'BooleanLiteral':
          return ['Boolean']
        case 'NumericLiteral':
        case 'BigIntLiteral':
          return ['Number']
        default:
          return [`null`]
      }

    case 'TSTypeReference':
      if (node.typeName.type === 'Identifier') {
        if (declaredTypes[node.typeName.name]) {
          return declaredTypes[node.typeName.name]
        }
        switch (node.typeName.name) {
          case 'Array':
          case 'Function':
          case 'Object':
          case 'Set':
          case 'Map':
          case 'WeakSet':
          case 'WeakMap':
            return [node.typeName.name]
          case 'Record':
          case 'Partial':
          case 'Readonly':
          case 'Pick':
          case 'Omit':
          case 'Exclude':
          case 'Extract':
          case 'Required':
          case 'InstanceType':
            return ['Object']
        }
      }
      return [`null`]

    case 'TSUnionType':
      return [
        ...new Set(
          [].concat(node.types.map(t =>
            inferRuntimeType(t, declaredTypes)
          ))
        )
      ]

    case 'TSIntersectionType':
      return ['Object']

    default:
      return [`null`] // no runtime check
  }
}