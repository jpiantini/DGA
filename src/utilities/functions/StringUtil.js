import { localToArray } from "./ArrayUtil";

export function capitalizeFirstLetter(s) {
  if (!s) {
    return s
  }
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

export function localToString(s) {
  if (!s) {
    return ""
  }
  return String(s)
}

export function cleanString(s) {
  if (!s) {
    return ""
  }
  return String(s).trim()
}

export function isStringEmpty(s) {
  if (!s || String(s).length == 0) {
    return false
  }
  return s
}

export function cleanNumberWithDecimal(n) {
  if (!n) {
    return ''
  }
  return `${n}`.replace(/[^0-9.]/g, '')
}

export function containString(v1, v2, caseSensitive = false) {
  if (!v1 || !v2) {
    return false;
  }

  let s1 = String(v1);
  let s2 = String(v2);
  if (!caseSensitive) {
    s1 = s1.toUpperCase();
    s2 = s2.toUpperCase();
  }
  return s1.indexOf(s2) !== -1;
}

export function searchInString(string = '', query = '') {
  const _string = localToString(string).toLowerCase().replace(/\s/g, '')
  const _query = localToString(query).toLowerCase().replace(/\s/g, '')

  return _string.includes(_query)
}

export function divideString(string = '', symbol = '/') {
  const array = localToArray(string.split(symbol))

  return array.map(str => localToString(str).trim())
}