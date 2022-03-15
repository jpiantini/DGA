import { localToArray } from "./ArrayUtil";
import { cleanStringFromNumbers } from './NumberUtil';

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

export function formatNumberWithDecimal(n) {
  if (!n) {
    return ''
  }

  let _n = n.replace(/,/g, ''); //without commas
  _n = new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(_n)
  if(!_n.includes('.')){
    _n = _n + '.00';
  }

  return _n;
}

export function cleanNumbersFromString(s) {
  if (!s) {
    return ''
  }
  return localToString(s).replace(/[\d-]/g, '')
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

export const invertRule = (rule) => {
  if (!rule) {
    return ''
  }
  const ruleSeparated = localToString(rule).split(':')
  const ruleAction = localToString(ruleSeparated[0]).split(',')
  const ruleField = localToString(ruleSeparated[1]).split(',')

  const invertedRule = ruleAction.map(rule => {
    switch (rule) {
      case '0':
        return '1'
      case '1':
        return '0'
      case '2':
        return '3'
      case '3':
        return '2'
      case '4':
        return '6'
      case '6':
        return '4'
      default:
        return '7'
    }
  })
  return `${invertedRule}:${ruleField}`
}


export const defaultString = {
  requiredText: 'Este campo es requerido',
  validEmail: 'Favor digitar un email válido',
  validUrl: 'Favor digitar un URL válido',
  validPhone: 'Favor digitar un teléfono válido',
  validRnc: 'Favor digitar un Rnc válido',
}