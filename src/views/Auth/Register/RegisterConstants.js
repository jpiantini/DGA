import * as yup from "yup";

export const FormSchema = 
[
  {
    step:1,
    validations:
    yup.object({
      email: yup.string().email('Ingrese un email valido').required('Este campo es requerido'),
      emailConfirmation: yup.string().email('Ingrese un email valido')
        .oneOf([yup.ref('email'), null], 'Los correos no coinciden').required('Este campo es requerido'),
      password: yup.string().min(6, 'La contraseña debe tener minimo 6 caracteres').required('Este campo es requerido'),
      password_confirmation: yup.string().min(6, 'La contraseña debe tener minimo 6 caracteres')
        .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden').required('Este campo es requerido'),
    }).required()
  },
  {
    step:2,
    validations:
    yup.object({
      document_type: yup.string().required('Este campo es requerido'),
      citizen_id: yup.string().required('Este campo es requerido'),
      name: yup.string().required('Este campo es requerido'),
      first_last_name: yup.string().required('Este campo es requerido'),
      second_last_name: yup.string(),
      occupation: yup.string(),
      province_id: yup.string().required('Este campo es requerido'),
      municipality_id: yup.string().required('Este campo es requerido'),
      sector_id: yup.string().required('Este campo es requerido'),
      phone: yup.string().required('Este campo es requerido'),
      phone2: yup.string(),
      email2: yup.string().email('Ingrese un email valido'),
      address: yup.string().required('Este campo es requerido'),
    }).required()
  },
  {
    step:3,
    validations:
    yup.object({
      first_citizen_question: yup.number().required('Este campo es requerido'),
      first_citizen_answer: yup.string().required('Este campo es requerido'),
      second_citizen_question: yup.number().required('Este campo es requerido'),
      second_citizen_answer: yup.string().required('Este campo es requerido'),
      third_citizen_question: yup.number().required('Este campo es requerido'),
      third_citizen_answer: yup.string().required('Este campo es requerido'),
    }).required()
  },
  {
    step:4,
    validations:
    yup.object({
      termsAndCondition: yup.boolean().oneOf([true], 'Debe aceptar los terminos y condiciones de uso y privacidad para continuar')
    }).required()
  },
]

export const RegisterSteps = [
  {
    title: 'Información de Autenticación',
    elements: [
      'email',
      'emailConfirmation',
      'password',
      'password_confirmation'
    ]
  },
  {
    title: 'Datos Personales',
    elements: [
      'document_type',
      'citizen_id',
      'name',
      'first_last_name',
      'second_last_name',
      'occupation',
      'province_id',
      'municipality_id',
      'sector_id',
      'phone',
      'phone2',
      'email2',
      'address'
    ]
  },
  {
    title: 'Información de seguridad',
    elements: [
      'first_citizen_question',
      'first_citizen_answer',
      'second_citizen_question',
      'second_citizen_answer',
      'third_citizen_question',
      'third_citizen_answer',
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
