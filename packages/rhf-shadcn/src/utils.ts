export function propertyExists<X, Y extends PropertyKey>(obj: X, prop: Y): obj is X & Record<Y, unknown> {
  return typeof obj === 'object' && obj !== null && Object.hasOwn(obj, prop)
}
