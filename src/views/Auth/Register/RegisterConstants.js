import * as yup from "yup";

export const FormSchema = yup.object({
  email: yup.string().email('Ingrese un email valido').required('Este campo es requerido'),
  emailConfirmation: yup.string().email('Ingrese un email valido')
    .oneOf([yup.ref('email'), null], 'Los correos no coinciden').required('Este campo es requerido'),
  password: yup.string().min(6, 'La contraseña debe tener minimo 6 caracteres').required('Este campo es requerido'),
  passwordConfirmation: yup.string().min(6, 'La contraseña debe tener minimo 6 caracteres')
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden').required('Este campo es requerido'),
  identification: yup.string().required('Este campo es requerido'),
  name: yup.string().required('Este campo es requerido'),
  lastName: yup.string().required('Este campo es requerido'),
  secondLastName: yup.string(),
  occupation: yup.string(),
  provinceId: yup.string().required('Este campo es requerido'),
  municipalityId: yup.string().required('Este campo es requerido'),
  sectorId: yup.string().required('Este campo es requerido'),
  phoneNumber: yup.string().required('Este campo es requerido'),
  secondPhoneNumber: yup.string(),
  secondaryEmail: yup.string().email('Ingrese un email valido'),
  address: yup.string().required('Este campo es requerido'),
  termsAndCondition: yup.boolean().oneOf([true], 'Debe aceptar los terminos y condiciones de uso y privacidad para continuar')
}).required();

export const RegisterSteps = [
  {
    title: 'Información de Autenticación',
    elements: [
      'email',
      'emailConfirmation',
      'password',
      'passwordConfirmation'
    ]
  },
  {
    title: 'Datos Personales',
    elements: [
      'identification',
      'name',
      'lastName',
      'secondLastName',
      'occupation',
      'provinceId',
      'municipalityId',
      'sectorId',
      'phoneNumber',
      'secondPhoneNumber',
      'secondaryEmail',
      'address'
    ]
  },
  {
    title: 'Términos y condiciones',
    elements: [
      'termsAndCondition'
    ]
  },
  {
    title: 'Activación de cuenta'
  }
];

export const identificationTypes = [
  {
    value: 1,
    label: 'Cedúla'
  },
  {
    value: 2,
    label: 'Pasaporte'
  },
];
