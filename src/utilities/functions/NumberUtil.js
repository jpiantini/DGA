export  function cleanStringFromNumbers(s) {
  if (!s) {
    return ''
  }
  return s.replace(/\D/g,'');
}


export const localToNumber = (n, whatReturn = 0) => {
  if (!n || String(n).length == 0) {
    return whatReturn
  }
  return Number(n)
}