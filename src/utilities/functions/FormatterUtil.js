

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


export const priceVariationToLaborableTime = (variation) => {
  /*VARIATION EXAMPLE
  {
    "id": 13,
    "concept": "De 0-10 habs.",
    "description": "De 0 a 10 habitaciones",
    "method_payment": null,
    "time": "1585",
    "price": "7000.00",
    "coin": "Pesos",
    "quantity": 0,
    "required": 0,
    "created_at": "2018-11-06 23:42:20",
    "updated_at": "2022-03-07 17:43:19",
    "pivot": {
        "prices_id": 14,
        "price_variations_id": 13
    },
    "delivery_time": {
        "id": 1585,
        "months": 0,
        "days": 0,
        "hours": 24,
        "created_at": "2022-03-07 17:43:19",
        "updated_at": "2022-03-07 17:43:19"
    }
}
  */
  if (variation.months > 0 && variation.days > 0) {
    return `${variation.months} Meses y ${variation.days} días laborables`
  }
  if (variation.days > 0 && variation.hours > 0) {
    return `${variation.days} Días y ${variation.hours} horas laborables`
  }
  if (variation.months > 0) {
    return `${variation.months} Meses laborables`
  }
  if (variation.days > 0) {
    return `${variation.days} Días laborables`
  }
  if (variation.hours > 0) {
    return `${variation.hours} Horas laborables`
  }
}
