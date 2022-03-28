import * as yup from "yup";

export const FileFormSchema = yup.object({
  file: yup.mixed().required('Este campo es requerido'),
}).required();
