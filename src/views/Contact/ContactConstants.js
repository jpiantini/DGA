import * as yup from "yup";

export const FormSchema = yup.object({
  fullName: yup.string().required('Este campo es requerido'),
  phoneNumber: yup.string().required('Este campo es requerido'),
  message: yup.string().required('Este campo es requerido'),
}).required();