type Path<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${Path<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)]

export function ignoreFields<T extends object>(obj: T, paths: Path<T>[]): T {
  const result: T = structuredClone(obj)

  for (const path of paths) {
    const keys = path.split('.')
    let current: any = result

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]
      if (current == null || typeof current !== 'object') {
        break
      }

      current = current[key]
    }

    if (current && typeof current === 'object') {
      delete current[keys[keys.length - 1]]
    }
  }

  return result
}
