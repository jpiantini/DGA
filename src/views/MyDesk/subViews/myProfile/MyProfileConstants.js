import * as yup from "yup";

const urlForYup = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm

export const FormCompanySchema = yup.object({
  company_name: yup.string().required('Este campo es requerido'),
  company_rnc: yup.string().required('Este campo es requerido'),
  company_phone: yup.string().required('Este campo es requerido'),
 // email: yup.string().email('Ingrese un email valido').required('Este campo es requerido'),
 company_address: yup.string().required('Este campo es requerido'),
 company_url_web: yup.string().matches(urlForYup,"Dirección web inválida"),
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