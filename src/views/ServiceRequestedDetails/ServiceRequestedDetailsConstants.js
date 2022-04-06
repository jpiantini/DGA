import * as yup from "yup";
import COLORS from "../../theme/Colors";

export const FormSchema = yup.object({
  reason: yup.string().required('Este campo es requerido'),
  message: yup.string().required('Este campo es requerido'),
}).required();

export const FormRatingSchema = yup.object({
    comment: yup.string().required('Este campo es requerido'),
  }).required();

export const MenuOptions = {
    details:0,
    claims:1,
    payment:2,
    actionRequired:3,
    messages:4
}

export const claimsOptions = [
    {
        value:1,
        label:'Mi Solicitud ha excedido el tiempo de revision maxima',
    },
    {
        value:2,
        label:'No he recibido ninguna notificacion sobre mi solicitud',
    },
    {
        value:3,
        label:'Mi Solicitud esta aprobada pero las autoridades me informan lo contrario',
    },
    {
        value:4,
        label:'Otro',
    },
]
