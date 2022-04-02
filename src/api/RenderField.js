import apiServiceCall from "../services/ApiServiceCall";
                                                      
export const cedulaValidationService = (cedula) => {
    return apiServiceCall().get(`/validate/${cedula}`).then(({data}) => data);
}

export const mimarenaValidationService = (noRecibo) => {
    return apiServiceCall().get(`/mimarena/validate/${noRecibo}`).then(({data}) => data);
}

export const dppValidationService = (requestCode,type) => {
    //tipo="Definitiva" o "Provisional"
    return apiServiceCall().get(`/dpp/validate/${requestCode}?tipo=${type}`).then(({data}) => data);
}