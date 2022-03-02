import apiServiceCall from "../services/ApiServiceCall";
                                                      
export const cedulaValidationService = (cedula) => {
    return apiServiceCall().get(`/validate/${cedula}`).then(({data}) => data);
}
