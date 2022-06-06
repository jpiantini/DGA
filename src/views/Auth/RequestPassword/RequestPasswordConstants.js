import * as yup from "yup";

export const FormSchema = yup.object({
  id: yup.string().required('Este campo es requerido'),
  email: yup.string().email('Ingrese un email valido').required('Este campo es requerido'),
  emailConfirmation: yup.string().email('Ingrese un email valido')
    .oneOf([yup.ref('email'), null], 'Los correos no coinciden').required('Este campo es requerido'),
  }).required();