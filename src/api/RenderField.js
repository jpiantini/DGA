import apiServiceCall from "../services/ApiServiceCall";
                                                      
export const cedulaValidationService = (cedula) => {
    return apiServiceCall().post(`/validate/%7B${cedula}%7D`).then(({data}) => data);
}
