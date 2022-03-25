import * as yup from "yup";

export const InformationFormSchema = yup.object({
  information: yup.string().required('Este campo es requerido'),
}).required();
