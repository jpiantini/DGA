import * as yup from "yup";

export const FormProfileSchema = yup.object({
  name: yup.string().required('Este campo es requerido'),
  identification: yup.string().required('Este campo es requerido'),
  city: yup.string().required('Este campo es requerido'),
  company: yup.string().required('Este campo es requerido'),
  phoneNumber: yup.string().required('Este campo es requerido'),
  email: yup.string().email('Ingrese un email valido').required('Este campo es requerido'),
}).required();

export const FormCompanySchema = yup.object({
  identification: yup.string().required('Este campo es requerido'),
  phoneNumber: yup.string().required('Este campo es requerido'),
  city: yup.string().required('Este campo es requerido'),
  companyName: yup.string().required('Este campo es requerido'),
  email: yup.string().email('Ingrese un email valido').required('Este campo es requerido'),
  address: yup.string().required('Este campo es requerido'),
  category: yup.string().required('Este campo es requerido'),
}).required();


export const MockupCompanies = [
  {
    id: 1,
    title: 'Restaurant & Bar Grill',
    identification: '001-6585665-5',
    phoneNumber: '809-123-4567',
    city: 'Santo Domingo',
    companyName: 'Restaurant & Bar Grill',
    email: 'Robert@googlemail.com',
    address: 'Av. Winston Churchill #54, Piantini',
    category: 'Turismo / Restaurante'
  },

  {
    id: 2,
    title: 'Concentra Hotels & Resorts',
    identification: '001-2224445-5',
    phoneNumber: '809-222-1100',
    city: 'Santo Domingo',
    companyName: 'Concentra Hotels & Resorts',
    email: 'concentra@concentra.com',
    address: 'Av. Winston Churchill #54, Piantini',
    category: 'Turismo / Resorts'
  },
]