

export function stringToDominicanCedula(string = "") {
  if (string.length == 11) {
    let firstValues = string.substring(0, 3);
    let centerValues = string.substring(3, 10);
    let lastValue = string.substring(10, 11);
    return firstValues + "-" + centerValues + "-" + lastValue;
  } else {
    return "";
  }
}
