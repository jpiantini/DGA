import * as yup from "yup";

export const FormSchema = yup.object({
  reason: yup.string().required('Este campo es requerido'),
  message: yup.string().required('Este campo es requerido'),
}).required();

