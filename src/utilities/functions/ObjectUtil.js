export const isObject = (o) => {
  return (!!o) && (o.constructor === Object);
}

export const localToObject = (o) => {
  if(!isObject(o)){
    return {}
  }
  return o
}

export const safeValExtraction = (o, key = 'Value') => {
  return localToObject(o)[key]
}

export const isObjectEmpty = (o) => {
  return Object.keys(localToObject(o)).length == 0
}