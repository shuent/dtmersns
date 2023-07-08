export const filterObject = (obj: Object, fn: Function) =>
  Object.fromEntries(Object.entries(obj).filter(([k, v]) => fn(k, v)))
