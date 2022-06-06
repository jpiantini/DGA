import * as yup from "yup";

export const FormSchema = yup.object({
    id: yup.string().required('Este campo es requerido'),
    password: yup.string().required('Este campo es requerido'),
  }).required();