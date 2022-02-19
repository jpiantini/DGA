import * as yup from "yup";

export const FormSchema = yup.object({
  companyID: yup.string(),
  requestID: yup.string()
}).required();

export const formInitialState = {
  companyID: "",
  requestID: "",
}

export const MockupCompanies = [
  {
    label:'Concentra Hotel & Resorts',
    value:1
  },
  {
    label:'Concentra Bar & Lounge',
    value:2
  },
  {
    label:'Concentra Bar & Grill',
    value:3
  },
]

export const MockupInProcessRequests = [
  {
      id:1,
      percent:'60%',
      title:'Solicitud de no objeción de suelo',
      status:'actionRequired',
      serviceID:1
  },
  {
      id:2,
      percent:'90%',
      title:'Solicitud de prueba ABC',
      status:'inProcess',
      serviceID:2
  },
]

export const MockupCompletedRequests = [
  {
      id:1,
      title:'Clasificación Provisional',
      status:'success',
      serviceID:3
  },
  {
      id:2,
      title:'Guías Turísticos',
      status:'success',
      serviceID:4
  },
]

export const MockupRejectedRequests = [
  {
      id:1,
      title:'Solicitud de ejemplo',
      status:'rejected',
      serviceID:5
  },
]