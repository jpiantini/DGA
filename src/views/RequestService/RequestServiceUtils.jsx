import { cleanCommasFromNumbers, cleanStringFromNumbers } from "../../utilities/functions/NumberUtil"
import { isEmpty } from "../../utilities/functions/ValidationUtil"
import { FIELD_TYPES } from "./components/Form/FormConstants"
import { format } from 'date-fns'
import { localToArray } from "../../utilities/functions/ArrayUtil"

const transformValue = (val, fieldProps) => {
  let _val = undefined
  let _labelValue = undefined
  const extraData = {}

  //Transformation by field type
  switch (fieldProps?.type) {
    case FIELD_TYPES.select:
      _val = val
      _labelValue = fieldProps.values.find(item => item.value == val)?.label
      extraData.customLabel = {
        key: fieldProps.label_persist,
        value: fieldProps.values.find(item => item.value == val)?.label
      }
      break;
    case FIELD_TYPES.radioGroup:
      _val = val
      _labelValue = fieldProps.values.find(item => item.value == val)?.label
      break;
    case FIELD_TYPES.checkboxGroup:
      _val = [fieldProps?.label]
      _labelValue = null
      break;
    case FIELD_TYPES.date:
      _val = format(new Date(val), 'yyyy-MM-dd')
      _labelValue = fieldProps?.label
      break;
    case FIELD_TYPES.time:
      _val = format(new Date(val), 'hh:mm')
      _labelValue = fieldProps?.label
      break;
    case FIELD_TYPES.text:
      _val = val
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
    case '12':
      _val = cleanCommasFromNumbers(_val);
    default:
      break;
  }
  return {
    value: _val,
    labelValue: _labelValue,
    ...extraData,
  }
}

export const transformFileData = (values, plainData) => {
  const _values = []
  for (const key in values) {
    if (!isEmpty(values[key])) {
      _values.push({
        key,
        value: values[key],
      })
    }
  }

  const newData = {
    newFile: [],
    oldFile: [],
  }
  _values
    .map(val => {
      const fieldProps = plainData.find(item => item.fieldKey === val.key)
      return {
        ...fieldProps,
        ...val,
      }
    })
    .filter(field => field.type == FIELD_TYPES.file)
    .map((field) => {
      field.value.map((file) => {
        if (file?.isARoute) {
          newData.oldFile.push({
            ...file,
            label: field.label,
          })
        } else {
          newData.newFile.push({
            file,
            label: field.label,
          })
        }
      });
    })

  return newData
}

export const transformFormData = (values, plainData) => {
  let _values = []
  Object.keys(values).map(key => {
    //By default isEmpty search on "value" property of an object in this case i set 'isARoute' as props and isEmpty search this property instead of value  
    if (!isEmpty(values[key], values[key]?.isARoute ? 'isARoute' : 'value')) {
      _values.push({
        key,
        value: values[key],
      })
    }
  })
  return _values.map(val => {
    const fieldProps = plainData.find(item => item.fieldKey === val.key)
    return {
      key: val.key,
      ...transformValue(val.value, fieldProps),
      type: fieldProps?.type,
      label: fieldProps?.label,
    }
  })
}

export const transformFormGrid = (values, plainData) => {
  const _values = []
  const gridTransformed = {}

  for (const key in values) {
    const elementVal = values[key];
    if (!isEmpty(elementVal)) {
      _values.push({
        key: key,
        value: elementVal,
      })
    }
  }


  for (const val of _values) {
    const fieldProps = plainData.find(item => item.fieldKey === val.key)
    if (fieldProps?.type !== 'grid') {
      continue
    } else if (isEmpty(val.value)) {
      continue
    }
    gridTransformed[fieldProps.relationship] = localToArray(val.value)
      .map(rowVal => {
        const _rowFieldValues = []

        for (const rowFieldKey in rowVal) {
          const elementVal = rowVal[rowFieldKey];
          if (!isEmpty(elementVal)) {
            _rowFieldValues.push({
              key: rowFieldKey,
              value: elementVal,
            })
          }
        }

        const gridTransformedVal = {}

        for (const rowFieldValue of _rowFieldValues) {
          const rowFieldProps = fieldProps.fields.find(item => item.fieldKey === rowFieldValue.key)

          gridTransformedVal[rowFieldValue.key] = {
            key: rowFieldValue.key,
            ...transformValue(rowFieldValue.value, rowFieldProps),
            type: rowFieldProps?.type,
            MainLabel: rowFieldProps?.label,
          }
        }

        return gridTransformedVal
      })
  }

  return gridTransformed
}