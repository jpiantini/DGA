import { cleanStringFromNumbers } from "../../utilities/functions/NumberUtil"
import { isEmpty } from "../../utilities/functions/ValidationUtil"
import { FIELD_TYPES } from "./components/Form/FormConstants"
import { format } from 'date-fns'

const transformValue = (val, fieldProps) => {
  let _val = undefined
  let _labelValue = undefined

  //Transformation by field type
  switch (fieldProps?.type) {
    case FIELD_TYPES.select:
      _val = val?.Value
      _labelValue = val?.Name
      break;
    case FIELD_TYPES.radioGroup:
      _val = val
      _labelValue = fieldProps.values.find(item => item.value == val)?.label
      break;
    case FIELD_TYPES.checkboxGroup:
      _val = [fieldProps?.label]
      _labelValue = null
      break;
    default:
      _val = val
      _labelValue = fieldProps?.label
      break;
  }

  //Transformation by mask type
  switch (fieldProps?.Mask) {
    case '0':
      _val = cleanStringFromNumbers(_val)
      break;
    case '1':
      _val = cleanStringFromNumbers(_val)
      break;
    case '2':
      _val = cleanStringFromNumbers(_val)
      break;
    case '3':
      _val = cleanStringFromNumbers(_val)
      break;
    case '10':
      _val = format(new Date(_val), 'yyyy-MM-dd')
      break;
    case '11':
      _val = format(new Date(_val), 'hh:mm')
      break;
    default:
      break;
  }

  return {
    value: _val,
    labelValue: _labelValue,
  }
}

export const transformFormData = (values, data) => {
  let _data = []
  let _values = []
  data.map(step => {
    _data = [..._data, ...step]
  })
  Object.keys(values).map(key => {
    if (!isEmpty(values[key])) {
      _values.push({
        key,
        value: values[key],
      })
    }
  })
  return _values.map(val => {
    const fieldProps = _data.find(item => item.fieldKey === val.key)
    return {
      key: val.key,
      ...transformValue(val.value, fieldProps),
      type: fieldProps?.type,
      label: fieldProps?.label,
    }
  })
}