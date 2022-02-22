export  function cleanStringFromNumbers(s) {
  if (!s) {
    return ''
  }
  return s.replace(/\D/g,'');
}
