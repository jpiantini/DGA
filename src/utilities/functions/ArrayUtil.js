import { FIELD_TYPES } from "../../views/RequestService/components/Form/FormConstants"
import { invertRule, localToString } from "./StringUtil"
import deepEqual from "deep-equal";

export const localToArray = (array) => {
  if (!Array.isArray(array)) {
    return []
  }
  return array
}

const dataToSelect = (data) => { //dataToSelect
  return localToArray(data).map(item => {
    return {
          id: item.value,
          label: item.label,
          value: item.value,
          rule: item.rule,
          father:item.father,
          invertRule: invertRule(item.rule),
    }
  })
}

const dataToRadioSelect = (data) => { // dataToPickerSelect
  return localToArray(data).map(item => {
    return {
      value: item.value,
      label: item.label,
    }
  })
}

const dataToCheckboxGroup = (data) => {
  return localToArray(data).map(item => {
    return {
      id: item.value,
      label: item.label,
      value: item.value,
    }
  })
}

const transformDataArray = (data,fieldType) => {
  switch (fieldType) {
    case FIELD_TYPES.radioGroup:
      return dataToRadioSelect(data)
    case FIELD_TYPES.select:
      return dataToSelect(data)
    case FIELD_TYPES.checkboxGroup:
      return dataToCheckboxGroup(data)
    default:
      return []
  }
}

const transformValues = (values) => {
  if (!Array.isArray(values)) {
    return []
  }
  return values.map(value => {
    return {
      ...value,
      rule: localToString(value?.rule),
      invertRule: invertRule(value?.rule),
    }
  })
}

export const transformField = (field) => {
  const fields = localToArray(field.fields).map(transformField)
  return {
    ...field,
    key: field.orden,
    fieldKey: field.name,
    data: transformDataArray(field.values, field.type),
    gridData: [],
    fields,
    values: transformValues(field.values)
  }
}

export const mapArrayDiff = (array1, array2, unique = false) => {
  let result = [];
  array1 = localToArray(array1)
  array2 = localToArray(array2)

  for (let i = 0; i < array1.length; i++) {
    let item1 = array1[i],
      found = false;
    for (let j = 0; j < array2.length && !found; j++) {
      found = deepEqual(item1, array2[j]);
    }
    if (found === !!unique) {
      result.push(item1);
    }
  }
  return result
}