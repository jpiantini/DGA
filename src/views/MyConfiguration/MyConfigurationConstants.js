import * as yup from "yup";

export const FormSchema = yup.object({
  address: yup.string().required('Este campo es requerido'),
  province_id: yup.string().required('Este campo es requerido'),
  municipality_id: yup.string().required('Este campo es requerido'),
  sector_id: yup.string().required('Este campo es requerido'),
  phoneMobile: yup.string().required('Este campo es requerido'),
  phoneResidential: yup.string().required('Este campo es requerido'),
  phoneLaboral: yup.string().required('Este campo es requerido'),
  secundaryEmail: yup.string().email('Ingrese un email valido').required('Este campo es requerido'),
  notificationsWithEmail: yup.boolean(),
  notificationsSms: yup.boolean(),
}).required();

export const FormPasswordSchema = yup.object({
  old_password: yup.string().min(6, 'La contraseña debe tener minimo 6 caracteres').required('Este campo es requerido'),
  password: yup.string().min(6, 'La contraseña debe tener minimo 6 caracteres').required('Este campo es requerido'),
  new_password_confirmation: yup.string().min(6, 'La contraseña debe tener minimo 6 caracteres')
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden').required('Este campo es requerido'),

}).required();

export const FormEmailSchema = yup.object({
  password: yup.string().min(6, 'La contraseña debe tener minimo 6 caracteres').required('Este campo es requerido'),
  email: yup.string().email('Ingrese un email valido').required('Este campo es requerido'),
  new_email_confirmation: yup.string().email('Ingrese un email valido')
    .oneOf([yup.ref('email'), null], 'Los correos no coinciden').required('Este campo es requerido'),

}).required();


