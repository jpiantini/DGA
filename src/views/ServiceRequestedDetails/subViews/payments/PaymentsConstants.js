import * as yup from "yup";
import { defaultString } from "../../../../utilities/functions/StringUtil";

export const FileFormSchema = yup.object().shape({
    file: yup.mixed().required(defaultString.requiredText),
   /* file: yup.object().shape({
        files: yup.array().min(1, defaultString.requiredText).required(defaultString.requiredText),
    })
    */
  })


export const MockupPayments = [
    {
        value:1,
        requestName:'SOLICITUD A',
        confirmationID:9949494655,
        amount:'$2000.00DOP',
        date:'24/12/2021'
    },
    {
        value:2,
        requestName:'SOLICITUD B',
        confirmationID:9994428877,
        amount:'$1500.00DOP',
        date:'24/12/2021'
    },
    {
        value:3,
        requestName:'SOLICITUD C',
        confirmationID:9999889865,
        amount:'$8000.00DOP',
        date:'24/12/2021'
    },
]