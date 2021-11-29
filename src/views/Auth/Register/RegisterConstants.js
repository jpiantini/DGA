import * as yup from "yup";
import AuthBackground from '../../../assets/images/AuthImage.png'
import MiturLogo from '../../../assets/images/MiturLogo.png'

export const AuthBackgroundImage = AuthBackground;
export const MiturLogoImage = MiturLogo;

export const FormSchema = yup.object({
  email: yup.string().email('Ingrese un email valido').required('Este campo es requerido'),
  password: yup.string().min(6,'La contraseña debe tener minimo 6 caracteres').required('Este campo es requerido'),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden').required('Este campo es requerido'),
  identification: yup.string().required('Este campo es requerido'),
  name: yup.string().required('Este campo es requerido'),
  lastName: yup.string().required('Este campo es requerido'),
  secondLastName: yup.string(),
  occupation: yup.string(),
  provinceId: yup.string().required('Este campo es requerido'),
  municipalityId: yup.string().required('Este campo es requerido'),
  sectorId: yup.string().required('Este campo es requerido'),
  phoneNumber: yup.string(),
  secondPhoneNumber: yup.string(),
  secondaryEmail: yup.string().email('Ingrese un email valido'),
  address: yup.string().required('Este campo es requerido'),
}).required();