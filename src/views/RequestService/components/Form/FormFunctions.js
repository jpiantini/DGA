import * as yup from 'yup';
import { FIELD_TYPES } from './FormConstants'

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