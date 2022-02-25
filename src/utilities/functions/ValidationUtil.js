import { isObject } from "./ObjectUtil";

export const isEmpty = (any, key = 'Value', lengthVal = 1) => {
  if (isObject(any)) {
    if (typeof any[key] == 'string') {
      return any[key].length == 0
    } else {
      return !any[key]
    }
  } else if (typeof any == 'string') {
    return any.length < lengthVal
  } else if (typeof any == 'number') {
    return !(any > 0)
  } else if (Array.isArray(any)) {
    return any.length == 0
  } else {
    return !any
  }
}
