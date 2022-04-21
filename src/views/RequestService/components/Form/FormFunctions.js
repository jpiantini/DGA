import * as yup from 'yup';
import { FIELD_TYPES, MASK_LIST, RULE_LIST } from './FormConstants'
import { localToString, defaultString } from '../../../../utilities/functions/StringUtil';
import { safeValExtraction } from '../../../../utilities/functions/ObjectUtil';
import LocalStorageService from '../../../../services/LocalStorageService';

export const getFieldValidation = (field) => {

  let loggedUserCedula = LocalStorageService.getItem('user_cedula');
  let loggedUserEmail = LocalStorageService.getItem('user_primary_email');

  if (!field || !field.type || field.hidden) {
    return
  } else if (field.type == FIELD_TYPES.select && !field.required) {
    return
  }

  let validator = undefined;

  switch (field.type) {
    case FIELD_TYPES.time:
      validator = yup.date()
      break;
    case FIELD_TYPES.date:
      validator = yup.date()
      break;
    case FIELD_TYPES.radioGroup:
      validator = yup.string()
      break;
    case FIELD_TYPES.text:
      validator = yup.string()
      break;
    case FIELD_TYPES.select:
      validator = yup.string()
      break;
    case FIELD_TYPES.file:
      if (field?.required) {
        validator = yup.object().shape({
          files: yup.array().min(1, defaultString.requiredText).required(defaultString.requiredText)
        })
      }
      validator = yup.mixed()
      break;
    case FIELD_TYPES.grid:
      validator = yup.array().min(1, defaultString.requiredText).required(defaultString.requiredText)
      break;
    default:
      break;
  }

  if (field?.required && validator) {
    validator = validator.required(defaultString.requiredText)
  }

  switch (MASK_LIST[localToString(field.Mask)]) {
    case MASK_LIST[5]:
      validator = validator.email(defaultString.validEmail)
      break;
    case MASK_LIST[9]:
      validator = validator.email(defaultString.validEmail).notOneOf([loggedUserEmail], defaultString.validEmailDifferentLoggedUser)
      break;
    default:
      break;
  }

  return validator
}

export const fieldRuleChanger = (
  { field, ruleAction, ruleField, ruleList, values, setFieldValue }
) => {
  const findRuleField = ruleField.find(fieldName => field?.fieldKey == fieldName)

  let _field = {
    ...field,
  }

  //Main field modifier
  if (findRuleField) {
    const rulesToApply = ruleField
      .map((fieldName, index) => {
        if (field?.fieldKey == fieldName) {
          return RULE_LIST[ruleAction[index]]
        } else {
          return null
        }
      })
      .filter(item => item !== null)

    //add more ruleList if its rule five and the other field (select) has value
    if (
      rulesToApply.find(item => item == RULE_LIST[5]) &&
      safeValExtraction(values[field?.fieldKey], 'rule')
    ) {
      ruleList.push(safeValExtraction(values[field?.fieldKey], 'rule'))
    }

    //return the modified object
    _field = {
      ...dataObjectRuleChanger(field, rulesToApply, setFieldValue),
    }
  }

  return _field
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
        valChange(_item?.fieldKey, undefined)
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
