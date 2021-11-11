import * as yup from "yup";
import AuthBackground from '../../../assets/images/AuthImage.png'
import MiturLogo from '../../../assets/images/MiturLogo.png'

export const AuthBackgroundImage = AuthBackground;
export const MiturLogoImage = MiturLogo;

export const FormSchema = yup.object({
  name: yup.string().required('Este campo es requerido'),
  lastName: yup.string().required('Este campo es requerido'),
  identification: yup.string().required('Este campo es requerido'),
  email: yup.string().email('Ingrese un email valido').required('Este campo es requerido'),
  phoneNumber: yup.string().required('Este campo es requerido'),
}).required();