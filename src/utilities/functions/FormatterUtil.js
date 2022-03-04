

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


export function numberToStringLaborableTime(time, type = 1) {
  //type = 1 horas, type = 2 dias, type = 3 meses
  switch (type) {
    case 1:
      return `${time} Horas laborables`;
    case 2:
      if (time > 1) {
        return `${time} Días laborables`;
      } else {
        return `${time} Día laborable`;
      }
    case 3:
      if (time > 1) {
        return `${time} Meses laborables`;
      } else {
        return `${time} Mes laborable`;
      }

  }
}