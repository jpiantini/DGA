import * as yup from 'yup';
import { FIELD_TYPES, RULE_LIST } from './FormConstants'

export const getFieldValidation = (field) => {
  if (!field || !field.type) {
    return
  }

  const fieldType = {
    // pickerObject: yup.object().shape({
    //   Value: yup.mixed().required("Este campo es requerido"),
    // }),
    // email: yup.string().email('Favor insertar un email válido'),
    // input: yup.string(),
    // phone: yup.string(),
    /*[FIELD_TYPES.select]: yup.object().shape({
      Value: yup.mixed().required("Este campo es requerido"),
    }),*/
    [FIELD_TYPES.text]: yup.string(),
    [FIELD_TYPES.select]: yup.string(),
    [FIELD_TYPES.radioGroup]: yup.string(),
    [FIELD_TYPES.date]: yup.date(),
    [FIELD_TYPES.time]: yup.string(),
    [FIELD_TYPES.file]: yup.mixed()

  }

  let validator = fieldType[field.type]

  if (field?.required && validator) {
    validator = validator.required("Este campo es requerido")
  }

  return validator
}

export const dataObjectRuleChanger = (item, rule, valChange ) => {
  switch (rule) {
    case RULE_LIST[0]:
      item.hidden = true
      break;
    case RULE_LIST[1]:
      item.hidden = false
      break;
    case RULE_LIST[2]:
      item.enabled = false
      break;
    case RULE_LIST[3]:
      item.enabled = true
      break;
    case RULE_LIST[4]:
      item.required = true
      break;
    case RULE_LIST[5]:
      //
      break;
    case RULE_LIST[6]:
      item.required = false
      break;
    case RULE_LIST[7]:
      if(typeof valChange == 'function'){
        valChange(item.fieldKey, undefined)
      }
      break;
    case RULE_LIST[8]:
      item.Mask = '0'
      item.label = 'No. de Cédula'
      break;
    case RULE_LIST[9]:
      item.Mask = null
      item.label = 'Pasaporte'
      break;
    case RULE_LIST[10]:
      item.Mask = '1'
      item.label = 'RNC'
      break;
    default:
      break;
  }
  return item
}