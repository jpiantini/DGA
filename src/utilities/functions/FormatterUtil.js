

export function stringToDominicanCedula(string = "") {
  if (string.length == 11) {
    let firstValues = string.substring(0, 3);
    let centerValues = string.substring(3, 10);
    let lastValue = string.substring(10, 11);
    return firstValues + "-" + centerValues + "-" + lastValue;
  } else {
    return string;
  }
}

export function stringToDominicanPhoneNumber(string = "") {
  if (string.length == 10) {
    let firstValues = string.substring(0, 3);
    let centerValues = string.substring(3, 6);
    let lastValue = string.substring(6, 10);
    return firstValues + "-" + centerValues + "-" + lastValue;
  } else {
    return string;
  }
}

