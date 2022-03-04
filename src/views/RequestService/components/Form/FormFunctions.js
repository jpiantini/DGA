import * as yup from 'yup';
import { FIELD_TYPES, MASK_LIST, RULE_LIST } from './FormConstants'
import { localToString, defaultString } from '../../../../utilities/functions/StringUtil';

export const getFieldValidation = (field) => {
  if (!field || !field.type || field.hidden) {
    return
  } else if (field.type == FIELD_TYPES.select && !field.required) {
    return
  }

  const fieldType = {
    [FIELD_TYPES.text]: yup.string(),
    [FIELD_TYPES.select]: yup.string(),
    [FIELD_TYPES.radioGroup]: yup.string(),
    [FIELD_TYPES.checkboxGroup]: yup.array(), //for testing
    [FIELD_TYPES.date]: yup.date(),
    [FIELD_TYPES.time]: yup.date(),
    [FIELD_TYPES.file]: yup.mixed()

  }

  let validator = fieldType[field.type]

  if (field?.required && validator) {
    validator = validator.required(defaultString.requiredText)
  }

  switch (MASK_LIST[localToString(field.Mask)]) {
    case MASK_LIST[5]:
      validator = validator.email(defaultString.validEmail)
      break;

    default:
      break;
  }

  return validator
}

export const dataObjectRuleChanger = (item, rules, valChange) => {
  const _item = { ...item }
  for (const rule of rules) {
    switch (rule) {
      case RULE_LIST[0]:
        _item.hidden = true
        break;
      case RULE_LIST[1]:
        _item.hidden = false
        break;
      case RULE_LIST[2]:
        _item.enabled = false
        break;
      case RULE_LIST[3]:
        _item.enabled = true
        break;
      case RULE_LIST[4]:
        _item.required = true
        break;
      case RULE_LIST[5]:
        //
        break;
      case RULE_LIST[6]:
        _item.required = false
        break;
      case RULE_LIST[7]:
        valChange(_item.fieldKey, undefined)
        break;
      case RULE_LIST[8]:
        _item.Mask = '0'
        _item.label = 'No. de Cédula'
        break;
      case RULE_LIST[9]:
        _item.Mask = null
        _item.label = 'Pasaporte'
        break;
      case RULE_LIST[10]:
        _item.Mask = '1'
        _item.label = 'RNC'
        break;
      default:
        break;
    }
  }
  return _item
}