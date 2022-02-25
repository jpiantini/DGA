import * as yup from "yup";

export const InformationFormSchema = yup.object({
  information: yup.string().required('Este campo es requerido'),
}).required();


export const MockupDocuments = 
    {
    title:'ffgs',
    data:[
    {
      id: 1,
      name: 'CERTIFICACIÓN.PDF',
      documentType: 'CERTIFICACIÓN NO ANTECEDENTES',
      date: '10/09/2021',
      url: 'http://www.cervantesvirtual.com/obra/la-divina-comedia-2/bdeee91a-7358-11e1-b1fb-00163ebf5e63.pdf',
    },
    {
      id: 2,
      name: 'CERTIFICACIÓN ESPECIAL DE SOLICITUD.PDF',
      documentType: 'CERTIFICACIÓN ESPECIAL DE SOLICITUD',
      date: '22/08/2021',
      url: 'http://www.cervantesvirtual.com/obra/la-divina-comedia-2/bdeee91a-7358-11e1-b1fb-00163ebf5e63.pdf',
    },
    {
      id:3,
      name: 'CERTIFICACIÓN ESPECIAL DE SOLICITUD.PDF',
      documentType: 'CERTIFICACIÓN ESPECIAL DE SOLICITUD',
      date: '22/08/2021',
      url: 'http://www.cervantesvirtual.com/obra/la-divina-comedia-2/bdeee91a-7358-11e1-b1fb-00163ebf5e63.pdf',
    },
    {
      id: 4,
      name: 'CERTIFICACIÓN ESPECIAL DE SOLICITUD.PDF',
      documentType: 'CERTIFICACIÓN ESPECIAL DE SOLICITUD',
      date: '22/08/2021',
      url: 'http://www.cervantesvirtual.com/obra/la-divina-comedia-2/bdeee91a-7358-11e1-b1fb-00163ebf5e63.pdf',
    },
    {
      id: 5,
      name: 'CERTIFICACIÓN ESPECIAL DE SOLICITUD.PDF',
      documentType: 'CERTIFICACIÓN ESPECIAL DE SOLICITUD',
      date: '22/08/2021',
      url: 'http://www.cervantesvirtual.com/obra/la-divina-comedia-2/bdeee91a-7358-11e1-b1fb-00163ebf5e63.pdf',
    },
  ]}
  