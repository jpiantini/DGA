import * as yup from "yup";
import MiturLogo from '../../../assets/images/MiturLogo.png'
import AuthBackground from '../../../assets/images/AuthImage.png'

export const MiturLogoImage = MiturLogo;
export const AuthBackgroundImage = AuthBackground;

export const FormSchema = yup.object({
  email: yup.string().email('Ingrese un email valido').required('Este campo es requerido'),
  emailConfirmation: yup.string().email('Ingrese un email valido')
    .oneOf([yup.ref('email'), null], 'Los correos no coinciden').required('Este campo es requerido'),
  }).required();