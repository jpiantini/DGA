import * as yup from "yup";

export const FormSchema = yup.object({
  filterType: yup.string().required("Esta campo es requerido"),
  requestID: yup.string().required("Esta campo es requerido")
}).required();

export const formInitialState = {
  filterType: "",
  requestID: "",
}

export const Filters = [
  {
    label:'Nombre de solicitud',
    value:1
  },
  {
    label:'Numero de solicitud',
    value:2
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