import * as yup from "yup";

export const FormSchema = yup.object({
  fullName: yup.string().required('Este campo es requerido'),
  relationTo: yup.string().required('Este campo es requerido'),
  email: yup.string().email('Ingrese un email valido').required('Este campo es requerido'),
  phoneNumber: yup.string().required('Este campo es requerido'),
  message: yup.string().required('Este campo es requerido'),
}).required();

export const relationToData = [
  {
    label: "Portal de servicios",
    value: 1,
  },
  {
    label: "Planificación y desarrollo (DPP)",
    value: 2,
  },
  {
    label: "Confotur",
    value: 3,
  },
  {
    label: "Empresas y servicios",
    value: 4,
  },
]

