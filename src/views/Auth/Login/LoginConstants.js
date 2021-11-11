import * as yup from "yup";
import MiturLogo from '../../../assets/images/MiturLogo.png'
import AuthBackground from '../../../assets/images/AuthImage.png'

export const MiturLogoImage = MiturLogo;
export const AuthBackgroundImage = AuthBackground;

export const FormSchema = yup.object({
    id: yup.string().required('Este campo es requerido'),
    password: yup.string().required('Este campo es requerido'),
  }).required();