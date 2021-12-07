import * as yup from "yup";

export const FormSchema = yup.object({
  email: yup.string().email('Ingrese un email valido').required('Este campo es requerido'),
  fullName: yup.string().required('Este campo es requerido'),
  phoneNumber: yup.string().required('Este campo es requerido'),
  message: yup.string().required('Este campo es requerido'),
}).required();