import apiServiceCall from "../services/ApiServiceCall";
                                                      
export const cedulaValidationService = (cedula) => {
    return apiServiceCall().post(`/validate/${cedula}`).then(({data}) => data);
}
